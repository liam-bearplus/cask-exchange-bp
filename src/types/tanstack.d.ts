import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: {
            status: number;
            message: string;
            data: AxiosError<unknown, any>["data"];
        };
    }
}
