const baseUrl = "http://localhost:3000";
const api = {
  register: {
    url: "api/auth/signup",
    method: "post",
  },

  login: {
    url: "api/auth/login",
    method: "post",
  },
  logout: {
    url: "api/auth/logout",
    method: "get",
  },

  getUser: {
    url: "api/auth/get-user",
    method:"get"
  },
  updateUser: {
    url: "api/auth/update-user",
    method:"put"
  },
};
export { api, baseUrl };
