import { QueryClient } from "@tanstack/react-query";
const queryClientConfig = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            refetchOnWindowFocus: false,
            retry: 3,
        },
    },
});
export default queryClientConfig;
