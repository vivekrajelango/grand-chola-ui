import React, { useState } from 'react'

function TabComponent({ activeTab, setActiveTab }: any) {
    // const [activeTab, setActiveTab] = useState(activeTab);

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="flex justify-center space-x-4 p-4">
                
                <button
                    className={`px-6 py-3 text-sm font-medium ${activeTab === 'orders' ? 'text-red-500 bg-gray-100 border-b-4 rounded-lg border-red-500' : 'text-gray-500'
                        }`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={`px-6 py-3 text-sm font-medium ${activeTab === 'menus' ? 'text-red-500 bg-gray-100 border-b-4 rounded-lg border-red-500' : 'text-gray-500'
                        }`}
                    onClick={() => setActiveTab('menus')}
                >
                    Menus
                </button>
                <button
                    className={`px-6 py-3 text-sm font-medium ${activeTab === 'status' ? 'text-red-500 bg-gray-100 border-b-4 rounded-lg border-red-500' : 'text-gray-500'
                        }`}
                    onClick={() => setActiveTab('status')}
                >
                    Status
                </button>
             

            </div>
        </div>
    )
}

export default TabComponent