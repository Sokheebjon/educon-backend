import { handleAsyncOperation } from '@edufin-back/common';
import { GeneralPrismaService } from '@edufin-back/general-prisma-client';
import { IParsedFile } from '@edufin-back/shared/interfaces';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly generalPrismaClient: GeneralPrismaService) {}
  async create(file: IParsedFile) {
    const uploadDir = path.join(__dirname, '..', '..', '..', '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
    const filePath = path.join(uploadDir, fileName);

    const originalBuffer = file.buffer.data;

    const buffer = Buffer.from(originalBuffer);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        throw new RpcException(
          new BadRequestException({
            message: 'Error saving file.',
          })
        );
      }
    });
    return await this.generalPrismaClient.file.create({
      data: {
        mime_type: file.mimetype,
        orginal_name: file.originalname,
        size: file.size,
        url: fileName,
      },
    });
  }
  async findOne(idOrPath: string) {
    const isFileExist = await handleAsyncOperation(
      this.generalPrismaClient.file.findFirst({
        where: {
          OR: [
            {
              id: idOrPath.trim(),
            },
            {
              url: idOrPath.trim(),
            },
          ],
        },
      })
    );
    if (!isFileExist) {
      return null;
    }

    const uploadDir = path.join(__dirname, '..', '..', '..', '..', 'uploads');
    const file = path.join(uploadDir, isFileExist.url);
    return { file };
  }
  async findOneWithInfo(idOrPath: string) {
    console.log(idOrPath,11)
    if(!idOrPath){
      return null;
    }
    const file = await this.generalPrismaClient.file.findFirst({
      where: {
        OR: [
          {
            id: idOrPath.trim(),
          },
          {
            url: idOrPath.trim(),
          },
        ],
      },
    });
    if (!file) {
      return null;
    }

    return file;
  }
  async delete(idOrPath: string) {
    const unlinkAsync = promisify(fs.unlink);
    const file = await this.generalPrismaClient.file.findFirst({
      where: {
        OR: [
          {
            id: idOrPath,
          },
          {
            url: idOrPath,
          },
        ],
      },
    });
    if (!file) {
      throw new RpcException(
        new BadRequestException({ message: 'file not found' })
      );
    }
    const uploadDir = path.join(__dirname, '..', '..', '..', '..', 'uploads');
    const fullPath = path.join(uploadDir, file.url);
    try {
      await unlinkAsync(fullPath);

      await this.generalPrismaClient.file.delete({
        where: { id: file?.id },
      });

      return { message: 'File successfully deleted' };
    } catch (error) {
      throw new RpcException(
        new NotFoundException('Failed to delete the file from the filesystem.')
      );
    }
  }
}
