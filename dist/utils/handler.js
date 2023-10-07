"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtErrorResponse = exports.NotFoundResponse = exports.SuccessResponse = exports.SuccessMessageResponse = exports.ForbiddenResponse = exports.AuthFailureResponse = exports.FailureResponse = void 0;
const constants_1 = require("./constants");
function FailureResponse(res, message) {
    return res.status(constants_1.StatusCode.OK).json({
        status: false,
        message: message
    });
}
exports.FailureResponse = FailureResponse;
function AuthFailureResponse(res) {
    return res.status(constants_1.StatusCode.UNAUTHORIZED).json({
        status: false,
        message: constants_1.Messages.UNAUTHORIZED
    });
}
exports.AuthFailureResponse = AuthFailureResponse;
function ForbiddenResponse(res) {
    return res.status(constants_1.StatusCode.FORBIDDEN).json({
        status: false,
        message: constants_1.Messages.FORBIDDEN
    });
}
exports.ForbiddenResponse = ForbiddenResponse;
function SuccessMessageResponse(res, message) {
    return res.status(constants_1.StatusCode.OK).json({
        success: true,
        message: message
    });
}
exports.SuccessMessageResponse = SuccessMessageResponse;
function SuccessResponse(res, body) {
    return res.status(constants_1.StatusCode.OK).json({
        success: true,
        message: body.message,
        data: body.data
    });
}
exports.SuccessResponse = SuccessResponse;
function NotFoundResponse(res) {
    return res.status(constants_1.StatusCode.NOT_FOUND_ERROR).json({
        success: false,
        message: constants_1.Messages.NOT_FOUND_ERROR
    });
}
exports.NotFoundResponse = NotFoundResponse;
function JwtErrorResponse(res, message) {
    return res.status(constants_1.StatusCode.UNAUTHORIZED).json({
        success: false,
        message: message
    });
}
exports.JwtErrorResponse = JwtErrorResponse;
