import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Constants from "@app/types/Constants";
 
// enum StatusCode{
//   Unauthorized = 401,
//   Forbidden = 403,
//   TooManyRequests = 429,
//   InternalServerError = 500,
// }

const urlBase:string = (process.env.REACT_APP_API_URL as string);


// Podemos usar la siguiente función para inyectar el token JWT a través de un interceptor
// Obtenemos el `accessToken` del localStorage que configuramos cuando nos autenticamos
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem(Constants.ACCESS_TOKEN);
    console.log(urlBase);
    if (token != null) {
      config.headers =  { 'Authorization': `Bearer ${token}`};
    }
    return config;
  } catch (_error: unknown) {
    const e = _error as Error
    throw new Error(e.stack);
  }
};



const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // debugger;
 // console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
 //console.error(`[request error] [${JSON.stringify(error)}]`);
  return handleError(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
 // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return handleError(error);
}

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance  => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}


  // Manejar errores de aplicaciones globales
  // Podemos manejar errores genéricos de aplicaciones dependiendo del código de estado
  const handleError=(error: AxiosError): Promise<AxiosError> => {
    const { isAxiosError } = error;

    if(isAxiosError){
      return Promise.reject(error);
    }

    if(isAxiosError){
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }


/***** */

class Http {

  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance{
     return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp(){
    const http = axios.create({
      baseURL: urlBase,
     // headers: headers_,
      // {
      //   "Accept": "application/json",
      //   "Content-Type": "application/json; charset=utf-8",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Credentials": true,
      //   "X-Requested-With": "XMLHttpRequest",
      //  // 'X-Custom-Header': 'foobar'
      //  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      // },
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      timeout: 15000
    });

     http.interceptors.request.use(injectToken,(error) => Promise.reject(error));
    // http.interceptors.request.use((error) => Promise.reject(error));


    setupInterceptorsTo(http);

    this.instance = http;
    return http;
  }
  
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // // Manejar errores de aplicaciones globales
  // // Podemos manejar errores genéricos de aplicaciones dependiendo del código de estado
  // private handleError(error: any) {
  //   const { response, isAxiosError } = error;

  //   if(response  == undefined  && isAxiosError == undefined){
  //     return Promise.reject(error);
  //   }

  //   if(isAxiosError){
  //     return Promise.reject(error);
  //   }

  //   switch (response.status) {
  //     case StatusCode.InternalServerError: {
  //       // Handle InternalServerError
  //       console.error('Handle InternalServerError');
  //       break;
  //     }
  //     case StatusCode.Forbidden: {
  //       // Handle Forbidden
  //       console.error('Handle Forbidden');
  //       break;
  //     }
  //     case StatusCode.Unauthorized: {
  //       // Handle Unauthorized
  //       console.error('Handle Unauthorized');
  //       break;
  //     }
  //     case StatusCode.TooManyRequests: {
  //       // Handle TooManyRequests
  //       console.error('Handle TooManyRequests');
  //       break;
  //     }
  //   }

  //   return Promise.reject(error);
  // }
}


export const http = new Http();