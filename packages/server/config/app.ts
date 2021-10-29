export const appConfig: AppConfig = {
  port: process.env.PORT || 3333,
  host: process.env.HOST || '0.0.0.0'
};

export interface AppConfig {
  port: number | string;
  host: string;
}
