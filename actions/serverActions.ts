"use server";
import { revalidateTag } from "next/cache";

export const submitHandler= async(e:FormData)=>{ 
  
    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();
    console.log('hello', product);
    if(!product || !price ) return;

    const newProduct = {
      product,
      price
    }
    await fetch('https://6786bcadf80b78923aa80262.mockapi.io/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    }) 
    revalidateTag("products")
  }