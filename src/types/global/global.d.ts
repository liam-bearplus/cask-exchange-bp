export declare namespace global {
    type TDataWithPagination<T> = {
        data: T;
        totalRecords: number;
        page: number;
        totalPages: number;
        size: number;
    };

    type TDataWithFields = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
