import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Clock, Drumstick, Heart, LeafyGreen, ListPlus, MapPinCheck, Star, TicketPlus } from 'lucide-react'
import { itemsData } from '../../utils/content';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import MenuBar from '../Navigation';
import { saveCart, addItemsCount, addFavourites } from '@/store/actions';
import { AppState } from '@/store/reducers';
import Drawer from './Drawer';
import Card from './Card';
import AddOns from './AddOns';
// import DetailsPage from '@/app/details/page';



const getImageUrl = (imgSrc: string) => {
  if (!imgSrc) return '';
  if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
  return `https://vivek-295524865.imgix.net${imgSrc}`;
};

function MenuList({ menus }: any) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
  const filterDetails = useSelector((state: AppState) => state.user.filtered);
  const persistItemsDetails = useSelector((state: AppState) => state.user.addItemsCount);

  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(persistItemsDetails || {});
  const [selectedItems, setSelectedItems] = useState(cartDetails || []);
  const [filteredItems, setFilteredItems] = useState(filterDetails || []);
  const [isShow, setShow] = useState<any>(false);
  const [isAddOn, setAddOn] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const setSectionRef = useCallback((el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  }, []);

  const addItem = (item: any) => {
    setAddOn(item?.addOns);
    setShow(item.addOns.length ? true : false);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.itemID]: (prevCounts[item.itemID] || 0) + 1
    }));

    // Update the selectedItems array
    setSelectedItems((prevItems: any) => {
      const existingItem = prevItems?.find((i: any) => i.itemID === item.itemID);
      if (existingItem) {
        return prevItems.map((i: any) =>
          i.itemID === item.itemID ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...prevItems, { itemID: item.itemID, name: item.name, price: item.onlinePrice, count: 1, offer: item.offer }];
    });
  };

  const createAddOn = (item: any) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.itemID]: (prevCounts[item.itemID] || 0) + 1
    }));

    // Update the selectedItems array
    setSelectedItems((prevItems: any) => {
      const existingItem = prevItems?.find((i: any) => i.itemID === item.itemID);
      if (existingItem) {
        return prevItems.map((i: any) =>
          i.itemID === item.itemID ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...prevItems, { itemID: item.itemID, name: item.name, price: item.onlinePrice, count: 1, offer: item.offer }];
    });
  }

  // Remove item handler
  const removeItem = (item: any) => {
    setShow(false);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.itemID]: prevCounts[item.itemID] > 0 ? prevCounts[item.itemID] - 1 : 0
    }));

    setSelectedItems((prevItems: any) => {
      const existingItem = prevItems.find((i: any) => i.itemID === item.itemID);
      if (existingItem && existingItem.count > 1) {
        return prevItems.map((i: any) =>
          i.itemID === item.itemID ? { ...i, count: i.count - 1 } : i
        );
      }
      return prevItems.filter((i: any) => i.itemID !== item.itemID);
    });
  };

  const deleteAddOn = (item: any) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.itemID]: prevCounts[item.itemID] > 0 ? prevCounts[item.itemID] - 1 : 0
    }));

    setSelectedItems((prevItems: any) => {
      const existingItem = prevItems.find((i: any) => i.itemID === item.itemID);
      if (existingItem && existingItem.count > 1) {
        return prevItems.map((i: any) =>
          i.itemID === item.itemID ? { ...i, count: i.count - 1 } : i
        );
      }
      return prevItems.filter((i: any) => i.itemID !== item.itemID);
    });
  };

  useEffect(() => {
    if (selectedItems) dispatch(saveCart(selectedItems));
    if (filterDetails) setFilteredItems(filterDetails);
    if (itemCounts) dispatch(addItemsCount(itemCounts));
    if (isShow) setShow(isShow);
  }, [selectedItems, filterDetails, itemCounts, isShow]);


  return (
    <>
      <div className="flex flex-col h-screen text-blue">
        <div
          ref={contentRef}
          className="flex-grow overflow-y-auto"
        >
          {(filteredItems.length ? filteredItems : menus).map((menu: any, index: any) => (
            <div
              key={menu.id}
              ref={(el) => setSectionRef(el, index)}
              className="p-2"
            >
              <h2 className="text-2xl text-yellow-700 bg-gray-100 font-semibold px-2">{menu.title} </h2>
              {menu.MenuItems?.sort((a:any,b:any)=>a.itemID-b.itemID).map((item: any) => (
                <>
                <div key={item.id} className="bg-white rounded-lg py-4 px-2 flex justify-between items-center">
                  <div className="flex-1">

                    <h3 className={`text-2xl font-semibold ${item.visible ? 'text-gray-800' : 'text-gray-300'} mb-1`}>
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500">{item.shortDescription || <span className='text-white'>.</span>}</span>
                  </div>

                    <div className="text-xl font-bold mb-1">
                      {item.offer !== '0' && <span className="text-sm font-semibold text-red-600  line-through">&#8377;{item.onlinePrice}</span>}
                      <span className={`text-xl font-bold ${item.visible ? 'text-green-600' : 'text-gray-300'}`}>&#8377;{item.offer !== '0' ? (item.onlinePrice - (item.onlinePrice * item.offer) / 100) : item.onlinePrice}</span>
                    </div>

                    <p className="text-gray-600 text-md">
                      {item.visible ?
                        <small className='flex flex-row items-center text-green-900 gap-1 font-xs'>
                          <Clock size={15} />
                          <span>{item.timeSlots[0]?.low.hr}:00 -&nbsp;
                            {item.timeSlots[item.timeSlots.length - 1]?.up?.hr}:00</span>
                        </small> :
                        <small className='flex flex-row items-center text-pink-500 gap-1 font-xs'>
                          <span>Next available:
                            {item.timeSlots[item.timeSlots.length - 1]?.low?.hr}:00 
                            {item.timeSlots.length===1 ? ' A.M' : ' P.M'}
                          </span>
                        </small>
                      }
                    </p>

                    {/* <div className="flex gap-4">
                      <button className="p-2 rounded-full border border-gray-200">
                        <Bookmark className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-full border border-gray-200">
                        <Share2 className="w-5 h-5 text-gray-500" />
                      </button>
                    </div> */}
                  </div>

                  <div
                    className={`relative ml-4 w-32 h-32 rounded-lg bg-no-repeat ${item.visible ? 'grayscale-0' : 'grayscale'} bg-cover bg-center`}
                    style={{
                      backgroundImage: `url(${getImageUrl(item.imgSrc)})`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/5" />
                    {item.visible && 
                    <button className={`absolute -bottom-3 ${itemCounts[item.itemID] ? 'px-2 bg-emerald-200': 'px-6 bg-white'} right-4 text-pink-500 py-2 rounded-full shadow-lg font-semibold`}>
                      <span className="text-xl font-semibold text-green-600 -mt-2">
                        {itemCounts[item.itemID] ? (
                          <div className='flex items-center w-[78px] justify-between text-white'>
                            <IconMinus
                              stroke={2}
                              width={20}
                              className='rounded-full bg-red-500 h-[27px] w-[27px]'
                              onClick={() => removeItem(item)}
                            />
                            <p className='text-black text-1xl'>{itemCounts[item.itemID]}</p>
                            <IconPlus
                              stroke={2}
                              width={20}
                              className='rounded-full bg-sky-600 h-[27px] w-[27px]'
                              onClick={() => {
                                const finalPrice = item.offer !== '0'
                                  ? item.onlinePrice - (item.onlinePrice * item.offer) / 100
                                  : item.onlinePrice;

                                addItem({
                                  ...item,
                                  onlinePrice: finalPrice
                                });
                              }}
                            />
                          </div>
                        ) : (
                          item.visible && <div
                            onClick={() => {
                              const finalPrice = item.offer !== '0'
                                ? item.onlinePrice - (item.onlinePrice * item.offer) / 100
                                : item.onlinePrice;

                              addItem({
                                ...item,
                                onlinePrice: finalPrice
                              });
                            }}
                          >
                            ADD
                          </div>
                        )}
                      </span>
                    </button>
                    }
                  </div>
                </div>
                <hr className='h-1 bg-gray-100' />
                </>
              ))}
            </div>
          ))}
        </div>
        {/* Display the selected items */}
      </div>
      {/* <div className="flex flex-col m-auto p-auto pt-4">
        {(filteredItems.length ? filteredItems : menus).map((mainItem: any, mainIndex: number) => (
          <>
            <h2 className="text-xl font-semibold tracking-tight text-gray-600 pl-5 pb-1">{mainItem.title}</h2>
            <div className="flex overflow-x-scroll pb-8 hide-scroll-bar">
              <div className="flex flex-nowrap ml-2">
                {mainItem.MenuItems.map((item: any, index: number) =>
                  <div className="inline-block px-2.5" key={index}>
                    <div className="w-64 h-52 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                      <section ref={sectionRef} className="relative w-full h-32 bg-cover bg-center" style={{ backgroundImage: `url(${getImageUrl(item.imgSrc)})` }}>
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div> 
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                          {item.offer !== "0" && <div className="flex items-center justify-between">
                            {item.offer && item.offer === '50'
                              ? <small className='bg-yellow-200 rounded-lg px-1'>Buy 1 Get 1</small>
                              : <small className='bg-yellow-200 rounded-lg px-1'>{item.offer + '% off'}</small>
                            }
                          </div>}
                          {
                            item?.addOns?.length > 0 && isAddOn.length > 0 &&  
                            <div 
                              className='absolute inset-0 flex flex-row justify-end p-4 cursor-pointer'
                              onClick={() => setShow(!isShow)}
                            >
                              <TicketPlus className='text-yellow-400'/>
                            </div>
                          }
                        </div>
                      </section>
                      <div className="px-2 py-1 bg-white">
                        <div className='flex flex-row items-center justify-between'>
                          <h5 className="text-lg font-semibold tracking-tight text-gray-600 truncate">{item.name}</h5>
                          <div className='flex flex-row items-center justify-center gap-1'>
                            {item.offer !== '0' && <span className="text-sm font-semibold text-red-600  line-through">&#8377;{item.onlinePrice}</span>}
                            <span className="text-xl font-bold text-green-600">&#8377;{item.offer !== '0' ? (item.onlinePrice - (item.onlinePrice * item.offer) / 100) : item.onlinePrice}</span>
                          </div>

                        </div>
                        <div className='flex flex-row items-center justify-between'>
                          <h5 className="text-xs font-normal tracking-tight text-gray-500 -mt-1 w-[85%] truncate">{item.shortDescription || <span className='text-white'>.</span>}</h5>
                        </div>
                        <div className="flex items-center justify-between my-0">
                          <div className='flex flex-row items-center justify-center gap-3'>
                            {item.visible ? 
                              <small className='flex flex-row items-center justify-center text-green-900 gap-1 font-xs'>
                                <Clock size={15}/>
                                <span>{item.timeSlots[0]?.low.hr}:00 -&nbsp;
                                {item.timeSlots[item.timeSlots.length-1]?.up?.hr}:00</span>
                              </small> :
                              <small className='flex flex-row items-center justify-center text-pink-500 gap-1 font-xs'>
                                <span>Next available: 
                                {item.timeSlots[item.timeSlots.length-1]?.low?.hr}:00</span>
                              </small>
                            }
                          </div>
                          <span className="text-xl font-bold text-green-600 -mt-2">
                            {itemCounts[item.itemID] ? (
                              <div className='flex items-center ml-2 w-[78px] justify-between text-white'>
                                <IconMinus
                                  stroke={2}
                                  width={20}
                                  className='rounded-full bg-red-500 h-[25px] w-[25px]'
                                  onClick={() => removeItem(item)}
                                />
                                <p className='text-black text-1xl'>{itemCounts[item.itemID]}</p>
                                <IconPlus
                                  stroke={2}
                                  width={20}
                                  className='rounded-full bg-sky-600 h-[25px] w-[25px]'
                                  onClick={() => {
                                    const finalPrice = item.offer !== '0'
                                      ? item.onlinePrice - (item.onlinePrice * item.offer) / 100
                                      : item.onlinePrice;

                                    addItem({
                                      ...item,
                                      onlinePrice: finalPrice
                                    });
                                  }}
                                />
                              </div>
                            ) : (
                              item.visible ? <div
                                className='h-[30px] w-[30px] bg-blue text-white rounded-full flex items-center justify-center'
                                onClick={() => {
                                  const finalPrice = item.offer !== '0'
                                    ? item.onlinePrice - (item.onlinePrice * item.offer) / 100
                                    : item.onlinePrice;

                                  addItem({
                                    ...item,
                                    onlinePrice: finalPrice
                                  });
                                }}
                              >
                                <IconPlus stroke={3} />
                              </div> : <small className='text-gray-400 text-sm'>Unavailable</small>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
        
      </div> */}
      <Drawer isShowStatus={isShow} closeHandler={() => setShow(false)} position="bottom" title="Add-Ons">
        <AddOns
          isAddOn={isAddOn}
          itemCounts={itemCounts}
          createAddOn={createAddOn}
          deleteAddOn={deleteAddOn}
        />
      </Drawer>
    </>
  )
}

export default MenuList