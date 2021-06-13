module.exports = {

    format_price: (price) => {

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            
            // These options are needed to round to whole numbers if that's what you want.
            // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
          });
        return formatter.format(price);

    },    
    format_date: (date) => {
        
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    }
};