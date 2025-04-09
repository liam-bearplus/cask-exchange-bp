import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: {
            status: number;
            message: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: AxiosError<unknown, any>["data"];
        };
    }
}
