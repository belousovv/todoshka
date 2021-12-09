import api from "./api";

const authApi = {
  // register

  register: (name: string, email: string, password: string) => {
    return api
      .post<TRegisterSuccess | TRegisterError>("/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  },

  // login

  login: (email: string, password: string) => {
    return api
      .post<TLoginSuccess | TLoginError>("/auth/login", { email, password })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  },

  // verify

  verify: () => {
    return api.get<boolean>("/auth/verify").then((res) => res.data);
  },
};

export default authApi;

// TYPES

type TLoginSuccess = {
  code: 0;
  token: string;
};

type TLoginError = {
  code: 1;
  message: string;
};

type TRegisterSuccess = {
  code: 0;
  token: string;
};

type TRegisterError = {
  code: 1;
  message: string;
};
