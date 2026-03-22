"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/store/reducers";
import { getMenuListfromApi, getRestaurantVisibility } from "@/store/actions";
import { routePath } from "@/constants/api";
import BusyPage from "@/components/Busy";
import Navbar from "@/components/Navbar";
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Bookings from "@/components/Bookings";

export default function Home() {
  const dispatch = useDispatch();
  const getMenuList = useSelector((state: AppState) => state.user.getMenuAPiList);
  const getStatus = useSelector((state: AppState) => state.user.visibilityStatus);

  useEffect(() => {
    if (!getMenuList || getMenuList.length === 0) {
      dispatch(getMenuListfromApi(routePath.GET_MENU_LIST, ""));
    }
    dispatch(getRestaurantVisibility(routePath.GET_VISIBILITY, ""));
  }, []);

  if(!getStatus && getMenuList?.length) return <BusyPage />

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
