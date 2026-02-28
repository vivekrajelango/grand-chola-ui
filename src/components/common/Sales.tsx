import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, ShoppingCart } from 'lucide-react';

// Types (keep the previous types)
interface OrderDetail {
  itemID: string;
  name: string;
  price: string;
  count: number;
  offer: string;
}

interface Order {
  _id: string;
  restaurantID: string;
  name: string;
  mobile: string;
  options: string;
  price: string;
  createdAt: string;
  orderDetails: OrderDetail[];
  status: string;
  orderID: number;
  updatedAt:any;
}

// Sample data (replace with actual API data)
const sampleOrders: Order[] = [
  {
    "_id": "677542afdffc107b8368a9c1",
    "restaurantID": "test",
    "name": "Praveen kumar",
    "mobile": "121212",
    "options": "Delivery",
    "price": "200",
    "createdAt": "2025-01-01T13:27:11.586Z",
    "orderDetails": [
      {
        "itemID": "192",
        "name": "Chicken Kothu Parotta",
        "price": "200",
        "count": 1,
        "offer": "0"
      }
    ],
    "status": "delivered",
    "orderID": 49,
    "updatedAt": "2025-01-01T19:31:34.183Z"
  },
  // ... other sample orders from your original JSON
];

const SalesDashboard = ({sampleOrders}:any) => {
  const [currentView, setCurrentView] = useState<'today' | 'weekly' | 'monthly'>('today');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Process orders
  const processedOrders = useMemo(() => {
    return sampleOrders.map((order:any) => ({
      ...order,
      // Use updatedAt for date-based calculations
      date: new Date(order.updatedAt || order.createdAt)
    }));
  }, []);

  // Today's sales calculation
  const todaySales = useMemo(() => {
    const today = new Date();
    return processedOrders.filter((order:any) => {
      const orderDate = order.date;
      return (
        orderDate.getFullYear() === today.getFullYear() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getDate() === today.getDate()
      );
    });
  }, [processedOrders]);

  // Weekly sales calculation
  const weeklySales = useMemo(() => {
    const startOfWeek = new Date();
    // Adjust to make Monday the start of the week
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1) + (weekOffset * 7));
    startOfWeek.setHours(0, 0, 0, 0); // Set time to the start of the day
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week is 6 days after the start
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day
  
    return processedOrders.filter((order: any) => {
      const orderDate = new Date(order.date); // Convert order.date to a Date object
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    });
  }, [processedOrders, weekOffset]);

  // Monthly sales calculation
  const monthlySales = useMemo(() => {
    const startOfMonth = new Date();
    startOfMonth.setMonth(startOfMonth.getMonth() + monthOffset);
    startOfMonth.setDate(1); // Explicitly set the date to the first day of the month
    startOfMonth.setHours(0, 0, 0, 0); // Optional: Set time to midnight for accurate comparison
  
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999); // Optional: Set time to end of the day for accurate comparison
  
    return processedOrders.filter((order: any) => 
      order.date >= startOfMonth && 
      order.date <= endOfMonth
    );
  }, [processedOrders, monthOffset]);

  // Prepare data for chart
  const prepareChartData = (sales: Order[]) => {
    const groupedSales = sales.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      const existingEntry = acc.find(item => item.date === date);
      
      if (existingEntry) {
        existingEntry.total += parseFloat(order.price);
      } else {
        acc.push({
          date,
          total: parseFloat(order.price)
        });
      }
      return acc;
    }, [] as { date: string; total: number }[]);

    return groupedSales;
  };
  

  // Mobile-friendly metrics rendering
  const renderSalesMetrics = (sales: Order[]) => {
    const totalRevenue = sales.reduce((sum, order) => sum + parseFloat(order.price), 0);
    const totalOrders = sales.length;
    const avgOrderValue = totalRevenue / (totalOrders || 1);

    return (
      <div className="grid grid-cols-2 gap-4 mb-6 text-white">
        <div className="bg-purple-400 p-4 rounded-lg flex items-center shadow-sm">
          <TrendingUp className="mr-3 w-10 h-10 text-blue-600 hidden1 max-[500px]:block" />
          <div>
            <div className="text-sm">Total Sales</div>
            <div className="font-bold text-lg">£{totalRevenue.toFixed(0)}</div>
          </div>
        </div>
        <div className="bg-green-600 p-4 rounded-lg flex items-center shadow-sm">
          <ShoppingCart className="mr-3 w-10 h-10 text-white-600 hidden1 max-[500px]:block" />
          <div>
            <div className="text-sm">Total Orders</div>
            <div className="font-bold text-lg">{totalOrders}</div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile-friendly navigation
  const renderNavigation = () => {
    return (
      <div className="relative">
        <div className="flex justify-center mb-6 space-x-4">
          {(['today', 'weekly', 'monthly'] as const).map(view => (
            <button 
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === view 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Mobile-friendly chart rendering
  const renderChart = () => {
    const salesData = 
      currentView === 'today' 
        ? todaySales 
        : currentView === 'weekly' 
          ? weeklySales 
          : monthlySales;

    const chartData = prepareChartData(salesData);

    return (
      <div className="w-full px-2">

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}  // Smaller font for mobile
            />
            <YAxis 
              tick={{ fontSize: 10 }}  // Smaller font for mobile
            />
            <Tooltip 
              contentStyle={{ fontSize: '12px' }}  // Smaller tooltip
            />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Navigation for Weekly/Monthly Views */}
        {(currentView === 'weekly' || currentView === 'monthly') && (
          <div className="flex justify-center items-center my-4 text-white">
            <button 
              onClick={() => 
                currentView === 'weekly' 
                  ? setWeekOffset(prev => prev - 1) 
                  : setMonthOffset(prev => prev - 1)
              } 
              className="p-3 bg-pink-400 rounded-l-lg"
            >
                <div className='flex'>
              <ChevronLeft className="w-5 h-5" /><small>Prev</small>
              </div>
            </button>
            {/* <p className='bg-pink-200 w-1 p-1'>&nbsp;</p> */}
            <button 
              onClick={() => 
                currentView === 'weekly' 
                  ? setWeekOffset(prev => prev + 1) 
                  : setMonthOffset(prev => prev + 1)
              } 
              className="p-3 bg-pink-400 rounded-r-lg"
            >
                <div className='flex'>
                <small>Next</small><ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-md sm:max-w-2xl p-4 sm:p-6">
      {renderNavigation()}
      
      {renderSalesMetrics(
        currentView === 'today' 
          ? todaySales 
          : currentView === 'weekly' 
            ? weeklySales 
            : monthlySales
      )}

      {renderChart()}
    </div>
  );
};

export default SalesDashboard;