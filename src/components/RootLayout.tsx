'use client'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import MenuBar from './Navigation';
import { useEffect } from "react";
import InactivityRedirect from './common/InactivityRedirect';
import AddToHomeScreenButton from './AddToHomeScreenButton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  if (!pathname) return null;
  const shouldShowMenuBar = !pathname.startsWith('/admin') && !pathname.startsWith('/login') && !pathname.startsWith('/voice');
  const shouldShowInstallBar = pathname !== '/menus' && !pathname.startsWith('/admin') && !pathname.startsWith('/voice')


  return (
    <div>
        <main>
          {/* <InactivityRedirect /> */}
          {children}
          {shouldShowMenuBar && <MenuBar/>}
          {shouldShowInstallBar && <AddToHomeScreenButton />}
        </main>
    </div>
  );
}