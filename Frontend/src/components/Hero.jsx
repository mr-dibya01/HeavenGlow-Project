import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {
  // console.log("Hero");
  return (
    <div className='flex flex-col md:flex-row border gap-4 sm:gap-0 border-gray-500'>
      {/* LeftSide */}
      <div className='flex w-full md:w-1/2 items-center justify-center p-2 sm:p-10'>
        <div className=' text-gray-600 '>
          <div className='flex items-center gap-2'>
            <hr className='h-[3px] text-red-400 bg-gray-600 w-14 border-none'/>
            <p className='text-sm sm:text-lg font-medium whitespace-nowrap'>OUR BESTSELLERS</p>
          </div>
          <h1 className='text-3xl whitespace-nowrap py-2  sm:py-3 sm:text-5xl lg:text-6xl leading-relaxed prata-regular'>Latest Arrivals</h1>
          <div className='flex items-center gap-2 sm:justify-end justify-start'>
            <p className='text-base font-medium'>SHOP NOW</p>
            <hr className='h-0.5 text-red-400 bg-gray-600 w-16 border-none ml-1'/>
          </div>
        </div>
      </div>
    {/* RightSide */}
      <img src="https://images.unsplash.com/photo-1619785690726-89c6b3bd3849?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='md:w-1/2 w-full md:h-full object-cover'/>
    </div>
  )
}

export default Hero


// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'

// function Hero() {
//   return (
//     <div className='flex sm:flex-row flex-col border border-gray-400 '>
//         {/* LeftSide */}
//         <div className='w-full sm:w-1/2 flex justify-center items-center py-10 sm:py-0'>
//             <div className='text-[#414141]'>
//                 <div className='flex items-center gap-2'>
//                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//                     <p className='font-medium text-sm md:text-base'>our bestsellers</p>
//                 </div>
//                 <h1 className='text-3xl lg:text-5xl leading-relaxed sm:py-3'>Latest Arrivals</h1>
//                 <div className='flex items-center gap-2'>
//                     <p className='font-semibold text-sm md:text-base'>shop now</p>
//                     <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
//                 </div>
//             </div>
//         </div>
//         {/* RightSide */}
//         <img src={assets.hero_img}  className="w-full sm:w-1/2" alt="" />
//     </div>
//   )
// }

// export default Hero
