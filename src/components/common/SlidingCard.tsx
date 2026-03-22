import React, { useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function SlidingCard({ menus }: any) {
  const dispatch = useDispatch();
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

  const createAddOn=(item:any)=>{
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col m-auto p-auto pt-4">
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
                            {item.offer !== '0' && <span className="text-sm font-semibold text-red-600  line-through">£{item.onlinePrice}</span>}
                            <span className="text-xl font-bold text-green-600">£{item.offer !== '0' ? (item.onlinePrice - (item.onlinePrice * item.offer) / 100).toFixed(2) : item.onlinePrice}</span>
                          </div>

                        </div>
                        <div className='flex flex-row items-center justify-between'>
                          <h5 className="text-xs font-normal tracking-tight text-gray-500 -mt-1 w-[85%] truncate">{item.shortDescription || <span className='text-white'>.</span>}</h5>
                          {/* <span className="text-xl font-bold text-green-600 -mt-2">£{item.onlinePrice}</span> */}
                        </div>
                        <div className="flex items-center justify-between my-0">
                          <div className='flex flex-row items-center justify-center gap-3'>
                            {/* {item.visible ? 
                              <small className='flex flex-row items-center justify-center text-green-900 gap-1 font-xs'>
                                <Clock size={15}/>
                                <span>{item.timeSlots[0]?.low.hr}:00 -&nbsp;
                                {item.timeSlots[item.timeSlots.length-1]?.up?.hr}:00</span>
                              </small> :
                              <small className='flex flex-row items-center justify-center text-pink-500 gap-1 font-xs'>
                                <span>Next available: 
                                {item.timeSlots[item.timeSlots.length-1]?.low?.hr}:00</span>
                              </small>
                            } */}
                            {item.isVeg ?
                              <small className='flex text-green-900 gap-1 font-xs'><LeafyGreen size={18} />Veg</small> :
                              <small className='flex text-red-600 gap-1 font-xs'><Drumstick size={18} />Non-veg</small>}
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
        
      </div>
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

export default SlidingCard