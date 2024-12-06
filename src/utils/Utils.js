import moment from 'moment';

class Utils {

  static getDiasUteis(inicio, fim) {
    const startDate = moment(inicio, 'DD/MM/YYYY');
    const endDate = moment(fim, 'DD/MM/YYYY');
    let count = 0;

    while (startDate <= endDate) {
      if (startDate.day() !== 0 && startDate.day() !== 6) {
        count++;
      }
      startDate.add(1, 'days');
    }

    return count;
  }

  static transformarEmMoeda(value) {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  }

  static adicionarMeses(data, meses) {
    return moment(data, 'DD/MM/YYYY').add(meses, 'months').format('DD/MM/YYYY');
  }

  static subtrairMeses(data, meses) {
    return moment(data, 'DD/MM/YYYY').subtract(meses, 'months').format('DD/MM/YYYY');
  }
}

export default Utils;
