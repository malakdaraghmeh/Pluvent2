import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const mainApi = axios.create({
  baseURL,
  // withCredentials: true,
});

const lang = localStorage.getItem('i18nextLng') || 'ar';
mainApi.interceptors.request.use((config) => {
  const token = Cookies.get("PULVENTCLIENTDASHBOARD_TOKEN");

  if (token) {
    (config.headers as any) = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  config.headers["Language"] = lang;
  config.headers["Accept-Language"] = lang;


  if (
    config.data &&
    typeof config.data === "object" &&
    !(config.data instanceof FormData)
  ) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export const axiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
    async ({ url, method, data, params, headers }: { url: string; method: string; data?: any; params?: any; headers?: any }) => {
      try {
        const result = await mainApi({
          url: baseUrl + url,
          method,
          data,
          params,
          headers
        });

        return { data: result.data };
      } catch (error) {
        const err = error;



        if (
          err.response &&
          err.response.status === 401 &&
          window.location.pathname !== `/${lang}/login`) {
          Cookies.remove("PULVENTCLIENTDASHBOARD_TOKEN");

          if (!window.location.href.endsWith("login")) {
            window.location.href = `/${lang}/login`;

            console.log({
              title: "Session expired",
              description: "Please log in again.",
              variant: "destructive",
            });
          }
        }

        return {
          error: {
            status: err.response?.status || null,
            data: err.response?.data || err.message,
          },
        };
      }
    };

