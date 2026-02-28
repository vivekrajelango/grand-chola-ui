'use client'
import React, { useEffect, useState } from 'react'
// import { submitHandler } from '../../../actions/serverActions';

interface ProductProps {
  id?: number;
  product: string;
  price: string;
}

const Favourites= async ()=>{

  const response = await fetch('https://6786bcadf80b78923aa80262.mockapi.io/products',{
    cache:"no-cache",
    next: {
      tags: ["products"]
    }
  });

  const products:ProductProps[]= await response.json()
    

  return (
    <div className='px-5 text-gray-900'>
      {/* <form action={submitHandler}> */}
      <form>
        <p><input type="text" name="product" placeholder='enter product' /></p>
        <p><input type="text" name="price" placeholder='enter price'/></p>
        <button className='submit'>Add Product</button>
      </form>
      <section>
        {products?.map((item:ProductProps, index:number) => (
          <div key={item.id}>
            <p>{item.product}</p>
            <p>{item.price}</p>
          </div>

        ))}
        </section>
    </div>
  )
}

export default Favourites;