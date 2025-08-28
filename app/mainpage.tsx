"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

// Import Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

// Framer
import { motion } from "motion/react";
import Question from "@/components/FAQ";



export default function Home () {
  const templates = [
    {
      name: "Resume 1",
      image: "/images/template-1.png"
    },
    {
      name: "Resume 2",
      image: "/images/template-1.png"
    },
    {
      name: "Resume 3",
      image: "/images/template-1.png"
    },
    {
      name: "Resume 4",
      image: "/images/template-1.png"
    },
    {
      name: "Resume 5",
      image: "/images/template-1.png"
    },
    {
      name: "Resume 6",
      image: "/images/template-1.png"
    }
  ]
  return (
    <div>
      <Navbar />

      {/* Section 1 */}
      <section className="min-h-screen items-center justify-center grid grid-cols-1 md:grid-cols-2 px-10">
        <div className="space-y-4">
          <h1 className="font-bold text-5xl">Build Your Resume For <span className="text-violet-500">Free</span></h1>
          <p className="text-lg">Effortlessly Craft a Standout Resume to Showcase Your Skills and Achievements</p>
          <motion.button whileHover={{ width: "170px" }} className="flex gap-4 items-center bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-lg">
            <motion.b>Get Started</motion.b>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.button>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Bulatan gradient pertama */}
          <div className="absolute w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-50 animate-pulse top-0 left-0" />
          
          {/* Bulatan gradient kedua */}
          <div className="absolute w-[400px] h-[400px] bg-[#a02dd9] rounded-full blur-[150px] opacity-50 animate-pulse bottom-0 left-1/2 -translate-x-1/2" />
          
          {/* Bulatan gradient ketiga */}
          <div className="absolute w-[400px] h-[400px] bg-[#40decc] rounded-full blur-[150px] opacity-50 animate-pulse bottom-0 right-10" />
        </div>
          <Image src={"/images/example_cv.png"} alt="example_cv" width={500} height={500} className="object-contain h-full object-bottom" />
      </section>


      {/* Section 2 */}
      <section className="p-10">
        <h1 className="text-3xl w-full lg:w-1/2 text-gray-800">Pick a resume template and build your resume in minutes!</h1>
        <Swiper 
          modules={[Autoplay, Pagination, Navigation, Scrollbar, A11y]}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            760: {
              slidesPerView: 2,
            }, 
            1024: {
              slidesPerView: 4,
            }
          }}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          className="relative w-auto mt-10"
        >
          {templates.map((item, index) => (
            <SwiperSlide key={index} className="mb-10 group">
              <Link
                href={"/build-resume"}
                className="flex w-full h-full bg-gradient-to-t from-violet-100 to-blue-100 hover:from-pink-100 p-6 rounded-xl"
              >
                <Image src={item.image} alt={item.name} width={250} height={250} className="object-contain object-center w-full" />
              </Link>
              <Link
                href={"/build-resume"}
                className="cursor-pointer text-center group-hover:translate-y-0 group-hover:opacity-100 translate-y-10 opacity-0 transition-all ease-in-out absolute bottom-4 w-40 left-1/2 -translate-x-1/2 bg-violet-500 text-white p-1.5 rounded-md text-sm font-semibold"
              >
                  Use This Template
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="my-10 flex flex-col items-center space-y-10">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-2xl text-center font-semibold text-gray-500 items-center">
            <li className="flex flex-col space-y-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className="fill-[#12B886]">
                <g fill="#12b886" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" ><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM21.707,12.707l-7.56,7.56c-0.188,0.188 -0.442,0.293 -0.707,0.293c-0.265,0 -0.52,-0.105 -0.707,-0.293l-3.453,-3.453c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l2.746,2.746l6.853,-6.853c0.391,-0.391 1.023,-0.391 1.414,0c0.391,0.391 0.391,1.023 0,1.414z"></path></g></g>
              </svg>
              <h1>ATS-friendly professionally designed resumes</h1>
            </li>
            <li className="flex flex-col space-y-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className="fill-[#12B886]">
                <g fill="#12b886" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" ><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM21.707,12.707l-7.56,7.56c-0.188,0.188 -0.442,0.293 -0.707,0.293c-0.265,0 -0.52,-0.105 -0.707,-0.293l-3.453,-3.453c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l2.746,2.746l6.853,-6.853c0.391,-0.391 1.023,-0.391 1.414,0c0.391,0.391 0.391,1.023 0,1.414z"></path></g></g>
              </svg>
              <h1>Change the font, color, and background combinations</h1>
            </li>
            <li className="flex flex-col space-y-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className="fill-[#12B886]">
                <g fill="#12b886" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" ><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM21.707,12.707l-7.56,7.56c-0.188,0.188 -0.442,0.293 -0.707,0.293c-0.265,0 -0.52,-0.105 -0.707,-0.293l-3.453,-3.453c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l2.746,2.746l6.853,-6.853c0.391,-0.391 1.023,-0.391 1.414,0c0.391,0.391 0.391,1.023 0,1.414z"></path></g></g>
              </svg>
              <h1>Two-column, single-column, and multi-page layouts</h1>
            </li>
          </ul>
          <Link 
            href={"/"}
            className="underline text-violet-500 flex items-center gap-4 md:gap-2 text-lg hover:opacity-50"
          >
            <b>Browse Resume Templates</b>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>


      {/* Section 3 */}
      <section>
        <h1 className="font-extrabold text-4xl text-center">Why Use Our Online Resume Builder</h1>
        <div className="mt-40 px-10">
          <ul className="space-y-10">
            <li className="flex flex-col md:flex-row justify-evenly gap-10 items-center">
              <div className="w-full md:w-1/2 flex flex-col space-y-6">
                <h2 className="font-bold text-3xl">Professional Designs</h2>
                <p className="text-xl">Choose from a wide range of styles for every job level and type. From fun and creative to simple and modern, there is a perfect design for everyone.</p>
              </div>
              <Image src={'/images/example_cv.png'} alt="cv" width={300} height={300} />
            </li>
            <li className="flex flex-col md:flex-row-reverse justify-evenly gap-10 items-center">
              <div className="w-full md:w-1/2 flex flex-col space-y-6">
                <h2 className="font-bold text-3xl">ATS-Friendly</h2>
                <p className="text-xl">Employers use applicant tracking systems (ATS) to filter out candidates. With our templates, be confident knowing  that your ATS-friendly resume will reach the hiring manager successfully.</p>
              </div>
              <Image src={'/images/example_cv.png'} alt="cv" width={300} height={300} />
            </li>
            <li className="flex flex-col md:flex-row justify-evenly gap-10 items-center">
              <div className="w-full md:w-1/2 flex flex-col space-y-6">
                <h2 className="font-bold text-3xl">Unlimited Resumes</h2>
                <p className="text-xl">Make and edit Unlimited resumes, experiment with multiple templates and styles to find the perfect one for you.</p>
              </div>
              <Image src={'/images/example_cv.png'} alt="cv" width={300} height={300} />
            </li>

          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <Question />
      </section>
    </div>
  )
}