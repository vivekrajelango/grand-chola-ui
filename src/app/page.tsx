"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store/reducers";
import { getMenuListfromApi, getCategoryListfromApi, getRestaurantVisibility } from "@/store/actions";
import { routePath } from "@/constants/api";
import { useRouter } from "next/navigation";
import BusyPage from "@/components/Busy";
import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Bookings from "@/components/Bookings";

interface Character {
  char: string;
  rotation: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [textArray, setTextArray] = useState<Character[]>([]);
  const getMenuList = useSelector((state: AppState) => state.user.getMenuAPiList);
  const getCategoryList = useSelector((state: AppState) => state.user.getCategoryList);
  const getStatus = useSelector((state: AppState) => state.user.visibilityStatus);

  const [isMenuFetched, setIsMenuFetched] = useState(false);
  const [isCategoryFetched, setIsCategoryFetched] = useState(false);
  const [isVisible, setVisible] = useState(getStatus);

  useEffect(() => {
    if (!isMenuFetched && (!getMenuList || getMenuList.length === 0)) {
      dispatch(getMenuListfromApi(routePath.GET_MENU_LIST, ""));
      setIsMenuFetched(true); 
    }

    dispatch(getRestaurantVisibility(routePath.GET_VISIBILITY, ""));

  }, [getMenuList, getCategoryList, isMenuFetched, isCategoryFetched, dispatch]);


  useEffect(()=>{
    setVisible(getStatus);
  },[getStatus])

  useEffect(() => {
    const text = "Your Restaurant Name -www.demo.com-";
    const characters: Character[] = text.split("").map((char, i) => ({
      char,
      rotation: i * 10.3, // Adjust for spacing
    }));
    setTextArray(characters);
  }, []);

  if(!isVisible && getMenuList?.length) return <BusyPage />

  return (
    <div className="overflow-y-scroll">
      <Navbar />
      <Hero />
      <Services />
      <Bookings />
      <Contact />
    </div>
  );
}
