import { useMutationState } from "@tanstack/react-query";

export default function useGetMutationState<T>({ key }: { key: string }) {
    const data = useMutationState({
        filters: { mutationKey: [key] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as T,
        }),
    })[0];

    return data;
}
