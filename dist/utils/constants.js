"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.RequestType = exports.Messages = exports.StatusCode = exports.Constants = void 0;
exports.Constants = {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    PORT: 8000,
    JWT_TTL: 1800,
    SALT_ROUNDS: 10
};
exports.StatusCode = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND_ERROR: 404,
    INTERNAL_ERROR: 500
};
exports.Messages = {
    DATABASE_CONNECTED: "database connected successfully",
    ACCOUNT_ALREADY_EXIST: "account already exist, please try logging in",
    ACCOUNT_CREATED_SUCCESSFULLY: "account created successfully",
    LOGGED_IN_SUCCESSFULLY: "logged in successfully",
    ARTICLE_CREATED_SUCCESSFULLY: "article created successfully",
    ARTICLE_UPDATED_SUCCESSFULLY: "article updated successfully",
    ARTICLE_READ_SUCCESSFULLY: "article read successfully",
    ARTICLES_READ_SUCCESSFULLY: "articles read successfully",
    ARTICLE_DELETED_SUCCESSFULLY: "article deleted successfully",
    COMMENT_CREATED_SUCCESSFULLY: "comment created successfully",
    COMMENT_READ_SUCCESSFULLY: "comment read successfully",
    COMMENTS_READ_SUCCESSFULLY: "comments read successfully",
    COMMENT_UPDATED_SUCCESSFULLY: "comment updated successfully",
    COMMENT_DELETED_SUCCESSFULLY: "comment deleted successfully",
    CATEGORY_CREATED_SUCCESSFULLY: "category created successfully",
    CATEGORY_UPDATED_SUCCESSFULLY: "category updated successfully",
    CATEGORY_READ_SUCCESSFULLY: "category read successfully",
    CATEGORIES_READ_SUCCESSFULLY: "categories read successfully",
    CATEGORY_DELETED_SUCCESSFULLY: "category deleted successfully",
    GLOBAL_ERROR: "an error occurred, please contact support",
    NOT_FOUND_ERROR: "resource not found",
    DATABASE_CONNECTION_ERROR: "Database not connected",
    ACCOUNT_NOT_CREATED: "could not create account try again",
    ACCOUNT_NOT_FOUND: "invalid username or password",
    UNAUTHORIZED: "unauthorized request",
    FORBIDDEN: "forbidden request",
    INVALID_AUTHENTICATION: "invalid authentication",
    PLEASE_LOGIN: "Invalid authentication, please login",
    ARTICLE_NOT_CREATED: "could not create article",
    ARTICLE_NOT_UPDATED: "could not update article",
    ARTICLE_NOT_FOUND: "article not found",
    COMMENT_NOT_CREATED: "could not create comment",
    COMMENT_NOT_FOUND: "comment not found",
    COMMENT_NOT_UPDATED: "could not update comment",
    CATEGORY_NOT_CREATED: "could not create category",
    CATEGORY_NOT_UPDATED: "could not update category",
    CATEGORY_NOT_FOUND: "category not found",
    CATEGORY_ALREADY_EXIST: "Category already exist"
};
exports.RequestType = {
    BODY: "body",
    PARAMS: "params",
    QUERY: "query"
};
exports.Pagination = {
    PAGE_NUMBER: 1,
    PAGE_SIZE: 20,
    PAGE_SIZE_OF_THIRTY_PERCENT: 0.3
};
