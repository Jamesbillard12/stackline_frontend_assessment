import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";

const SalesGraph: React.FC = () => {
    // @ts-ignore
    const { graphData } = useSelector((state) => state.data);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <Tooltip />
                <Line type="monotone" dataKey="totalRetailSales" stroke="#8884d8" />
                <Line type="monotone" dataKey="totalWholesaleSales" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesGraph;
