export interface IJwtService {
  // getAccessTokenFromRefreshToken(
  //   refreshToken: string,
  //   oldAccessToken: string,
  //   clientId: string,
  //   ipAddress: string,
  // ): Promise<any>;
  getAccessToken(accountId: number): string;
  getRefreshToken(accountId: number): string;
}
