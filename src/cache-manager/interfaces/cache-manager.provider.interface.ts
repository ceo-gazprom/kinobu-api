export interface ICacheManagerProvider {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<string>;
}
