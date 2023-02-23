import { AxiosResponse } from 'axios';


export function responseInterceptor({ response }: { response: AxiosResponse; }) {
  return response;
}
