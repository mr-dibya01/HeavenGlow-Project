import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div className='border-t'>
      <div className='text-xl py-10 text-center'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='flex gap-6 sm:flex-row flex-col justify-center text-sm text-gray-600'>
        <img src={assets.contact_img} className='sm:w-[25vw] w-[60vw] sm:mx-0 mx-auto' alt="" />
        <div className='flex flex-col sm:text-start text-center sm:justify-center gap-6'>
          <h1 className='text-black text-base font-medium uppercase'>OUR STORE</h1>
          <div>
            <p>760001</p> 
            <p>Berhmapur, Odisha, INDIA</p>
          </div>
          <div>
            <p>Tel: 7788860049</p>
            <p>Email: dibyaranjan.webdev@gmail.com</p>
          </div>
          <div className='flex flex-col gap-2'> 
            <p className='text-black text-base font-medium uppercase'>careers at forever</p>
            <p>Learn more about our teams and job openings.</p>
            <div>
              <button className='border px-4 py-2 border-gray-400 mt-2 w-fit active:bg-black transition active:text-white duration-500'>Explore Job</button>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-14'>
        <NewsLetter />
      </div>
    </div>

  )
}

export default Contact
