import { IconMinus, IconPlus } from '@tabler/icons-react';
import React from 'react'

interface AddOnProps {
    isAddOn: any;
    itemCounts: any;
    createAddOn: (side:any) => void;
    deleteAddOn: (side:any) => void;

}
function AddOns({isAddOn, itemCounts, createAddOn, deleteAddOn}:AddOnProps) {
  return (
    <div className="flex flex-col shadow-lg gap-3 p-4 border-[1px] rounded-lg border-gray-300 bg-white text-black max-h-[95vh] min-h-[auto] mt-12 mb-16">
            
            {isAddOn && isAddOn.map((side: any, index: number) => (
              <div className="flex flex-row items-center justify-between">
                <div className='flex flex-col'>
                  <div className='-mb-1.5'>
                    {side.name}
                  </div>
                  <div className="text-lg font-bold text-red-600">&#8377;{side.offer !== '0' ? (side.onlinePrice - (side.onlinePrice * side.offer) / 100) : side.onlinePrice}
                  </div>
                </div>
                <section className="text-xl font-bold text-green-600 -mt-2">
                  {itemCounts[side.itemID] ? (
                    <div className='flex items-center ml-2 w-[75px] justify-between text-white'>
                      <IconMinus
                        stroke={2}
                        width={20}
                        className='rounded-full bg-red-500 h-[22px] w-[22px]'
                        onClick={() => deleteAddOn(side)}
                      />
                      <p className='text-black text-1xl'>{itemCounts[side.itemID]}</p>
                      <IconPlus
                        stroke={2}
                        width={20}
                        className='rounded-full bg-sky-600 h-[22px] w-[22px]'
                        onClick={() => {
                          const finalPrice = side.offer !== '0'
                            ? side.onlinePrice - (side.onlinePrice * side.offer) / 100
                            : side.onlinePrice;
  
                          createAddOn({
                            ...side,
                            onlinePrice: finalPrice
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className='h-[30px] w-[30px] bg-blue text-white rounded-full flex items-center justify-center'
                      onClick={() => {
                        const finalPrice = side.offer !== '0'
                          ? side.onlinePrice - (side.onlinePrice * side.offer) / 100
                          : side.onlinePrice;

                        createAddOn({
                          ...side,
                          onlinePrice: finalPrice
                        });
                      }}
                    >
                      <IconPlus stroke={3} />
                    </div>
                  )}
                </section>
              </div>
            ))}
            </div>
  )
}

export default AddOns