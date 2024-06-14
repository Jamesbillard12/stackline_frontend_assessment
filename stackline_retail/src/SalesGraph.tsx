import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
    name: string;
    retailSales: number;
    wholesaleSales: number;
}

const data: DataPoint[] = [
    { name: 'Jan', retailSales: 4000, wholesaleSales: 2400 },
    { name: 'Feb', retailSales: 3000, wholesaleSales: 1398 },
    { name: 'Mar', retailSales: 2000, wholesaleSales: 9800 },
    { name: 'Apr', retailSales: 2780, wholesaleSales: 3908 },
    { name: 'May', retailSales: 1890, wholesaleSales: 4800 },
    { name: 'Jun', retailSales: 2390, wholesaleSales: 3800 },
    { name: 'Jul', retailSales: 3490, wholesaleSales: 4300 },
    { name: 'Aug', retailSales: 4000, wholesaleSales: 2400 },
    { name: 'Sep', retailSales: 3000, wholesaleSales: 1398 },
    { name: 'Oct', retailSales: 2000, wholesaleSales: 9800 },
    { name: 'Nov', retailSales: 2780, wholesaleSales: 3908 },
    { name: 'Dec', retailSales: 1890, wholesaleSales: 4800 },
];

const SalesGraph: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="retailSales" stroke="#8884d8" />
                <Line type="monotone" dataKey="wholesaleSales" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesGraph;
