export declare namespace global {
    type TDataWithPagination<T> = {
        data: T;
        total: number;
        page: number;
        limit: number;
    };

    type TDataWithFields = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
