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
  DATABASE_CONNECTED: "database connected successfully",
  ACCOUNT_ALREADY_EXIST: "account already exist, please try logging in",
  ACCOUNT_CREATED_SUCCESSFULLY: "account created successfully",
  LOGGED_IN_SUCCESSFULLY: "logged in successfully",

  GLOBAL_ERROR: "an error occurred, please contact support",
  NOT_FOUND_ERROR: "resource not found",
  DATABASE_CONNECTION_ERROR: "Database not connected",
  ACCOUNT_NOT_CREATED: "could not create account try again",
  ACCOUNT_NOT_FOUND: "invalid username or password"
};

export const RequestType = {
  BODY: "body"
};
