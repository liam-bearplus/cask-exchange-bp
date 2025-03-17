import axiosInstance from "@/config/axios";
import { PATH_CASKS } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import { TCask } from "@/types";
import { isEmpty } from "../lib/utils";

class CaskServices {
    async getAllCasks() {
        return isEmpty(
            handleRequest(axiosInstance.get<TCask[]>(`${PATH_CASKS}`))
        )
            ? []
            : handleRequest(axiosInstance.get<TCask[]>(`${PATH_CASKS}`));
    }
    async getDetailCask(id: number) {
        return handleRequest(axiosInstance.get<TCask>(`${PATH_CASKS}/${id}`));
    }
    async updateDetailCask(id: number, data: unknown) {
        return handleRequest(axiosInstance.put(`${PATH_CASKS}/${id}`, data));
    }
}

const caskServices = new CaskServices();

export default caskServices;
