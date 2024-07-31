export interface LoginResponse {
  message: string
  data: Data
  token_type: string
}

export interface Data {
  token: string
}
