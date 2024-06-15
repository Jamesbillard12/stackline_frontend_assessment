import { createSlice } from '@reduxjs/toolkit'

function dateFormatter(date) {
    date.split('-');
    const [year, month, day] = date.split('-');
    const shortYear = year.slice(2);
    return `${month}-${day}-${shortYear}`;
}


function formatMoney(amount) {
    if (isNaN(amount)) {
        throw new Error('Invalid number');
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getTotalSalesByMonth(sales, monthShortName) {
    const monthIndex = monthNames.indexOf(monthShortName); // Get the month index (0-based)

    if (monthIndex === -1) {
        throw new Error(`Invalid month short name: ${monthShortName}`);
    }

    let totalRetailSales = 0;
    let totalWholesaleSales = 0;
    let totalUnitsSold = 0;
    let totalRetailerMargin = 0;

    sales.forEach(sale => {
        const saleDate = new Date(sale.weekEnding);
        if (saleDate.getMonth() === monthIndex) {
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
}

function getGraphData(sales) {
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
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: {},
        graphData: [],
        loading: true,
        error: null,
    },
    reducers: {
        fetchDataRequest: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.load = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            action.payload.sales.forEach(sale => {
                sale.formattedDate = dateFormatter(sale.weekEnding);
                sale.retailSalesStr = formatMoney(sale.retailSales);
                sale.wholesaleSalesStr = formatMoney(sale.wholesaleSales);
                sale.retailerMarginStr = formatMoney(sale.retailerMargin);
            })
            state.data = action.payload;
            state.graphData = getGraphData(action.payload.sales);
            state.loading = false;
            state.error = null;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataSlice.actions

export default dataSlice.reducer