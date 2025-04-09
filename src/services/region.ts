import axiosInstance from "@/config/axios";
import { KEY_REGION_LIST } from "@/lib/constants/key";
import { PATH_REGIONS } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TRegion, TRegionCreateInput } from "@/types";

class RegionsServices {
    async getRegions() {
        return handleRequest(axiosInstance.get<TRegion[]>(`${PATH_REGIONS}`));
    }
    async createRegions(data: TRegionCreateInput) {
        return handleRequest(axiosInstance.post(`${PATH_REGIONS}`, data));
    }
    async getRegionsListing() {
        return handleRequest(
            axiosInstance.get<TRegion[]>(`${PATH_REGIONS}/${KEY_REGION_LIST}`)
        );
    }
    async getRegionDetails(id: string) {
        return handleRequest(
            axiosInstance.get<TRegion[]>(`${PATH_REGIONS}/${id}`)
        );
    }

    async updateRegionDetails(id: number, data: unknown) {
        return handleRequest(axiosInstance.put(`${PATH_REGIONS}/${id}`, data));
    }

    async deleteRegionDetails(id: string) {
        return handleRequest(axiosInstance.delete(`${PATH_REGIONS}/${id}`));
    }
}

const regionsServices = new RegionsServices();

export default regionsServices;
