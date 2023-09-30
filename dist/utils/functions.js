"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPaginationParams = exports.getPaginationParams = void 0;
const constants_1 = require("./constants");
function getPaginationParams(count, pageNumber, pageSize) {
    return {
        pageNumber: pageNumber * pageSize < count ? pageNumber + 1 : constants_1.Pagination.PAGE_NUMBER,
        pageSize: pageSize <= count ? pageSize : count - 1,
        totalCount: count
    };
}
exports.getPaginationParams = getPaginationParams;
// Passed directly from the request query
function setPaginationParams(pageNumber, pageSize) {
    let _pageNumber = Number(pageNumber === null || pageNumber === void 0 ? void 0 : pageNumber.toString()) || constants_1.Pagination.PAGE_NUMBER;
    if (_pageNumber < 1) {
        _pageNumber = constants_1.Pagination.PAGE_NUMBER;
    }
    let _pageSize = Number(pageSize === null || pageSize === void 0 ? void 0 : pageSize.toString()) || constants_1.Pagination.PAGE_SIZE;
    if (_pageSize < 1) {
        _pageSize = constants_1.Pagination.PAGE_SIZE;
    }
    return { pageNumber: _pageNumber, pageSize: _pageSize };
}
exports.setPaginationParams = setPaginationParams;
