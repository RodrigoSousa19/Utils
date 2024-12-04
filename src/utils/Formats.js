
export const parseToNumber = (value) => {
    return parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'));
  };
  
  export const formatToCurrency = (value) => {
    if (isNaN(value)) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };