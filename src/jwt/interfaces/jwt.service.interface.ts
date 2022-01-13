export interface IJwtService {
  getAccessToken(accountId: number): string;
  getRefreshToken(accountId: number): string;
}
