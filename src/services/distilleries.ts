import axiosInstance from "@/config/axios";
import { KEY_FILTER_CASK_TYPE } from "@/lib/constants/key";
import { PATH_DISTILLERIES } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TCask, TDistillery } from "@/types";

class DistilleriesServices {
    async getDistillery() {
        return handleRequest(
            axiosInstance.get<TDistillery[]>(`${PATH_DISTILLERIES}`)
        );
    }
    async getDetailCask(id: number) {
        return handleRequest(
            axiosInstance.get<TDistillery>(`${PATH_DISTILLERIES}/${id}`)
        );
    }
    async getCaskTypes() {
        return handleRequest(
            axiosInstance.get<TDistillery[]>(`${KEY_FILTER_CASK_TYPE}`)
        );
    }
    async filterCasksByRange() {}
    async updateDetailCask(id: number, data: unknown) {
        return handleRequest(
            axiosInstance.put(`${PATH_DISTILLERIES}/${id}`, data)
        );
    }

    async searchCasks(search: string) {
        return handleRequest(
            axiosInstance.get<TCask[]>(
                `${PATH_DISTILLERIES}/search?q=${search}`
            )
        );
    }
}

const distilleriesServices = new DistilleriesServices();

export default distilleriesServices;
