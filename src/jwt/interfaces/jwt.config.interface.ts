export interface IJwtConfig {
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpirationTime: number;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpirationTime: number;
}
