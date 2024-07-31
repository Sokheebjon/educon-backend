export type Tokens = {
  access_token: string;
  refresh_token: string;
};
export type JwtPayload = {
  phoneNumber: string;
  sub: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
