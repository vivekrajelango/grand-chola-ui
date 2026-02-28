import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DateFormats } from '@/constants/constants';

function MenuStatus({status, statusValue}:any) {
    // const [currentTime, setCurrentTime] = useState(dayjs().format(DateFormats.DATE_WITH_TIME));
    const currentTimeRef = useRef(dayjs().format(DateFormats.DATE_WITH_TIME));
    const [isCustom, setCustom] = useState<Boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<any>(status?.customNextVisibleTime?.timeDisplayVal);
    const [isHours, setHours] = useState<any>(0);
    const [isMinutes, setMinutes] = useState<any>(0);

    // const selectItems=(status:any)=>{
    //     if(status==='active'){
    //         setSelectedStatus('active');
    //     } else if(status==='twoHour'){
    //         setSelectedStatus('twoHour');
    //     } else if(status==='fourHour'){
    //         setSelectedStatus('fourHour');
    //     }
    // }
    // const [resStatus, setResStatus] = useState<any>(selectItems(status?.      customNextVisibleTime.timeDisplayVal));

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const now = dayjs();
        const nameVal = e.target.name;
        setSelectedStatus(nameVal);
        nameVal==='custom' ? setCustom(true) : setCustom(false);
        if(nameVal==='active'){
            statusValue(nameVal, null)
        }else if(nameVal==='twoHour'){
            statusValue(nameVal, now.add(2, 'hour'))
        } else if(nameVal==='fourHour'){
            statusValue(nameVal, now.add(4, 'hour'))
        } else {
            statusValue(nameVal, now.add(0, 'hour'))
        }
    };

    const hoursHandler=(e: any)=>{
        const now = dayjs();
        const val = e.target.value;
        const newHours = now.add(val, 'hour')
        statusValue('custom', newHours)
    }

    const minsHandler=(e: any)=>{
        const now = dayjs();
        const val = e.target.value;
        const newMinutes = now.add(val, 'minute');
        statusValue('custom', newMinutes)
    }

    useEffect(()=>{
        if(status) setSelectedStatus(status?.customNextVisibleTime?.timeDisplayVal);
    },[status])


    return (
        <section className='flex flex-col mt-3 text-gray-700'>
            <div>
                <label className="block mb-1 text-sm font-medium">Edit Status</label>
            </div>
            <div className='flex flex-row gap-3'>
            <label className="flex items-center space-x-1">
                <input
                    type="radio"
                    name="active"
                    checked={status?.customNextVisibleTime?.timeDisplayVal === "active"}
                    onChange={changeHandler}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Active</span>
            </label>
            <label className="flex items-center space-x-1">
                <input
                    type="radio"
                    name="twoHour"
                    checked={status?.customNextVisibleTime?.timeDisplayVal === "twoHour"}
                    onChange={changeHandler}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">2hrs</span>
            </label>
            <label className="flex items-center space-x-1">
                <input
                    type="radio"
                    name="fourHour"
                    checked={status?.customNextVisibleTime?.timeDisplayVal === "fourHour"}
                    onChange={changeHandler}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">4hrs</span>
            </label>
            <label className="flex items-center space-x-1">
                <input
                    type="radio"
                    name="tomo"
                    checked={selectedStatus === 'tomo'}
                    onChange={changeHandler}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Next Day</span>
            </label>
            </div>
            <div>
                <label className="flex items-center space-x-1">
                    <input
                        type="radio"
                        name="custom"
                        checked={selectedStatus === 'custom'}
                        onChange={changeHandler}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Custom Time</span>
                </label>
            </div>
            {isCustom && 
                <div className='flex flex-row gap-2 justify-center mt-2'>
                    <input type="text" name="onlinePrice" id="onlinePrice" placeholder='hrs'
                    onChange={hoursHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-8 p-1.5 " />
                    <input type="text" name="onlinePrice" id="onlinePrice" placeholder='mins' 
                    onChange={minsHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-8 p-1.5 " />
                </div>
            }
            {selectedStatus !== 'tomo' && 
                <div className='mt-2 text-red-400'>
                    Next available - {status?.customNextVisibleTime?.timeStamp ? dayjs(status?.customNextVisibleTime?.timeStamp).format(DateFormats.HH) : 'now'
                    }
                </div>
            }
        </section>
    )
}

export default MenuStatus