export const dateFormatter = (date) => {
    const [year, month, day] = date.split('-');
    const shortYear = year.slice(2);
    return `${month}-${day}-${shortYear}`;
};

export const formatMoney = (amount) => {
    if (isNaN(amount)) {
        throw new Error('Invalid number');
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getTotalSalesByMonth = (sales, monthShortName) => {
    const monthIndex = monthNames.indexOf(monthShortName); // Get the month index (0-based)

    if (monthIndex === -1) {
        throw new Error(`Invalid month short name: ${monthShortName}`);
    }

    let totalRetailSales = 0;
    let totalWholesaleSales = 0;
    let totalUnitsSold = 0;
    let totalRetailerMargin = 0;

    sales.forEach(sale => {
        const saleDate = new Date(sale.weekEnding + 'T00:00:00Z'); // Ensures date is parsed as UTC
        if (saleDate.getUTCMonth() === monthIndex) {
            totalRetailSales += sale.retailSales;
            totalWholesaleSales += sale.wholesaleSales;
            totalUnitsSold += sale.unitsSold;
            totalRetailerMargin += sale.retailerMargin;
        }
    });

    return {
        totalRetailSales,
        totalWholesaleSales,
        totalUnitsSold,
        totalRetailerMargin
    };
};

export const getGraphData = (sales) => {
    const graphData = monthNames.map(monthShortName => {
        const totals = getTotalSalesByMonth(sales, monthShortName);
        return {
            month: monthShortName.toUpperCase(),
            totalRetailSales: totals.totalRetailSales,
            totalRetailSalesStr: formatMoney(totals.totalRetailSales),
            totalWholesaleSales: totals.totalWholesaleSales,
            totalWholesaleSalesStr: formatMoney(totals.totalWholesaleSales),
            totalUnitsSold: totals.totalUnitsSold,
            totalRetailerMargin: totals.totalRetailerMargin,
            totalRetailerMarginStr: formatMoney(totals.totalRetailerMargin)
        };
    });
    return graphData;
};
