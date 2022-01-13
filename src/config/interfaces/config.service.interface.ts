export interface IConfigService {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  nodeEnv: string;
  getNumber(key: string): number;
  getBoolean(key: string): boolean;
  getString(key: string): string;
}
