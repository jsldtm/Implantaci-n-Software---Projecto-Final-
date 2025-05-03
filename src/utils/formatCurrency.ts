const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };
  
  export default formatCurrency;