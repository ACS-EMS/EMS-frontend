import axios from "axios";

const apiClient = axios.create({
  baseURL:
      import.meta.env.VITE_API_URL ||
      "http://localhost:8080",

  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically for protected APIs
apiClient.interceptors.request.use(
    (config) => {
      const token =
          localStorage.getItem("token");

      if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default apiClient;