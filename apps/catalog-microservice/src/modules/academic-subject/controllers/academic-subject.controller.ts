import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import {  AcademicSubjectService } from '../services/academic-subject.service';
import {
  CreateAcademicSubjectDto,
  GetResourceDto,
  UpdateAcademicSubjectDto,
} from '@edufin-back/shared/dto';

@Controller()
export class AcademicSubjectController {
  constructor(
    private readonly academicSubjectService: AcademicSubjectService
  ) {}
  @MessagePattern('get_catalog_academic_subject')
  get() {
    return this.academicSubjectService.findAll();
  }

  @MessagePattern('create_catalog_academic_subject')
  create(@Payload() createAcademicSubjectDto: CreateAcademicSubjectDto) {
    return this.academicSubjectService.create(createAcademicSubjectDto);
  }
  @MessagePattern('update_catalog_academic_subject')
  update(
    @Payload()
    payload: {
      id: string;
      updateAcademicSubjectDto: UpdateAcademicSubjectDto;
    }
  ) {
    return this.academicSubjectService.update(
      payload?.id,
      payload?.updateAcademicSubjectDto
    );
  }
  @MessagePattern('remove_catalog_academic_subject')
  remove(@Payload() payload: { id: string }) {
    return this.academicSubjectService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_academic_subject')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.academicSubjectService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_academic_subject')
 async getOne(@Payload() payload: { id; include }, @Ctx() context: KafkaContext) {
    await context.getConsumer().commitOffsets([
      {
        topic: context.getTopic(),
        partition: context.getPartition(),
        offset: context.getMessage().offset,
      },
    ]);
    

    return this.academicSubjectService.findOne(
      payload?.id,
      payload?.include
    );
  }
}
