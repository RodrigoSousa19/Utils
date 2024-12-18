import ApiService from "../../services/ApiService";

export default class ExtratoBancarioApi {
  static async getAllExtratoBancario() {
    return ApiService.get("ExtratoBancario");
  }

  static async getExtratoBancarioById(id) {
    return ApiService.get(`ExtratoBancario/${id}`);
  }

  static async createExtratoBancario(data) {
    return ApiService.post("ExtratoBancario", data);
  }

  static async updateExtratoBancario(id, data) {
    return ApiService.put(`ExtratoBancario/${id}`, data);
  }

  static async deleteExtratoBancario(id) {
    return ApiService.delete(`ExtratoBancario/${id}`);
  }

  static async getExtratosAgrupados() {
    return ApiService.get("ExtratoBancario/agrupados");
  }

  static async sendBankStatement(uri, name) {
    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: name,
      type: "application/x-ofx",
    });

    const endpoint = "ExtratoBancario/processarextratobancario";

    try {
      
      const response = await ApiService.request(
        "POST",
        endpoint,
        formData,
        "file"
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
