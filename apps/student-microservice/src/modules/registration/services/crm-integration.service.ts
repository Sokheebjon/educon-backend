import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { RegistrationRepository } from '../repository/registration.repository';
import moment from 'moment';
import { handleAsyncOperation } from '@edufin-back/common';
import { CreateRegistrationDto } from '@edufin-back/shared/dto';

@Injectable()
export class CrmIntegrationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly registrationRepository: RegistrationRepository
  ) {}

  async createRegistrationToCrm(registration: CreateRegistrationDto) {
    const token = this.configService.get<string>('crm.token');
    const baseUrl = this.configService.get<string>('crm.url');
    const pipeline = this.configService.get<string>('crm.pipeline');
    const payload = [
      {
        name: `${registration?.primary_phone}`,
        pipeline_id: +pipeline,
        __embedded: {
          contacts: [
            {
              first_name: registration?.primary_phone,
              custom_fields_values: [
                {
                  field_id: 1563750, //phone
                  values: [
                    {
                      value: `${registration?.primary_phone}`,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ];
    try {
      const crm_registration = await axios.post(`${baseUrl}/leads`, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (
        crm_registration?.data?._embedded &&
        crm_registration?.data?._embedded.leads &&
        crm_registration?.data?._embedded.leads.length > 0
      ) {
        return crm_registration?.data?._embedded.leads[0].id;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateRegistrationToCrm(registration_id: string) {
    const registration = await handleAsyncOperation(
      this.registrationRepository.findOne(registration_id)
    );
    const token = this.configService.get<string>('crm.token');
    const baseUrl = this.configService.get<string>('crm.url');
    const client_host = this.configService.get<string>('app.client_host');
    if (
      registration?.first_name &&
      registration?.last_name &&
      !registration?.crm_contact_id
    ) {
      const payload = [
        {
          first_name: registration?.first_name,
          last_name: registration?.last_name,
          custom_fields_values: [
            {
              field_code: 'PHONE',
              values: [
                {
                  enum_code: 'WORK',
                  value: registration?.primary_phone,
                },
              ],
            },
          ],
        },
      ];
      try {
        // create contact
        const crm_contact = await axios.post(`${baseUrl}/contacts`, payload, {
          headers: {
            Authorization: token,
          },
        });
        if (
          crm_contact?.data?._embedded &&
          crm_contact?.data?._embedded.contacts &&
          crm_contact?.data?._embedded.contacts.length > 0
        ) {
          const crm_contact_id = crm_contact?.data._embedded.contacts[0].id;
          await this.registrationRepository.update(registration?.id, {
            crm_contact_id,
          });
          //link contact with lead
          const link_payload = [
            {
              to_entity_id: crm_contact_id,
              to_entity_type: 'contacts',
            },
          ];
          await axios.post(
            `${baseUrl}/leads/${registration?.crm_id}/link`,
            link_payload,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    let status_id = undefined;
    if (registration.step == 1) {
      status_id = 64054266; //2-ETAP/PASSPORT MA'LUMOTLARI
    } else if (registration?.step == 2) {
      status_id = 64054270; //3-ETAP/TA'LIM YO'NALISHI
    } else if (registration?.step == 3) {
      status_id = 64054274; //4-ETAP/Yakunlash
    }
    if (registration.status === 'APPROVED_FOR_EXAM') {
      status_id = 66073174;
    } else if (registration.status === 'EXAM_FINISHED') {
      status_id = 142;
    } else if (registration?.status === 'REJECTED') {
      status_id = 143;
    }

    const payload = [
      {
        id: +registration?.crm_id,
        custom_fields_values: [
          {
            field_id: 7401, //otasini ismi
            values: [
              {
                value: registration?.father_name
                  ? `${registration?.father_name}`
                  : '',
              },
            ],
          },
          {
            field_id: 1563750, //phone
            values: [
              {
                value: `${registration?.primary_phone}`,
              },
            ],
          },
          {
            field_id: 1563748, //ismi
            values: [
              {
                value: `${registration?.first_name} ${registration?.last_name} ${registration?.father_name}`,
              },
            ],
          },
          ...(registration?.birth_date
            ? [
                {
                  field_id: 7451, //tugilgan sanasi
                  values: [
                    {
                      value: moment(registration?.birth_date).format(
                        'YYYY-MM-DDTHH:mm:ssZ'
                      ),
                    },
                  ],
                },
              ]
            : []),
          {
            field_id: 7399, //passport number
            values: [
              {
                value: registration?.passport || '',
              },
            ],
          },
          {
            field_id: 1579931, //passport photo
            values: [
              {
                value: registration?.passport_file_id
                  ? `${client_host}/api/file/${registration?.passport_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1579937, //Ielts photo
            values: [
              {
                value: registration?.ielts_file_id
                  ? `${client_host}/api/file/${registration?.ielts_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1579935, //DTM photo
            values: [
              {
                value: registration?.dtm_file_id
                  ? `${client_host}/api/file/${registration?.dtm_file_id}`
                  : '',
              },
            ],
          },
          ...(registration?.education_language?.nameUz
            ? [
                {
                  field_id: 1558719, //talim tili
                  values: [
                    {
                      value: registration?.education_language?.nameUz,
                    },
                  ],
                },
              ]
            : []),
          ...(registration?.education_direction?.nameUz
            ? [
                {
                  field_id: 1558721, //oquv yunalishi
                  values: [
                    {
                      value: registration?.education_direction?.nameUz,
                    },
                  ],
                },
              ]
            : []),

          {
            field_id: 1558723, //talim shakli
            values: [
              {
                value: registration?.education_form?.nameUz || '',
              },
            ],
          },
          {
            field_id: 1558725, //imtihon turi
            values: [
              {
                value: registration?.exam_form_id
                  ? registration?.exam_form_id === 0
                    ? 'Onlayn'
                    : 'Offlayn'
                  : '',
              },
            ],
          },
          {
            field_id: 1579941, //diplom rasm
            values: [
              {
                value: registration?.diplom_file_id
                  ? `${client_host}/api/file/${registration?.diplom_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1558727, //jinsi
            values: [
              {
                value: registration?.gender_id
                  ? registration?.gender_id === 1
                    ? 'Erkak'
                    : 'Ayol'
                  : '',
              },
            ],
          },
        ],
        status_id,
      },
    ];

    try {
      const crm_registration = await axios.patch(`${baseUrl}/leads`, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (
        crm_registration?.data?._embedded &&
        crm_registration?.data?._embedded.leads &&
        crm_registration?.data?._embedded.leads.length > 0
      ) {
        return crm_registration?.data?._embedded.leads[0]?.updated_at;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err?.response?.data);
      console.log(err?.response?.data?.['validation-errors']?.[0]?.errors);
    }
  }
  async updateRegistrationToCrmcontractPipeline(registration_id: string) {
    const registration = await handleAsyncOperation(
      this.registrationRepository.findOne(registration_id)
    );
    const token = this.configService.get<string>('crm.token');
    const baseUrl = this.configService.get<string>('crm.url');
    const client_host = this.configService.get<string>('app.client_host');

    const status_id = 64054422;

    const payload = [
      {
        name: `${registration?.last_name} ${registration?.first_name} ${registration?.father_name}`,
        pipeline_id: 7769086, //Kontract pipeline
        custom_fields_values: [
          {
            field_id: 7401, //otasini ismi
            values: [
              {
                value: registration?.father_name
                  ? `${registration?.father_name}`
                  : '',
              },
            ],
          },
          {
            field_id: 1563750, //phone
            values: [
              {
                value: `${registration?.primary_phone}`,
              },
            ],
          },
          {
            field_id: 1563748, //ismi
            values: [
              {
                value: `${registration?.first_name} ${registration?.last_name} ${registration?.father_name}`,
              },
            ],
          },
          ...(registration?.birth_date
            ? [
                {
                  field_id: 7451, //tugilgan sanasi
                  values: [
                    {
                      value: moment(registration?.birth_date).format(
                        'YYYY-MM-DDTHH:mm:ssZ'
                      ),
                    },
                  ],
                },
              ]
            : []),
          {
            field_id: 7399, //passport number
            values: [
              {
                value: registration?.passport || '',
              },
            ],
          },
          {
            field_id: 1577677, //passport photo
            values: [
              {
                value: registration?.passport_file_id
                  ? `${client_host}/api/file/${registration?.passport_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1577681, //Ielts photo
            values: [
              {
                value: registration?.ielts_file_id
                  ? `${client_host}/api/file/${registration?.ielts_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1577683, //DTM photo
            values: [
              {
                value: registration?.dtm_file_id
                  ? `${client_host}/api/file/${registration?.dtm_file_id}`
                  : '',
              },
            ],
          },
          ...(registration?.education_language?.nameUz
            ? [
                {
                  field_id: 1558719, //talim tili
                  values: [
                    {
                      value: registration?.education_language?.nameUz,
                    },
                  ],
                },
              ]
            : []),
          ...(registration?.education_direction?.nameUz
            ? [
                {
                  field_id: 1558721, //oquv yunalishi
                  values: [
                    {
                      value: registration?.education_direction?.nameUz,
                    },
                  ],
                },
              ]
            : []),

          {
            field_id: 1558723, //talim shakli
            values: [
              {
                value: registration?.education_form?.nameUz || '',
              },
            ],
          },
          {
            field_id: 1558725, //imtihon turi
            values: [
              {
                value: registration?.exam_form_id
                  ? registration?.exam_form_id === 0
                    ? 'Onlayn'
                    : 'Offlayn'
                  : '',
              },
            ],
          },
          {
            field_id: 1577679, //diplom rasm
            values: [
              {
                value: registration?.diplom_file_id
                  ? `${client_host}/api/file/${registration?.diplom_file_id}`
                  : '',
              },
            ],
          },
          {
            field_id: 1558727, //jinsi
            values: [
              {
                value: registration?.gender_id
                  ? registration?.gender_id === 1
                    ? 'Erkak'
                    : 'Ayol'
                  : '',
              },
            ],
          },
        ],
        status_id,
      },
    ];

    try {
      const crm_registration = await axios.post(`${baseUrl}/leads`, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (
        crm_registration?.data?._embedded &&
        crm_registration?.data?._embedded.leads &&
        crm_registration?.data?._embedded.leads.length > 0
      ) {
        if (registration?.crm_contact_id) {
          //link contact with lead
          const link_payload = [
            {
              to_entity_id: registration?.crm_contact_id,
              to_entity_type: 'contacts',
            },
          ];
          await axios.post(
            `${baseUrl}/leads/${crm_registration?.data?._embedded.leads[0].id}/link`,
            link_payload,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }
      }
      return crm_registration?.data?._embedded.leads[0].id;
    } catch (err) {
      console.log(err?.response?.data);
      console.log(err?.response?.data?.['validation-errors']?.[0]?.errors);
    }
  }
}
