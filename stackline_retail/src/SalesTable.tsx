import React from 'react';
// @ts-ignore
import { useTable, useSortBy, Column, TableInstance, HeaderGroup, Row, Cell } from 'react-table';
import 'tailwindcss/tailwind.css';

interface Data {
    weekEnding: string;
    retailSales: string;
    wholesaleSales: string;
    unitsSold: number;
    retailerMargin: string;
}

const data: Data[] = [
    { weekEnding: '01-02-16', retailSales: '$348,123', wholesaleSales: '$255,721', unitsSold: 887, retailerMargin: '$123,294' },
    { weekEnding: '01-09-16', retailSales: '$348,123', wholesaleSales: '$255,721', unitsSold: 887, retailerMargin: '$123,294' },
    // Add more data as needed
];

const columns: Column<Data>[] = [
    { Header: 'Week Ending', accessor: 'weekEnding' },
    { Header: 'Retail Sales', accessor: 'retailSales' },
    { Header: 'Wholesale Sales', accessor: 'wholesaleSales' },
    { Header: 'Units Sold', accessor: 'unitsSold' },
    { Header: 'Retailer Margin', accessor: 'retailerMargin' },
];

const SalesTable: React.FC = () => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }: TableInstance<Data> = useTable(
        { columns, data },
        useSortBy // Enable sorting
    );

    return (
        <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
            {headerGroups.map((headerGroup: HeaderGroup<Data>) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200" key={headerGroup.id}>
                    {headerGroup.headers.map((column: Column<Data>) => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="text-sm px-4 py-2 text-left cursor-pointer text-grey-text"
                            key={column.id}
                        >
                            {column.render('Header')}
                            {/* Add sort direction indicator */}
                            <span className={!column.isSorted ? 'text-grey-arrow': ''}>
                  {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ' ▼'}
                </span>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<Data>) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell: Cell<Data>) => (
                            <td {...cell.getCellProps()} className="border-t-2 border-grey-background px-4 py-2 text-sm text-grey-text" key={cell.column.id}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default SalesTable;
