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
    DATABASE_CONNECTED: "Database connected successfully",
    DATABASE_CONNECTION_ERROR: "Database not connected",
    ACCOUNT_ALREADY_EXIST: "Account already exist, please try logging in",
    ACCOUNT_CREATED_SUCCESSFULLY: "Account created successfully",
    LOGGED_IN_SUCCESSFULLY: "Logged in successfully",
    ARTICLE_CREATED_SUCCESSFULLY: "Article created successfully",
    ARTICLE_UPDATED_SUCCESSFULLY: "Article updated successfully",
    ARTICLE_READ_SUCCESSFULLY: "Article read successfully",
    ARTICLES_READ_SUCCESSFULLY: "Articles read successfully",
    ARTICLE_DELETED_SUCCESSFULLY: "Article deleted successfully",
    COMMENT_CREATED_SUCCESSFULLY: "Comment created successfully",
    COMMENT_READ_SUCCESSFULLY: "Comment read successfully",
    COMMENTS_READ_SUCCESSFULLY: "Comments read successfully",
    COMMENT_UPDATED_SUCCESSFULLY: "Comment updated successfully",
    COMMENT_DELETED_SUCCESSFULLY: "Comment deleted successfully",
    CATEGORY_CREATED_SUCCESSFULLY: "Category created successfully",
    CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully",
    CATEGORY_READ_SUCCESSFULLY: "Category read successfully",
    CATEGORIES_READ_SUCCESSFULLY: "Categories read successfully",
    CATEGORY_DELETED_SUCCESSFULLY: "Category deleted successfully",
    GLOBAL_ERROR: "An error occurred, please contact support",
    NOT_FOUND_ERROR: "Resource not found",
    UNAUTHORIZED: "Unauthorized request",
    FORBIDDEN: "Forbidden request",
    INVALID_AUTHENTICATION: "Invalid authentication",
    INVALID_TOKEN: "Invalid token",
    ACCOUNT_NOT_FOUND: "Invalid username or password",
    ACCOUNT_NOT_CREATED: "Could not create account try again",
    PLEASE_LOGIN: "Invalid authentication, please login",
    ARTICLE_NOT_CREATED: "Could not create article",
    ARTICLE_NOT_UPDATED: "Could not update article",
    ARTICLE_NOT_FOUND: "Article not found",
    COMMENT_NOT_CREATED: "Could not create comment",
    COMMENT_NOT_FOUND: "Comment not found",
    COMMENT_NOT_UPDATED: "Could not update comment",
    CATEGORY_NOT_CREATED: "Could not create category",
    CATEGORY_NOT_UPDATED: "Could not update category",
    CATEGORY_NOT_FOUND: "Category not found",
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
