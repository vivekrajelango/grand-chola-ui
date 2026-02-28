import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function CategoryCard({ category, handleCategory, handleVeg }: any) {
  const [isIndex, setIndex] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isText, setText] = useState('');
  const [isVeg, setVeg] = useState(false);

  const handleClick=(text:any, index:number, isVeg:boolean)=>{
    // setSelected(!isSelected);
    // setIndex(index);

    if (selectedIndex === index) {
      setText('');
      setSelectedIndex(null); 
      handleCategory('', isVeg)
    } else {
      setText(text.toLowerCase());
      setSelectedIndex(index);
      handleCategory(text.toLowerCase(), isVeg);
    }
  }

  const handleVegClick=()=>{
    setVeg(!isVeg)
    handleCategory(isText, isVeg);
  }

  useEffect(()=>{
    if(isText) setText(isText);
    if(isVeg) setVeg(isVeg);
  },[isText, isVeg])


  return (
    <>
      <div className="flex flex-col m-auto p-auto">
          <>
          <div className="flex overflow-x-scroll py-2 hide-scroll-bar">
            <div className="flex flex-nowrap ml-2">
                <div className="flex flex-col items-center px-2">
                  <div 
                    className={`w-[50px] overflow-hidden p-2 rounded-full ${isVeg ? 'bg-green-300' : 'bg-green-100'} shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                    onClick={()=>{
                      handleCategory(isText, !isVeg);
                      setVeg(!isVeg);
                    }}
                  >
                    <Image alt={'Veg'} src={`/images/categories/Veg.svg`} width={45} height={45} className='w-15' />
                  </div>
                  <h3 className='text-[11px] pt-1'>Veg Only</h3>
                </div>
              {category.map((item: any, index: number) =>
                <div className="flex flex-col items-center px-2" key={index}>
                  <div 
                    className={`w-[50px] overflow-hidden p-2 rounded-full ${selectedIndex === index ? 'bg-cyan-300' : 'bg-cyan-100'} shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                    onClick={()=>handleClick(item.toLowerCase(), index, isVeg)}
                  >
                    <Image alt={item+index} src={`/images/categories/${item}.svg`} width={45} height={45} className='w-15' />
                  </div>
                  <h3 className='text-[11px] pt-1'>{item}</h3>
                </div>
              )}
            </div>
          </div>
        </>
        
      </div>
    </>
  )
}

export default CategoryCard