export interface ISmsMessageForBatchSending{
    user_sms_id:string,
    to:string
    text:string
}
export interface IBatchSmsPayload {
    messages: ISmsMessageForBatchSending[];
  }
  