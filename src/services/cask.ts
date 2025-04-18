import axiosInstance from "@/config/axios";
import {
    KEY_CASK_LISTING,
    KEY_FILTER_CASK_RANGE,
    KEY_FILTER_CASK_TYPE,
    KEY_RESENTLY_VIEWED,
    KEY_SEARCH_CASK,
    KEY_SORT_CASK,
} from "@/lib/constants/key";
import { PATH_CASKS, PATH_META_DATA_CASK } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TCask, TCaskRangeType, TCaskSort, TCaskType } from "@/types";
import { global } from "@/types/global/global";

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
    async getRecentViewCasks({ params }: { params: string }) {
        return handleRequest(
            axiosInstance.get<global.TDataWithPagination<TCask[]>>(
                `${PATH_CASKS}/${KEY_RESENTLY_VIEWED}${params ? `?${params}` : ""}`
            )
        );
    }
    async getGrowthCasks() {
        return handleRequest(
            axiosInstance.get<global.TDataWithPagination<TCask[]>>(
                `${PATH_CASKS}/${KEY_CASK_LISTING}?page=1&size=10&sortBy=averageGrowth&sortOrder=DESC`
            )
        );
    }
    async getFeaturedCasks() {
        return handleRequest(
            axiosInstance.get<global.TDataWithPagination<TCask[]>>(
                `${PATH_CASKS}/${KEY_CASK_LISTING}?sortBy=viewCount&sortOrder=DESC&size=10&page=1`
            )
        );
    }
    async getHighVoltageCasks() {
        return handleRequest(
            axiosInstance.get<global.TDataWithPagination<TCask[]>>(
                `${PATH_CASKS}/${KEY_CASK_LISTING}?page=1&size=10&sortBy=abv&sortOrder=DESC`
            )
        );
    }

    async getDetailCask(id: number) {
        return handleRequest(axiosInstance.get<TCask>(`${PATH_CASKS}/${id}`));
    }
    async getCaskTypes() {
        return handleRequest(
            axiosInstance.get<TCaskType[]>(`${KEY_FILTER_CASK_TYPE}`)
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
    async getSortedCasks() {
        return handleRequest(
            axiosInstance.get<{
                sortOptions: TCaskSort[];
            }>(`${PATH_META_DATA_CASK}/${KEY_SORT_CASK}`)
        );
    }

    async deleteCask() {}
    async searchCasks(params: string) {
        return handleRequest(
            axiosInstance.get<TCask[]>(
                `${PATH_CASKS}/${KEY_SEARCH_CASK}?query=${params}&page=1&size=10`
            )
        );
    }
}

const caskServices = new CaskServices();

export default caskServices;
