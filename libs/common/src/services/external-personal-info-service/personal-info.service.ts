import {
  GetPersonalInfoExternalDto,
  SMSResponse,
} from '@edufin-back/shared/dto';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import handleAsyncOperation from '../../hoc/catch-async.hoc';

@Injectable()
class PersonalInfoService implements OnModuleInit {
  private token: string;
  private tokenExpiry: Date;
  private readonly tokenUrl = 'https://rmp-iskm.egov.uz/oauth2/token';
  
  constructor(
    private http: HttpService,
    private configService: ConfigService
  ) {}

  async onModuleInit() {
    const env: string = this.configService.get<string>('app.env');
    if (env === 'development') {
      return;
    } else {
      try {
        await handleAsyncOperation(this.refreshToken());
      } catch (error) {
        console.error('Failed to initialize module:', error);
      }
    }
  }

  private async refreshToken() {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', 'ipu-edu-user');
      formData.append('password', 'DkgrRRDMy5moKCM4Devm');
      const username = 'TJdEUZbeI1cyKrnAdW9eYzG9xtYa';
      const password = 'ZklyoFhMfimjnyl607tEAUun6jEa';
      const encodedCredentials = Buffer.from(
        `${username}:${password}`
      ).toString('base64');
      const config = {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const data = await handleAsyncOperation(firstValueFrom(
        this.http.post(this.tokenUrl, formData.toString(), config)
      ));

      this.token = data?.data?.access_token;
      this.tokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw new RpcException(new InternalServerErrorException({ message: error }));
    }
  }

  private isTokenExpired(): boolean {
    return !this.tokenExpiry || new Date() > this.tokenExpiry;
  }

  async getPersonalInfo(
    getPersonalInfoExternalDto: GetPersonalInfoExternalDto
  ) {
    if (this.isTokenExpired()) {
      try {
        await handleAsyncOperation(this.refreshToken());
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new RpcException(new InternalServerErrorException({ message: error }));
      }
    }

    try {
      const response = await handleAsyncOperation(firstValueFrom(
        this.http.post<SMSResponse>(
          'https://rmp-apimgw.egov.uz:8243/gcp/docrest/v1',
          getPersonalInfoExternalDto,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      ));
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: {} };
      }
    } catch (error) {
      console.error('Failed to get personal info:', error);
      if (error.response?.status === 401) {
        try {
          await handleAsyncOperation(this.refreshToken());
          return await this.getPersonalInfo(getPersonalInfoExternalDto);
        } catch (tokenError) {
          console.error('Failed to refresh token after 401 error:', tokenError);
          throw new RpcException(new BadRequestException({ message: tokenError }));
        }
      } else {
        throw new RpcException(new BadRequestException({ message: error }));
      }
    }
  }
}

export default PersonalInfoService;
