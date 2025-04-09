import axiosInstance from "@/config/axios";
import { KEY_DISTILLERIES_LIST } from "@/lib/constants/key";
import { PATH_DISTILLERIES } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TCask, TDistillery } from "@/types";

class DistilleriesServices {
    async getDistillery() {
        return handleRequest(
            axiosInstance.get<TDistillery[]>(`${PATH_DISTILLERIES}`)
        );
    }
    async getDistilleriesListing() {
        return handleRequest(
            axiosInstance.get<TDistillery[]>(
                `${PATH_DISTILLERIES}/${KEY_DISTILLERIES_LIST}`
            )
        );
    }
    async getDetailDistillery(id: number) {
        return handleRequest(
            axiosInstance.get<TDistillery>(`${PATH_DISTILLERIES}/${id}`)
        );
    }

    async filterCasksByRange() {}
    async updateDetailDistillery(id: number, data: unknown) {
        return handleRequest(
            axiosInstance.put(`${PATH_DISTILLERIES}/${id}`, data)
        );
    }

    async deleteDistillery(id: string) {
        return handleRequest(
            axiosInstance.delete<TCask[]>(`${PATH_DISTILLERIES}/${id}`)
        );
    }

    async searchDistilleries(query: string) {
        return handleRequest(
            axiosInstance.get<TDistillery[]>(
                `${PATH_DISTILLERIES}/search/${query}`
            )
        );
    }
}

const distilleriesServices = new DistilleriesServices();

export default distilleriesServices;
