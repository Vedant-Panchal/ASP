import React from 'react'
import Header from '../InnerComponents/Header'

function AboutUs() {
  return (
    <section className="bg-white dark:bg-dark h-screen mt-14">
      <Header />
  <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-18">
    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 lg:text-4xl text-sm tracking-tight font-extrabold text-gray-900 text-center dark:text-white">
         Welcome to Adani Study Portal (ASP)😎 <br /><br /> 
      </h2>
      <h2 className="mb-4 lg:text-xl text-sm tracking-tight font-extrabold text-gray-900 text-wrap dark:text-white">
      Your centralized hub for accessing university materials in a structured and student-friendly format.
      </h2>
      <p className="mb-4 font-normal text-white text lg:text-sm text-justify">
        We are strategists, designers and developers. Innovators and problem
        solvers. Small enough to be simple and quick, but big enough to deliver
        the scope you want at the pace you need. Small enough to be simple and
        quick, but big enough to deliver the scope you want at the pace you
        need.
      </p>
      
    </div>
    <div>
    <h2 className="mb-4 lg:text-sm dark:text-white text-xs font-normal tracking-tight text-justify">
      Born from the vision of students who understand the importance of streamlined education, ASP is your gateway to a seamless learning experience.
      </h2>
      <p className="mb-4 font-normal lg:text-sm text-xs  text-justify dark:text-white">
      <b className='dark:text-[#FC54AD] mr-1'>Made by Students:</b>
ASP is not just a platform; it's a student-led initiative born out of the necessity of  having all university resources in one place. Crafted by students who've walked in your shoes, ASP is designed to be a reliable companion, addressing the very issue we faced during our academic pursuits.
      </p>
      <p className="mb-4 font-normal lg:text-sm text-xs text-justify text-white">
      <b className='dark:text-[#FC54AD] mr-1'>For Students:</b>
      ASP understands the value of having all your course materials in a single, easily accessible location. Navigate through your academic journey effortlessly as we provide a centralized and structured collection of university resources, inspired by our own struggle to find everything we needed.
      </p>
      <p className="mb-4 lg:text-sm text-xs text-justify dark:text-[#FC54AD]  font-bold">
     
      Join ASP, where the idea sprouted from our own challenges, and let us simplify your learning experience by bringing all your university materials to your fingertips. Embrace a new era of organized and accessible education with Adani Study Portal.
      </p>
    </div>
  </div>
</section>

  )
}

export default AboutUs