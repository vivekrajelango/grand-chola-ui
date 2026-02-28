'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Bookings = () => {
  const [isData, setData] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const changeHandler = (e: any) => {
    setError(false);
    let { name, value } = e.target;
    setData({ ...isData, [name]: value });
  }

  const confirmBooking = () => {
    if (!isData?.name || !isData?.mobile) {
      setError(true);
      return;
    }
    // console.log("Booking confirmed with data:", generateWhatsAppMessage());
    setTimeout(()=>{
      window.location.href = whatsappLink;
    },500)
    setData(null); 
  };

  const generateWhatsAppMessage = () => {
      let message = "Reserve my Table:";
        message += "\n----------------------\n";
        message += `Name: ${isData?.name} \n`;
        message += `Mobile: ${isData?.mobile} \n`;
        message += `Details: ${isData?.details}`;
        // URL encode the message 
        return encodeURIComponent(message);
  };

  const phoneNumber = "447867248321";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;

  return (
    <section className="py-10 bg-white" id="bookings">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="text-3xl font-bold text-amber-900 sm:text-4xl">
            Bookings
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-4 bg-white rounded-lg sm:p-5">
              <div className="flex flex-col gap-4 p-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 ">Name*</label>
                  <input type="text" name="name" id="name" placeholder="Enter your name" className="bg-gray-50  border border-gray-300 text-gray-600 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={isData?.name || ''} onChange={changeHandler} />
                </div>
                {error && (isData?.name === "" || isData?.name === undefined) && <p style={{ color: 'red' }}>Please enter your name</p>}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 ">Mobile Number*</label>
                  <input type="number" name="mobile" id="mobile" placeholder="Enter mobile number" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.mobile || ''} onChange={changeHandler} />
                </div>
                {error && (isData?.mobile === "" || isData?.mobile === undefined) && <p style={{ color: 'red' }}>Please enter your Mobile number</p>}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 ">Details</label>
                  <textarea
                    rows={4}
                    name="details"
                    value={isData?.details || ''}
                    onChange={changeHandler}
                    placeholder="Please provide any additional details or requests(Date, Time, Number of People, etc.)"
                    required
                    className="w-full text-base p-2.5 border bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4 mt-4">
                <a
                  className="inline-flex h-12 w-32 text-1xl animate-shimmer items-center justify-center rounded-md border border-pink-500 bg-[linear-gradient(110deg,#fd1d1d,30%,#f56040,50%,#fcaf45,70%,#bc2a8d)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white"
                  onClick={confirmBooking}
                >
                  Reserve now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;