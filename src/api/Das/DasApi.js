import ApiService from '../../services/ApiService';

export default class DasApi {

    static async getAllDas() {
        return ApiService.get('Das');
    }

    static async getDasById(id) {
        return ApiService.get(`Das/${id}`);
    }

    static async createDas(data) {
        return ApiService.post('Das', data);
    }

    static async updateDas(id, data) {
        return ApiService.put(`Das/${id}`, data);
    }

    static async deleteDas(id) {
        return ApiService.delete(`Das/${id}`);
    }
}