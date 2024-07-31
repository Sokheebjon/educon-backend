export enum Status {
  Waiting = 'Waiting',
  TRANSMTD = 'TRANSMTD',
  DELIVRD = 'DELIVRD',
  UNDELIV = 'UNDELIV',
  EXPIRED = 'EXPIRED',
  REJECTD = 'REJECTD',
  DELETED = 'DELETED',
}

export interface SMSResponse {
  id:string
}

