export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RouteUser = {
  name: string;
  email: string;
  role: string;
};

export type SignInApiResponse = {
  message: string;
  user: RouteUser;
  token: string;
};

export type RegisterApiResponse = {
  message: string;
};

export type ErrorApiResponse = {
  message?: string;
  errors?: {
    msg?: string;
  }[];
};