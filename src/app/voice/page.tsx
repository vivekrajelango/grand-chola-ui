"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store/reducers';
import { addItemsCount, getMenuListfromApi, saveCart } from '@/store/actions';
import { routePath } from '@/constants/api';
import AnimateAI from '@/components/AnimateAI';
import AnimateListen from '@/components/AnimateListen';
import { useRouter } from 'next/navigation';


const VoiceSearch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getMenuList = useSelector((state: AppState) => state.user.getMenuAPiList);
  const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
  const persistItemsDetails = useSelector((state: AppState) => state.user.addItemsCount);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(persistItemsDetails || {});
  const [selectedItems, setSelectedItems] = useState(cartDetails || []);
  const [Menus, setMenus] = useState<any>(getMenuList);
  const [isMenuFetched, setIsMenuFetched] = useState(false);
  const [isAnimate, setAnimate] = useState(false);


  const [searchQuery, setSearchQuery] = useState('');

  const parseSearchQuery = (query: string) => {
    // Remove common words and normalize spaces
    const cleanQuery = query.toLowerCase()
      .replace(/(pls|please|order|and)/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Find all matches of quantity + item pairs
    const matches = cleanQuery.match(/(\d+)\s*([^0-9]+?)(?=\s*\d+\s*|$)/g) || [];

    return matches.map(match => {
      // Extract quantity and term from each match
      const [quantity, ...termParts] = match.trim().split(/\s+/);
      const term = termParts.join(' ').replace(/pizza/g, '').trim();

      return {
        quantity: parseInt(quantity),
        term: term
      };
    }).filter(term => term.quantity > 0 && term.term.length > 0);
  };

  const handleSearch = (text: any) => {
    const searchTerms = parseSearchQuery(text);

    // To ensure the filtered items are updated based on the new `Menus`, use a callback:
    setMenus((prevMenus: any) => {
      // const newFilteredItems = prevMenus.filter((item: any) =>
      //   searchTerms.some(term =>
      //     term && item.name.toLowerCase().includes(term.term)
      //   )
      // );

      // Add items to cart with quantities
      searchTerms.forEach(term => {
        if (!term) return;

        const matchingItem = prevMenus.find((item: any) =>
          item?.searchKeys.length && item.searchKeys.some((keyword:any) => keyword.toLowerCase().includes(term.term))
        );
        console.log('xx', matchingItem)

        if (matchingItem) {
          addToCart(matchingItem, term.quantity);
          setAnimate(!isAnimate);
          setTimeout(() => {
            setAnimate(!isAnimate);
            router.push('/cart');
          }, 5000)
        }
      });
      return prevMenus;
    });
  };

  const textHandler = async (text: any) => {
    // console.log('text', text)
    setSearchQuery(text);
    handleSearch(text);
  }
  const addToCart = (item: any, quantity: number = 1) => {

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.itemID]: quantity
    }));

    setSelectedItems((prevItems: any) => {
      const existingItem = prevItems?.find((i: any) => i.itemID === item.itemID);

      if (existingItem) {
        return prevItems.map((cartItem: any) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: quantity }
            : cartItem
        );
      }

      return [...prevItems, { itemID: item.itemID, name: item.name, price: item.onlinePrice, count: quantity, offer: item.offer }];
    });
  };

  useEffect(() => {
    if (getMenuList.length) setMenus(getMenuList.flatMap((item:any)=>item.MenuItems));
    if (selectedItems) dispatch(saveCart(selectedItems));
    if (itemCounts) dispatch(addItemsCount(itemCounts));
    if (isAnimate) setAnimate(isAnimate);
    console.log('xxx', getMenuList.flatMap((item:any)=>item.MenuItems));
  }, [getMenuList, selectedItems, itemCounts, isAnimate, cartDetails]);

  useEffect(() => {
    if (!isMenuFetched && (!getMenuList || getMenuList.length === 0)) {
      dispatch(getMenuListfromApi(routePath.GET_MENU_LIST, ""));
      setIsMenuFetched(true);
    }

  }, [getMenuList, isMenuFetched, dispatch]);


  return (
    <div>
      {isAnimate ?
        <AnimateAI /> :
        <AnimateListen sendTextHandler={textHandler} />
      }
    </div>
  );
};

export default VoiceSearch;