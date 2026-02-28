import React from 'react';
import ToggleSwitch from './ToggleSwitch';

interface TableColumn {
    label: string;
    dataKey: string;
    sortFunction?: (a: any, b: any) => number; // Optional sorting function
}

interface TableProps {
    data: any[];
    fullData?: any[];
    columns: TableColumn[];
    sortConfig?: any;
    handleSort?: any;
    onRowClick?: (item: any) => void;
    handlePageChange?: any;
    currentPage?:any;
    totalPages?:any;
    footer?:boolean;
}

const Table = ({ data,fullData, columns, sortConfig, handleSort, onRowClick, handlePageChange, currentPage, totalPages,footer=true }:TableProps) => {

    return (
        <>
            <table className="min-w-full bg-white text-gray-500 border border-gray-200">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-4 py-1 text-left text-md bg-gray-600 font-medium text-white cursor-pointer"
                                onClick={() => handleSort?.(column.dataKey)}
                            >
                                {column.label}
                                {sortConfig?.key === column.dataKey && (
                                    <span className="ml-1">
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data?.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((column) => (
                                <td key={column.dataKey} className="px-4 py-2 text-sm text-gray-600">
                                    {/* {item[column.dataKey]} */}
                                    {column.dataKey==='visible' ? 
                                        (item[column.dataKey]===true ? 
                                            <div className='bg-green-300 rounded-full w-5 h-5' />
                                            : <div className='bg-red-300 rounded-full w-5 h-5' />) 
                                        : item[column.dataKey] }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;