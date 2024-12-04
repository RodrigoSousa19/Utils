import ApiService from '../../services/ApiService';

export default class FeriadosApi {

    static async getAllFeriados() {
        return ApiService.get('Feriados');
    }

    static async getFeriadosByDateRange(dataInicio, dataFim){
        return ApiService.get(`Feriados/${dataInicio}/${dataFim}`)
    }

}
