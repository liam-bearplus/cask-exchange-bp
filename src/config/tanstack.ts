import { QueryClient } from "@tanstack/react-query";
const queryClientConfig = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
            retry: 3,
            initialData: undefined,
        },
    },
});
export default queryClientConfig;
