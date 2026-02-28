import { CHART_COLORS } from '@/constants/constants';
import React, { useState } from 'react'
import { BarChart,LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Orders, DateRange } from '@/types';

type OrderDetails = {
    name: string;
    count: number;
};

type Order = {
    createdAt: string;
    price: string;
    orderDetails: OrderDetails[];
};

type LineChartData = {
    date: string;
    totalSales: number;
};

type BarChartData = {
    date: string;
    [item: string]: number | string; // Allows dynamic keys for item names
};

const processData = (data: Order[]): any => {
    // For Line Chart - Daily Total Sales
    const currentMonth = new Date().getMonth(); // Current month (0-based index)
    const currentYear = new Date().getFullYear(); // Current year

    // For Line Chart - Daily Total Sales
    const dailySales: Record<string, number> = {};
    data.forEach(order => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
            const formattedDate = `${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`; // MM/DD
            dailySales[formattedDate] = (dailySales[formattedDate] || 0) + parseFloat(order.price);
        }
    });

    const lineChartData: LineChartData[] = Object.entries(dailySales).map(([date, totalSales]) => ({
        date,
        totalSales,
    }));

    // console.log('lineChartData', lineChartData)
    return { lineChartData };
};


const filterOrdersByDateRange = (orders: Order[], range: DateRange) => {
    const now = new Date();
    const today = new Date(now.toISOString().split('T')[0]); // Today's date without time

    switch (range) {
        case 'daily':
            return orders.filter(order => {
                const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
                return orderDate === today.toISOString().split('T')[0];
            });

        case 'weekly':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            return orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startOfWeek && orderDate <= today;
            });

        case 'monthly':
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
            return orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startOfMonth && orderDate <= today;
            });

        default:
            return orders;
    }
};

const aggregateItemCounts = (filteredOrders: Order[]) => {
    const itemCounts: Record<string, number> = {};

    filteredOrders.forEach(order => {
        order.orderDetails.forEach(item => {
            if (itemCounts[item.name]) {
                itemCounts[item.name] += item.count;
            } else {
                itemCounts[item.name] = item.count;
            }
        });
    });

    return Object.keys(itemCounts).map(name => ({
        name,
        value: itemCounts[name]
    }));
};

function BarChartComponent({value}:any) {
    const [selectedRange, setSelectedRange] = useState<DateRange>('daily');
    const { lineChartData, barChartData } = processData(value);
    // const { pieChartData } = dailyCount(value);

    const filteredOrders = filterOrdersByDateRange(value, selectedRange);

    // Aggregate counts for the filtered orders
    const pieChartData = aggregateItemCounts(filteredOrders);

  return ( 
    <div className='overflow-y-auto pl-2 pr-4'>
    <h1 className="text-gray-500 text-center text-md mb-2">This Month Sales(₹)</h1>
        
    <ResponsiveContainer width="100%" className="!h-[300px] pb-4">
            <BarChart width={600} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="totalSales"/>
                <Tooltip />
                {/* <Legend /> */}
                <Bar type="monotone" dataKey="totalSales" fill="#8884d8" />
            </BarChart>
    </ResponsiveContainer>


    {/* <h1 className="text-gray-500 text-xl">Daily Count</h1> */}
    <div className="flex justify-center space-x-4 my-6">
                <button
                    className={`px-4 py-2 rounded ${selectedRange === 'daily' ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedRange('daily')}
                >
                    Today Count
                </button>
                {/* <button
                    className={`px-4 py-2 rounded ${selectedRange === 'weekly' ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedRange('weekly')}
                >
                    This Week
                </button> */}
                {/* <button
                    className={`px-4 py-2 rounded ${selectedRange === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedRange('monthly')}
                >
                    Monthly
                </button> */}
            </div>
    <ResponsiveContainer width="100%" className="!h-[400px] pb-4">
            
    <PieChart>
            <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${selectedRange === 'daily' ? name : value}`}
            >
                {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend /> 
        </PieChart>
    </ResponsiveContainer>

        </div>
  )
}

export default BarChartComponent