"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AppState } from '@/store/reducers';
import { Home, Search, ShoppingCart, UtensilsCrossed,} from 'lucide-react';

const MenuBar = ({selectedItems}:any) => {
  const router = useRouter();
  const pathname = usePathname();
  const activeItem = pathname === '/menus' || pathname === '/menus/' ? 'offers' : 'browse';
  // const [isItems, setItems] = useState(() => {
  //   const items = localStorage.getItem("selectedItems");
  //   return items ? JSON.parse(items) : selectedItems;
  // });
  const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
  const [isData, setData] = useState(cartDetails);
  const menuItems = [
    // { icon: Home, label: 'Home', id: 'home', route: '/' },
    { icon: Home, label: 'Home', id: 'browse', route: '/' },
    // { icon: Star, label: 'Favourites', id: 'favourites', route: '/favourites' },
    { icon: UtensilsCrossed, label: 'Menu', id: 'offers', route: '/menus' },
  ];

  const handleCartClick = () => {
    router.push('/cart');
  };

  useEffect(()=>{
    setData(cartDetails);
  },[cartDetails])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-30 mx-auto md:max-w-md">
      <div className="relative">
        {/* Center Launch Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          <button
            onClick={handleCartClick}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            <div className="px-1 py-0.5 bg-teal-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-1 translate-x-1/4 text-nowrap">
                    <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
                    {isData?.length || 0}
                  </div>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex justify-between px-16 py-1 bg-gray-50">
          {menuItems.map((item) => {
            const Icon = item.icon;
            if (item.label === 'Cart') return null;

            const isActive = activeItem === item.id;

            return (
              <Link
                key={item.label}
                href={item.route}
                className="flex flex-col items-center space-y-1"
              >
                <Icon
                  className={`w-5 h-5
                    ${isActive ? 'text-emerald-700' : 'text-gray-500'}
                    `}
                />
                <span className={`text-sm ${isActive ? 'text-emerald-700' : 'text-gray-500'
                  }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MenuBar;
