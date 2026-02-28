"use client"; // Mark this component as a Client Component

import { usePathname } from "next/navigation";

export default function DynamicManifest() {
  const pathname = usePathname(); 

  if(!pathname) return null
  const manifest = pathname.startsWith("/admin") ? "/manifest-admin.json" : "/manifest.json";

  return <link rel="manifest" href={manifest} />;
}
