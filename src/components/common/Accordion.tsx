"use client";
import React, { useState, useRef, useEffect } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { DateFormats } from "@/constants/constants";
import { Bike, Check, CheckCheck, CircleX, Loader, MapPinCheck, Phone, Printer, UserRoundCheck, X } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'few secs', // Seconds
        m: '1 min',    // Singular minute
        mm: '%d mins', // Plural minutes
        h: '1 hr',     // Singular hour
        hh: '%d hrs',  // Plural hours
        d: '1 day',
        dd: '%d days',
        M: '1 month',
        MM: '%d months',
        y: '1 year',
        yy: '%d years',
    },
});
const Accordion = ({ items, updateStatus }: any) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    const handlePrint = (index: number) => {
        const printContent = refs.current[index];
        if (printContent) {
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent.outerHTML;

            window.print();

            document.body.innerHTML = originalContent;

            window.location.reload();
        }
    };

    const toggleAccordion = (index: any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const playAlarm = () => {
        const audio = new Audio('/siren.mp3');
        audio.play().catch((err) => console.error("Error playing audio:", err));
        console.log("Alarm sound played");
    };

    useEffect(() => {
            const hasNewItems = items.some((item: any) => item.status === "new");
    
            // Play alarm only once if there are new items
            if (hasNewItems) {
                playAlarm();
            }
    }, [items])


    return (
        <div className="w-full max-w-md mx-auto overflow-y-scroll">
            {items
                // .filter((item: any) => dayjs(item.createdAt).isSame(dayjs(), 'day'))
                .sort((a: any, b: any) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
                .map((item: any, index: any) => (
                    <div
                        key={index}
                        className="border-gray-300 mb-5 "
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => toggleAccordion(index)}
                            className={`w-full flex justify-between gap-2 items-center ${(item.status === "cancelled" || item.status === "delivered") ? 'bg-yellow-600' : 'bg-green-700'} text-white px-4 py-3 text-left focus:outline-none`}
                        >
                            <section className="flex flex-row gap-2 items-center">
                                {item.status === "new" && <div className='animate-pulse bg-red-500 rounded-full w-5 h-5' />}
                                {item.status === "confirmed" && <Loader className="animate-spin text-gray-200" />}
                                {item.status === "delivered" && <CheckCheck className="text-white" />}
                                {item.status === "cancelled" && <CircleX className="text-gray-200" />}
                                <div>Ord.No:{item.orderID} - </div>
                                <div>{item.options}</div>
                            </section>
                            <section className="flex flex-row gap-2 items-center">
                                <div>{dayjs(item?.createdAt).fromNow()}</div>
                                <div className={`transform transition-transform duration-900 ${index === activeIndex ? "rotate-180" : ""}`}>
                                    ▼
                                </div>
                            </section>
                        </button>

                        {/* Accordion Content */}
                        <div
                            className={`overflow-hidden bg-white transition-all duration-900 ease-in-out ${index === activeIndex ? "max-h-screen" : "max-h-0"
                                }`}
                            style={{
                                height: index === activeIndex ? "auto" : "0", // Fallback for unsupported browsers
                            }}
                        >
                            <div className="flex flex-col items-end px-3 pt-3">
                                <Printer className="cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default button behavior
                                        handlePrint(index);
                                    }}
                                />
                            </div>
                            <section
                                ref={(el: any) => (refs.current[index] = el)}>
                                <div className="px-2 pb-5">
                                    <div className="flex flex-row justify-center gap-3 items-center w-full">
                                        <img className="w-[100px] -ml-5" src={"/logo.jpeg"} />
                                        <p className="font-bold text-xl text-center"> #{item.orderID} <br /> {item.options} </p>
                                    </div>

                                    <section className="text-center font-semibold mt-1 mb-2">
                                        {dayjs(item?.createdAt).format(DateFormats.DATE_WITH_TIME)}
                                    </section>
                                    <div className="flex flex-row gap-2">
                                        <p><UserRoundCheck size={20} /></p>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><Phone size={20} /></p>
                                        <p>{item.mobile}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p><MapPinCheck size={20} /></p>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                                {item.instructions &&
                                    <div className="flex justify-end mb-2 mr-2">
                                        <small>Instruction: {item.instructions}</small>
                                    </div>
                                }
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', padding: '10px' }}>
                                    <thead>
                                        <tr className="font-medium border-t-2 border-gray-300">
                                            <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '5px 0px' }}>Item</th>
                                            <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Qty</th>
                                            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Price</th>
                                            <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.orderDetails.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5', padding: '0px 10px' }}>{item.name}</td>
                                                <td style={{ textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>{item.count}</td>
                                                <td style={{ textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>£{item?.price}</td>
                                                <td className="pr-3" style={{ textAlign: 'right', borderBottom: '1px solid #e5e5e5' }}>£{item.price * item.count}</td>
                                            </tr>
                                        ))}
                                        <tr className="font-medium border-y-2 border-gray-300">
                                            <td className="text-black text-bold pe-4 pb-1" style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5', padding: '0px 10px' }}>Sub Total</td>
                                            <td className="text-black text-xl pe-4 pb-1" colSpan={3} style={{ borderTop: '1px solid rgb(109, 109, 109)', padding: '0px 10px', textAlign: 'right' }}>£{item.price}</td>

                                        </tr>
                                    </tbody>
                                </table>
                                {/* <p className="text-center">www.domain.com</p> */}
                                <p className="text-center">&nbsp;</p>
                            </section>
                            <div className="flex flex-row items-center justify-center gap-4 mb-5">
                                {item.status === "new" &&
                                    <>
                                        <button
                                            className="flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none"
                                            aria-label="Accept"
                                        >
                                            <Check
                                                size={28}
                                                onClick={() => updateStatus(item.orderID, 'confirmed')}
                                            />
                                        </button>

                                        <button
                                            className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 focus:outline-none"
                                            aria-label="Cancel"
                                        >
                                            <X size={28} onClick={() => updateStatus(item.orderID, 'cancelled')} /> {/* Cancel Icon */}
                                        </button>
                                    </>
                                }
                                {item.status === "confirmed" &&
                                    <button
                                        className="flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none"
                                        aria-label="Accept"
                                    >
                                        <Bike size={28} onClick={() => updateStatus(item.orderID, 'delivered')} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Accordion;
