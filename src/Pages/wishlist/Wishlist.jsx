import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWhishList } from '../../Redux Toolkit/slices/WishlistSlice'
import Cookies from "js-cookie";
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../utilities/LoadingSpinner';
import { FaCartPlus } from 'react-icons/fa6';

export default function Wishlist() {

  const {isLoading ,isError,wishListItems} = useSelector((state) => state.wishListSlice)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getUserWhishList())
 },[])
       

 async function removeItemsFromWishlist({id}){
  let options = {
    url:`https://ecommerce-dot-code.vercel.app/api/wishlist/${id}`,
    method: 'DELETE',
    headers: {
      'authorization': Cookies.get("token") ,
    }    
  }
  const {data} = await axios.request(options)
  dispatch(getUserWhishList())
  toast.success("Item removed successfully")
 }

 if(isLoading){
   return <div className='flex justify-center items-center  h-full w-full min-h-screen'><LoadingSpinner /></div>
 }

 return <>

 {wishListItems && wishListItems.length > 0 ?  <section className='pb-8'>
  <div className='w-[90%] m-auto'>
  <div className='border-b-2 pb-4 pt-4 flex justify-between items-center'>
  <h3 className='text-lg md:text-2xl  font-bold text-nowrap '>My Wishlist</h3>
  <button className='texl-sm text-nowrap border-2 rounded px-4 py-2 md:px-6 '>sort by <span className='font-bold'> newest <IoIosArrowDown className='inline' /></span></button>
  </div>
 
  <div className='grid grid-cols-12 md:grid-cols-3 lg:grid-cols-5 my-12 gap-4'>
   {wishListItems.map((item)=> (
     <div className=' bg-white '  key={item._id}>
    <div>
     <div className='relative'>
     <div className='absolute top-2 right-2 p-2 w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center'>
         <FaHeart className=''/>
         </div>
       <div className='relative'>
       <img src={item.image} 
         alt={item.name}  className='w-full'/>
          <div className='w-full h-full flex justify-center gap-4 items-end absolute bottom-2   opacity-0 hover:opacity-100 transtion-all duration-200'>
     <button className='bg-white text-black text-xl rounded py-2 px-3  h-[40px] '><FaCartPlus /> </button>
     <button className='bg-white  text-xl rounded py-2  h-[40px] px-3 ' onClick={()=>{removeItemsFromWishlist({id:item._id})}}><RiDeleteBin6Line className='text-2xl text-red-700'/></button>
     </div>
       </div>
     </div>
    <div className='py-2 '>
    <div className='my-2 font-bold'>
     <h3 className=''>{item.name}</h3>
     <p className='my-2'><span className='font-bold'>Price :</span> ${item.price}</p>
     </div>
    
      <div className='flex gap-2  justify-start'>
        {item.colors && item.colors.length > 0 ? (
  item.colors.map((color, index) => (
    <div className='w-8 h-8 rounded-full border-2' style={{ backgroundColor: item.colors[index] }} key={index}></div>
           ))
) : (
  <p className='font-bold'>No colors available</p>
)}
      </div>
    
    </div>

   </div>
     </div>
   ))
 }           
 </div>
 
 <div className='border-y-2 py-2'>
 <div className='flex justify-between items-center w-[25%] md:w-[15%] lg:w-[8%] ml-auto'>
 <IoIosArrowBack />
     <p>1 of 1</p>
     <IoIosArrowForward />
 </div>
 </div>
 
  </div>
 
   </section>
    : ( <section className=' '>
     <div className='w-[90%] m-auto'>
     <h3 className='text-2xl font-bold border-b-2 pb-4 pt-6'>My Wishlist</h3>
       <div className=' flex flex-col justify-center items-center w-[38.1875 rem] text-center min-h-screen'>
       <FaRegHeart className='text-4xl mb-4' />
       
           <p className='font-bold'>it is empty here </p>
           <p className='text-sm mb-4 font-bold '>personalize your shoping experience with your wishlist</p>
           <Link to="/" className='w-[21.125 rem] bg-black text-white py-2 px-6 rounded '>COUNTUE SHOPPING</Link>
       </div>
     </div>
   
     </section>)}
  
   </>
}
