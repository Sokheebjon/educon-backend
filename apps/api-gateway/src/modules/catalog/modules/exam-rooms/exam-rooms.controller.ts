import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateExamRoomsDto,
  GetPagenationDto,
  UpdateExamRoomsDto,
} from '@edufin-back/shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { ExamRoomsService } from './exam-rooms.service';
import { Public } from '@edufin-back/common/decorators';

@ApiTags('Exam Rooms')
@Controller('exam-rooms')
export class ExamRoomsController {
  constructor(private readonly examRoomsService: ExamRoomsService) {}
  @Public()
  @Get()
  findAll() {
    return this.examRoomsService.findAll();
  }

  @Post()
  @Public()
  create(@Body() createDto: CreateExamRoomsDto) {
    return this.examRoomsService.create(createDto);
  }

  @Get('/get-resource')
  async getResource(
    @Query()
    { page = '0', take = '10' }: GetPagenationDto
  ) {
    return this.examRoomsService.getResource(+page, +take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examRoomsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamRoomsDto: UpdateExamRoomsDto
  ) {
    return this.examRoomsService.update(id, updateExamRoomsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examRoomsService.remove(id);
  }
}
