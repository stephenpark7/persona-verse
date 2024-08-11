import { z } from 'zod';
import { ENV } from './env';

const ApiConfigSchema = z.object({
  protocol: z.string(),
  hostName: z.string(),
  port: z.number(),
  baseUrl: z.string(),
});

class ApiConfig {
  protocol: string;
  hostName: string;
  port: number;
  baseUrl: string;

  constructor() {
    const data = {
      protocol: ENV.VITE_API_PROTOCOL,
      hostName: ENV.VITE_API_HOST_NAME,
      port:     ENV.VITE_API_PORT,
      baseUrl: `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST_NAME}:${ENV.VITE_API_PORT}/api/`,
    };

    const parsedData = ApiConfigSchema.parse(data);

    this.protocol = parsedData.protocol;
    this.hostName = parsedData.hostName;
    this.port = parsedData.port;
    this.baseUrl = parsedData.baseUrl;
  }

  urlWithParams(controller: string, action: string): string {
    return `${this.baseUrl}${controller}/${action}`;
  }
}

export const apiConfig = new ApiConfig();
