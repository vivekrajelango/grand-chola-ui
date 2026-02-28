"use client"
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { CircleCheckBig } from 'lucide-react';

const OrderSuccess = ({isOrderId, closeHandler}:any) => {
  const [showFireworks, setShowFireworks] = useState(true);

  // Stop fireworks after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      {showFireworks && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <CircleCheckBig
              className="w-16 h-16 text-green-500 animate-scale-bounce"
            />
            <div
              className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping"
            ></div>
          </div>
        </div>
        <h2 className="text-1xl font-semibold text-gray-800">
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-gray-600">
          Your order has been confirmed and your Order Number is <span className='text-sky-500 text-lg font-semibold'>#{isOrderId}</span> 
          {/* Your order has been confirmed and will be processed shortly. */}
        </p>
        <a
            className="inline-flex items-center justify-center w-1/2 mt-3 px-2 py-2 mb-2 text-lg text-white bg-red-500 rounded-md hover:bg-red-700 sm:w-auto sm:mb-0"
             onClick={closeHandler}
          >
              Close </a>
      </div>
    </div>
  );
};

export default OrderSuccess;
