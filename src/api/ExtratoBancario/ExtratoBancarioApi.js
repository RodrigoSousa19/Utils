import ApiService from '../../services/ApiService';

export default class ExtratoBancarioApi {

    static async getAllExtratoBancario() {
        return ApiService.get('ExtratoBancario');
    }

    static async getExtratoBancarioById(id) {
        return ApiService.get(`ExtratoBancario/${id}`);
    }

    static async createExtratoBancario(data) {
        return ApiService.post('ExtratoBancario', data);
    }

    static async updateExtratoBancario(id, data) {
        return ApiService.put(`ExtratoBancario/${id}`, data);
    }

    static async deleteExtratoBancario(id) {
        return ApiService.delete(`ExtratoBancario/${id}`);
    }

    static async getExtratosAgrupados() {
        return ApiService.get('ExtratoBancario/agrupados');
    }
}