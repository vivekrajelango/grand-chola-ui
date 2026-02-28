import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drumstick, Heart, LeafyGreen, MapPinCheck, Star, TicketPlus } from 'lucide-react'
import { itemsData } from '../../utils/content';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import MenuBar from '../Navigation';
import { saveCart, addItemsCount, addFavourites } from '@/store/actions';
import { AppState } from '@/store/reducers';
import AddOns from './AddOns';
import Drawer from './Drawer';
// import DetailsPage from '@/app/details/page';

function VerticalCard({ menus }: any) {
  const dispatch = useDispatch();
  const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
  const persistItemsDetails = useSelector((state: AppState) => state.user.addItemsCount);

  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(persistItemsDetails || {});
  const [selectedItems, setSelectedItems] = useState(cartDetails || []);

  const getOfferList = useSelector((state: AppState) => state.user.getOfferList);
  const [isOfferList, setOfferList] = useState<any>(getOfferList || []);
    const [isShow, setShow] = useState<any>(false);
   const [isAddOn, setAddOn] = useState<any>([]);

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
    if (itemCounts) dispatch(addItemsCount(itemCounts));
    if(getOfferList) setOfferList(getOfferList);
    if(isShow) setShow(isShow);
  }, [selectedItems, itemCounts, getOfferList, isShow]);

  if(getOfferList.length === 0) 
    return <div className='text-black flex flex-col items-center justify-center h-[100vh]'>
      <p className='text-2xl'>Now!!</p>
      <p className='text-xl mb-6'>Flat 5% discount for App orders</p>
      <p className='text-gray-500'>Stay tuned for more offers!!!</p>
    </div>

  return (
    <>
      <div className="flex flex-col m-auto p-auto pt-4 pb-20">
        {getOfferList?.map((mainItem: any, mainIndex: number) => (
          <>
            {/* <h2 className="text-xl font-semibold tracking-tight text-gray-600 pl-6 pb-1">{mainItem.offer}</h2> */}
            <div className="flex overflow-x-scroll pb-4 hide-scroll-bar">
              <div className="flex flex-wrap gap-4 lg:ml-40 md:ml-20 ml-6">
                {mainItem.offer !=="0" && mainItem.MenuItems.map((item: any, index: number) =>
                  <div className="inline-block px-2.5" key={index}>
                    <div className="w-96 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                      <section className="relative w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${item.imgSrc})` }}>
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        <div className="absolute inset-0 flex flex-col justify-between p-4 text-black">
                          {item.offer !=="0" && <div className="flex items-center justify-between">
                            {item.offer && item.offer === '50' 
                              ? <small className='bg-yellow-200 rounded-lg px-1'>Buy 1 Get 1</small>
                              : <small className='bg-yellow-200 rounded-lg px-1'>{item.offer+'% off'}</small>
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
                      <div className="px-3 py-1 bg-white">
                        <div className='flex flex-row items-center justify-between'>
                          <h5 className="text-lg font-semibold tracking-tight text-gray-600 truncate">{item.name}</h5>
                          <div className='flex flex-row items-center justify-center gap-1'>
                            {item.offer !=='0' && <span className="text-sm font-semibold text-red-600  line-through">&#8377;{item.onlinePrice}</span>}
                            <span className="text-xl font-bold text-green-600">&#8377;{item.offer !=='0'? (item.onlinePrice-(item.onlinePrice*item.offer)/100) : item.onlinePrice}</span>
                          </div>

                        </div>
                        <div className='flex flex-row items-center justify-between'>
                          <h5 className="text-xs font-normal tracking-tight text-gray-500 -mt-1">{item.duration} mins</h5>
                          {/* <span className="text-xl font-bold text-green-600 -mt-2">&#8377;{item.onlinePrice}</span> */}
                        </div>
                        <div className="flex items-center justify-between my-0">
                          <div className='flex items-center justify-center gap-3'>
                            {item.isVeg ?
                              <small className='flex text-green-900 gap-1 font-xs'><LeafyGreen size={18} />Veg</small> :
                              <small className='flex text-red-600 gap-1 font-xs'><Drumstick size={18} />Non-Veg</small>}

                          </div>
                          <span className="text-xl font-bold text-green-600 -mt-2">
                            {itemCounts[item.itemID] ? (
                              <div className='flex items-center ml-2 w-[85px] justify-between text-white'>
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
                              <div
                                className='h-[35px] w-[35px] bg-blue text-white rounded-full flex items-center justify-center'
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
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ).sort((a:any,b:any)=>a.itemID - b.itemID)}
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

export default VerticalCard