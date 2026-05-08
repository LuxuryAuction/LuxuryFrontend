export interface IRegisterRequest {
  email: string;
  userName: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IRegisterResponse {
  message?: string;
}

export interface ILoginRequest {
  userNameOrEmail: string;
  password?: string;
}

export interface IAuthTokens {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

