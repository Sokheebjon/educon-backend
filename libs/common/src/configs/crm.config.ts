import { registerAs } from '@nestjs/config';

export default registerAs(
  'crm',
  (): Record<string, any> => ({
    token: process.env.CRM_TOKEN,
    pipeline: process.env.CRM_PIPELINE_ID,
    url: process.env.CRM_URL,
  })
);
