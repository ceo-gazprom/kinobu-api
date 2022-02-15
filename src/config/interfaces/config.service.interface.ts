export interface IConfigService {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  nodeEnv: string;
  getString(key: string): string;
  getNumber(key: string): number;
  getOptionalNumber(key: string): number | undefined;
  getBoolean(key: string): boolean;
}
