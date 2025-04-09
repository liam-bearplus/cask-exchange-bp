import axiosInstance from "@/config/axios";
import { KEY_REGION_LIST } from "@/lib/constants/key";
import { PATH_CLASSIFICATION } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TRegion } from "@/types";
import { TClassification } from "@/types/classification";

class ClassificationsServices {
    async getClassification() {
        return handleRequest(
            axiosInstance.get<TRegion[]>(`${PATH_CLASSIFICATION}`)
        );
    }
    async createClassification(data: unknown) {
        return handleRequest(
            axiosInstance.post(`${PATH_CLASSIFICATION}`, data)
        );
    }
    async getClassificationListing(params: string) {
        return handleRequest(
            axiosInstance.get<TClassification[]>(
                `${PATH_CLASSIFICATION}/${KEY_REGION_LIST}/${params}`
            )
        );
    }
    async getClassificationDetails(id: string) {
        return handleRequest(
            axiosInstance.get<[]>(`${PATH_CLASSIFICATION}/${id}`)
        );
    }

    async updateRegionDetails(id: number, data: unknown) {
        return handleRequest(
            axiosInstance.put(`${PATH_CLASSIFICATION}/${id}`, data)
        );
    }

    async deleteRegionDetails(id: string) {
        return handleRequest(
            axiosInstance.delete(`${PATH_CLASSIFICATION}/${id}`)
        );
    }
}

const classificationsServices = new ClassificationsServices();

export default classificationsServices;
