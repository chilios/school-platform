export const config = {
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    accessExpiry: '15m',
    refreshExpiry: '7d',
  },
  port: process.env.PORT || 4000,
};
