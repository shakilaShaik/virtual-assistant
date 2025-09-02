const baseUrl = import.meta.env.VITE_API_URL;
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
    method: "get"
  },
  updateUser: {
    url: "api/auth/update-user",
    method: "put"
  },

  askGemini: {
    url: "ask/ask-gemini",
    method: 'post'
  }
};
export { api, baseUrl };
