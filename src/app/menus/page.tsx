"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import {Menus} from '../../utils/menus.json';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import SlidingCard from '@/components/common/SlidingCard';
import { AppState } from '@/store/reducers';
import { filteredItems, getMenuListfromApi } from '@/store/actions';
import OffersPage from '@/components/common/OffersPage';
import CategoryCard from '@/components/common/CategoryCard';
import { MENU_CATEGORIES } from '@/constants/constants';
import { routePath } from '@/constants/api';
import MenuList from '@/components/common/MenuList';


const Menus: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
  const [isFiltered, setFiltered] = useState([]);
  const getMenuList = useSelector((state: AppState) => state.user.getMenuAPiList);
  const getCategoryList = useSelector((state: AppState) => state.user.getCategoryList);

  const [Menus, setMenus] = useState<any>(getMenuList);
  const [Categories, setCategories] = useState<any>(getCategoryList);

  const filterText = (text: any, isVeg:any) => {
    const filteredMenus = Menus.map((menu: any) => {
      const filteredItems = menu.MenuItems.filter((item: any) =>{
        // return item.name.toLowerCase().includes(text.toLowerCase())
        const matchesVegFilter = !isVeg || item.isVeg;
        const matchesTextFilter = !text || item?.searchKeys.length && item.searchKeys.some((keyword:any) => keyword.toLowerCase().includes(text.toLowerCase()));
        return matchesVegFilter && matchesTextFilter;
      });

      // Return the menu only if there are matching items
      if (filteredItems.length > 0) {
        return {
          ...menu,
          MenuItems: filteredItems, // Replace MenuItems with filtered ones
        };
      }
      return null;
    }).filter((menu: any) => menu !== null);
    dispatch(filteredItems(filteredMenus))
  }

  const [isMenuFetched, setIsMenuFetched] = useState(false);

  useEffect(() => {
    if (getMenuList.length) {
      setMenus(getMenuList);
    } else if (!isMenuFetched) {
      dispatch(getMenuListfromApi(routePath.GET_MENU_LIST, ""));
      setIsMenuFetched(true);
    }
  }, [getMenuList])

  useEffect(()=>{
    if(getCategoryList) setCategories(getCategoryList);
  },[getCategoryList])

  return (
    <div className='relative'>
      <section className='flex flex-col bg-gray-100 text-black '>
        <div className='fixed z-20 w-full md:max-w-sm'>
          <SearchBar handleSearch={filterText} />
        </div>
        <div className='relative top-16 py-1 pb-8 overflow-y-auto z-10 top-22'>
          {/* <div className='flex flex-col item-center justify-center bg-white h-[200px]'>
            <OffersPage />
          </div> */}
          <div className='bg-white mt-0'>
            <CategoryCard category={MENU_CATEGORIES} handleCategory={filterText} />
          </div>
          <div className='bg-white mt-1 mb-8'>
            <SlidingCard menus={Menus} />
            {/* <MenuList menus={Menus} /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menus;