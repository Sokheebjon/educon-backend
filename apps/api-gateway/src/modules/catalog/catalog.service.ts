import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}
  async onModuleInit() {
    // education form

    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_education_form'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_education_form'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_education_form'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_education_form'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_education_form'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_education_form'
    );
    //education language
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_education_language'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_education_language'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_education_language'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_education_language'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_education_language'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_education_language'
    );
    //academic degree
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_academic_degree'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_academic_degree'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_academic_degree'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_academic_degree'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_academic_degree'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_academic_degree'
    );
    //academic subject
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_academic_subject'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_academic_subject'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_academic_subject'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_academic_subject'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_academic_subject'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_academic_subject'
    );
    //education direction
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_education_direction'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_education_direction'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_education_direction'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_education_direction'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_education_direction'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_education_direction'
    );
    //Department
    await this.catalogClient.subscribeToResponseOf('get_catalog_department');
    await this.catalogClient.subscribeToResponseOf('create_catalog_department');
    await this.catalogClient.subscribeToResponseOf('update_catalog_department');
    await this.catalogClient.subscribeToResponseOf('remove_catalog_department');
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_department'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_department'
    );
    //Department
    await this.catalogClient.subscribeToResponseOf('get_catalog_position');
    await this.catalogClient.subscribeToResponseOf('create_catalog_position');
    await this.catalogClient.subscribeToResponseOf('update_catalog_position');
    await this.catalogClient.subscribeToResponseOf('remove_catalog_position');
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_position'
    );
    await this.catalogClient.subscribeToResponseOf('findOne_catalog_position');
    //Agreement Price
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_agreement_price'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_agreement_price'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_agreement_price'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_agreement_price'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_agreement_price'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_agreement_price'
    );
    //Room
    await this.catalogClient.subscribeToResponseOf('get_catalog_room');
    await this.catalogClient.subscribeToResponseOf('create_catalog_room');
    await this.catalogClient.subscribeToResponseOf('update_catalog_room');
    await this.catalogClient.subscribeToResponseOf('remove_catalog_room');
    await this.catalogClient.subscribeToResponseOf('getResource_catalog_room');
    await this.catalogClient.subscribeToResponseOf('findOne_catalog_room');
    //Registration Purpose
    await this.catalogClient.subscribeToResponseOf(
      'get_catalog_registration_purpose'
    );
    await this.catalogClient.subscribeToResponseOf(
      'create_catalog_registration_purpose'
    );
    await this.catalogClient.subscribeToResponseOf(
      'update_catalog_registration_purpose'
    );
    await this.catalogClient.subscribeToResponseOf(
      'remove_catalog_registration_purpose'
    );
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_registration_purpose'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_registration_purpose'
    );
    //Exam  Rooms
    await this.catalogClient.subscribeToResponseOf('get_catalog_exam_rooms');
    await this.catalogClient.subscribeToResponseOf('create_catalog_exam_rooms');
    await this.catalogClient.subscribeToResponseOf('update_catalog_exam_rooms');
    await this.catalogClient.subscribeToResponseOf('remove_catalog_exam_rooms');
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_exam_rooms'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_exam_rooms'
    );
    //Gender
    await this.catalogClient.subscribeToResponseOf('get_catalog_gender');
    await this.catalogClient.subscribeToResponseOf('findOne_catalog_gender');
    //Exam Form
    await this.catalogClient.subscribeToResponseOf('get_catalog_exam_form');
    await this.catalogClient.subscribeToResponseOf('findOne_catalog_exam_form');

    //Country
    await this.catalogClient.subscribeToResponseOf('get_catalog_country');
    await this.catalogClient.subscribeToResponseOf('create_catalog_country');
    await this.catalogClient.subscribeToResponseOf('update_catalog_country');
    await this.catalogClient.subscribeToResponseOf('remove_catalog_country');
    await this.catalogClient.subscribeToResponseOf(
      'getResource_catalog_country'
    );
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_country'
    );
    await this.catalogClient.connect();
  }
}
