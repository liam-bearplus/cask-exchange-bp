import axiosInstance from "@/config/axios";
import {
    KEY_CASK_LISTING,
    KEY_FILTER_CASK_RANGE,
    KEY_FILTER_CASK_TYPE,
} from "@/lib/constants/key";
import { PATH_CASKS, PATH_META_DATA_CASK } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TCask, TCaskRangeType } from "@/types";

class CaskServices {
    async getAllCasks() {
        return handleRequest(axiosInstance.get<TCask[]>(`${PATH_CASKS}`));
    }
    async getCaskListing(params: string) {
        return handleRequest(
            axiosInstance.get<global.TDataWithPagination<TCask[]>>(
                `${PATH_CASKS}/${KEY_CASK_LISTING}${params ? `?${params}` : ""}`
            )
        );
    }
    async getDetailCask(id: number) {
        return handleRequest(axiosInstance.get<TCask>(`${PATH_CASKS}/${id}`));
    }
    async getCaskTypes() {
        return handleRequest(
            axiosInstance.get<TCask[]>(`${KEY_FILTER_CASK_TYPE}`)
        );
    }
    async filterCasksByRange() {}
    async updateDetailCask(id: number, data: unknown) {
        return handleRequest(axiosInstance.put(`${PATH_CASKS}/${id}`, data));
    }
    async getCaskRange() {
        return handleRequest(
            axiosInstance.get<TCaskRangeType>(
                `${PATH_META_DATA_CASK}/${KEY_FILTER_CASK_RANGE}`
            )
        );
    }
    async deleteCask() {}
    async searchCasks(search: string) {
        return handleRequest(
            axiosInstance.get<TCask[]>(`${PATH_CASKS}/search?q=${search}`)
        );
    }
}

const caskServices = new CaskServices();

export default caskServices;
