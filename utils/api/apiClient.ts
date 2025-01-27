import config from "../config";

export const apiClient = {
    async get(request, endpoint: string) {
        return request.get(`${config.api.baseURL}${endpoint}`, {
            headers: config.api.headers,
        });
    },
    async post(request, endpoint: string, data: object) {
        return request.post(`${config.api.baseURL}${endpoint}`, {
            data,
            headers: config.api.headers,
        });
    },
    async patch(request, endpoint: string, data: object) {
        return request.patch(`${config.api.baseURL}${endpoint}`, {
            data,
            headers: config.api.headers,
        });
    },
    async delete(request, endpoint: string) {
        return request.delete(`${config.api.baseURL}${endpoint}`, {
            headers: config.api.headers,
        });
    },
};
