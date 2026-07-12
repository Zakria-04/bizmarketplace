export type LoginRegisterPayload = {
  fullName?: string;
  confirmPassword?: string;
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
};

export type AuthStoreType = {
  user: UserType | null;
  isLoading: boolean;
  errorCode: string | null;

  // Functions
  register: (body: LoginRegisterPayload) => Promise<void>;
  login: (body: LoginRegisterPayload) => Promise<boolean | void>;
};
