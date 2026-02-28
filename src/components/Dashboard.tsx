"use client"; 
import { useRouter } from 'next/navigation';
import {Items} from '../utils/content.json';

export default function Dashboard() {
  const router = useRouter();
  if (typeof window === 'undefined') {
    return null;
  }


    return(
        <>
        {Items.map((item: any, index: number) => (
            <div key={index} className="flex flex-col max-w-sm cursor-pointer bg-white border mb-5 last:mb-10 border-cyan-800 rounded-t-lg shadow " onClick={()=>router.push('/menus')}>
              <div className="h-[185px] bg-cover bg-center">
                <img
                  className="rounded-t-lg object-cover h-full w-full"
                  src={item.imgSrc}
                  alt={item.name}
                />
              </div>
  
              <div className="flex flex-row items-center h-[52px] p-4 justify-between bg-cyan-800 text-white">
                <div className="text-white flex flex-col gap">
                  <span className="text-md flex items-center text-white text-2xl">{item.name}</span>
                </div>
                <div className="flex flex-col rounded bg-white px-2 py-1">
                  <span className="text-red-500 text-sm">Order now</span>
                </div>
              </div>
            </div>
          ))}
        </>
    )
}