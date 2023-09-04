import { Pagination } from "./constants";

export function getPaginationParams(
  count: number,
  pageNumber: number,
  pageSize: number
) {
  return {
    pageNumber:
      pageNumber * pageSize < count ? pageNumber + 1 : Pagination.PAGE_NUMBER,
    pageSize: pageSize <= count ? pageSize : count - 1,
    totalCount: count
  };
}

// Passed directly from the request query
export function setPaginationParams(pageNumber?: string, pageSize?: string) {
  let _pageNumber = Number(pageNumber?.toString()) || Pagination.PAGE_NUMBER;

  if (_pageNumber < 1) {
    _pageNumber = Pagination.PAGE_NUMBER;
  }

  let _pageSize = Number(pageSize?.toString()) || Pagination.PAGE_SIZE;

  if (_pageSize < 1) {
    _pageSize = Pagination.PAGE_SIZE;
  }

  return { pageNumber: _pageNumber, pageSize: _pageSize };
}
