import ApiService from '../../services/ApiService';

export default class ComposicaoSalarialApi {

    static async getAllComposicaoSalarial() {
        return ApiService.get('ComposicaoSalarial');
    }

    static async getComposicaoSalarialById(id) {
        return ApiService.get(`ComposicaoSalarial/${id}`);
    }

    static async GetComposicaoSalarialAtual() {
        return ApiService.get('ComposicaoSalarial/ComposicaoAtual');
    }

    static async createComposicaoSalarial(data) {
        return ApiService.post('ComposicaoSalarial', data);
    }

    static async updateComposicaoSalarial(id, data) {
        return ApiService.put(`ComposicaoSalarial/${id}`, data);
    }

    static async deleteComposicaoSalarial(id) {
        return ApiService.delete(`ComposicaoSalarial/${id}`);
    }
}