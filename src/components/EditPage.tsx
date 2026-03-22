import React, { useEffect, useState, useRef } from 'react';
import ToggleSwitch from './common/ToggleSwitch';
import { ModalPopUp } from './common/Modal';
import MenuStatus from './MenuStatus';
import { ImagePlus, X } from 'lucide-react';
import { compressImage } from '@/utils/imageUtils';

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function EditPage({data, saveHandler}:any) {
    const [isData, setData] = useState(data);
    const [isShow, setShow] = useState(false);
    const [newImage, setNewImage] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const formSubmit=(e:any)=>{
        e.preventDefault();
        saveHandler(isData);
    };
    const changeHandler=(e:any)=>{
        let {name,value} = e.target;
        setData({...isData, [name]:value});
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await compressImage(file);
            setNewImage(base64);
            setData({...isData, imgSrc: base64});
        } catch (err) {
            console.error('Image compression failed:', err);
        }
    };

    const removeNewImage = () => {
        setNewImage(null);
        setData({...isData, imgSrc: data?.imgSrc || ''});
        if (fileRef.current) fileRef.current.value = '';
    };

    const statusValueHandler=(status:string, val:any)=>{
        setShow(!isShow);
        setData({
            ...isData,
            visible: status==='active' ? true : false,
            customNextVisibleTime: {
                timeStamp:val !==null ? dayjs.utc(val).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss.SSSZ") : null,
                timeDisplayVal: status
            }
        })
    }


    useEffect(()=>{
        if(data) {
            setData(data);
            setNewImage(null);
            if (fileRef.current) fileRef.current.value = '';
        }
    },[data])
    return (
        <div className='min-h-[350px]'>
            <div className="flex flex-col gap-2 p-4 mt-8">
                <section className='flex flex-row gap-3'>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Price</label>
                        <input type="text" name="onlinePrice" id="onlinePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.onlinePrice} onChange={changeHandler} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-900 ">Offer</label>
                        <input type="text" name="offer" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.offer} onChange={changeHandler} />
                    </div>
                </section>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Image</label>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <div className="flex items-center gap-3">
                        {(newImage || isData?.imgSrc) ? (
                            <div className="relative w-16 h-16">
                                <img
                                    src={newImage || isData?.imgSrc}
                                    alt="menu"
                                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                />
                                {newImage && (
                                    <button type="button" onClick={removeNewImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5">
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        ) : null}
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <ImagePlus size={16} />
                            {(newImage || isData?.imgSrc) ? 'Change' : 'Upload'}
                        </button>
                    </div>
                </div>

                <MenuStatus status={isData} statusValue={statusValueHandler}/>
            </div>
            <div className="flex flex-row items-center justify-center w-full pb-4 mt-4">
                <button onClick={formSubmit} className="w-[40%] justify-center text-white bg-emerald-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditPage
