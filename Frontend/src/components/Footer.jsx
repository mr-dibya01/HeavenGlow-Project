import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-20 gap-14 sm:text-base text-sm text-gray-500'>
        <div>
          <img src={assets.logo1} alt="" className='w-48 sm:w-56 mb-5'/>
          <p className='w-full sm:w-[65%] text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid minus impedit unde. Voluptate minima amet excepturi, ratione est ex consectetur maiores, quaerat, libero voluptates ipsum tenetur quibusdam laboriosam porro?</p>
        </div>
        <div>
          <h1 className='text-xl font-semibold mb-5 text-black'>COMPANY</h1>
          <p className='hover:text-black transition-colors'>Home</p>
          <p className='hover:text-black transition-colors'>About us</p>
          <p className='hover:text-black transition-colors'>Delivery</p>
          <p className='hover:text-black transition-colors'>Privacy policy</p>
        </div>
        <div>
          <h1 className='text-xl font-semibold mb-5 text-black'>GET IN TOUCH</h1>
          <p className='hover:text-black transition-colors'>+91 7788860049</p>
          <p className='hover:text-black transition-colors'>dibyaranjan.webdev@gmail.com</p>
          <Link className='hover:text-black transition-colors' to={'https://www.instagram.com/build_yourownwebsite/'}>Instagram</Link>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ HEAVENGLOW.com - All Right Reserved.</p>
      </div>
    </div>
    
  )
}

export default Footer



// <div>
    //   <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    //     <div>
    //       <img src={assets.logo} alt="" className='mb-5 w-32'/>
    //       <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas unde reprehenderit culpa eum impedit quisquam saepe velit? Unde fugiat libero facilis incidunt optio ad corporis atque dignissimos, sunt dolorum ea.</p>
    //     </div>
    //     <div>
    //       <p className='text-xl font-medium mb-5'>COMPANY</p>
    //       <ul className='flex flex-col gap-1 text-gray-600'>
    //         <li>Home</li>
    //         <li>About</li>
    //         <li>Delivery</li>
    //         <li>Privacy policy</li>
    //       </ul>
    //     </div>
    //     <div>
    //       <p className='text-xl font-medium mb-5'>COMPANY</p>
    //       <ul className='flex flex-col gap-1 text-gray-600'>
    //         <li>Home</li>
    //         <li>About</li>
    //         <li>Delivery</li>
    //         <li>Privacy policy</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>