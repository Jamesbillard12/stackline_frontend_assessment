import { createSlice } from '@reduxjs/toolkit'
import { dateFormatter, formatMoney, getGraphData } from './utils';
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
export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataSlice.actions

export default dataSlice.reducer