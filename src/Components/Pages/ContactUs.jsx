import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { message } from "../InnerComponents/modal";


function ContactUs() {
  const [email, setemail] = useState("")
  const [subject, setSubject] = useState("")
  const [contactmessage, setcontactmessage] = useState("")
  const contactRef = collection(db,"contactus")
  async function handleSubmit(e) {
    e.preventDefault();
    const lowercasemail = email.toLowerCase()
    await addDoc(contactRef,{
      email: lowercasemail,
      subject: subject,
      message: contactmessage
    })
    .then(()=>{
       message("success", "We got your message !","We will get back to you soon.")
       setemail("")
       setSubject("")
       setcontactmessage("")
 
    })
  }
  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900 py-20 ">
        <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto ">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className=" space-y-4 md:space-y-6 p-8">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-base text-center text-gray-500 dark:text-gray-400 sm:text-md">
          <b className="text-slate-300">
            Got any problem in this website or functionality? ☹️
          </b>
          <br />{" "}
          <i>Send us a message here we will fix it as soon as possible.</i>
          <br />
          <br />
          <b className="text-slate-300">If you not got one 😊</b>
          <br />
          <i>"Connect with Us: Let's Make Your Student Journey Seamless!"</i>
        </p>
              
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name.branchYY@adaniuni.ac.in"
              required="true"
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required="true"
              value={subject}
              onChange={(e)=>{setSubject(e.target.value)}}

              />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              required="true"
              value={contactmessage}
              onChange={(e)=>{setcontactmessage(e.target.value)}}
              />
              
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
            Send message
          </button>
              </form>
              
            </div>
          </div>
        </div>
      </section>
            </>
  );
}

export default ContactUs;
