export const appConfig: AppConfig = {
  name: 'Monorepo',
  port: process.env.PORT || 3333,
  host: process.env.HOST || '0.0.0.0'
};

export interface AppConfig {
  name: string;
  port: number | string;
  host: string;
}
