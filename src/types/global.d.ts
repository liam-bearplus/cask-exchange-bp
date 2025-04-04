declare namespace global {
    type TDataWithPagination<T> = {
        data: T;
        total: number;
        page: number;
        limit: number;
    };
}
