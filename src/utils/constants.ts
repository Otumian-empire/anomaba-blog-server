export const Constants = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  PORT: 8000,
  JWT_TTL: 1800,
  SALT_ROUNDS: 10
};

export const StatusCode = {
  OK: 200,
  NOT_FOUND_ERROR: 404,
  INTERNAL_ERROR: 500
};

export const Messages = {
  DATABASE_CONNECTED: "Database connected successfully",

  GLOBAL_ERROR: "an error occurred, please contact support",
  NOT_FOUND_ERROR: "resource not found",
  DATABASE_CONNECTION_ERROR: "Database not connected"
};
