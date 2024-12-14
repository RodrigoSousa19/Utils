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

    static async sendBankStatement(uri, name) {
        const formData = new FormData();
        formData.append('file', {
          uri,
          type: 'application/octet-stream',
          name,
        });
      
        console.log("FormData montado:", formData);
      
        const endpoint = 'ExtratoBancario/processarextratobancario';
      
        try {
          const response = await ApiService.fileRequest('POST', endpoint, formData);
      
          console.log("Resposta da API:", response);
          return response;
        } catch (error) {
          console.error("Erro ao enviar arquivo:", error);
          throw error;
        }
      }
      
}