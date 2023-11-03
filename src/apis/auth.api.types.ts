interface loginResponse {
  token: string;
  refreshToken: string;
}

interface loginRequest {
  email: string;
  password: string;
}

export type { loginResponse, loginRequest };
