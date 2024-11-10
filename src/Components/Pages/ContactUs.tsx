import React, { useState, FormEvent, ChangeEvent } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { message } from "../InnerComponents/modal";
import Header from "../InnerComponents/Header";

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: ""
  });

  const contactRef = collection(db, "contactus");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lowercaseEmail = formData.email.toLowerCase();

    try {
      await addDoc(contactRef, {
        email: lowercaseEmail,
        subject: formData.subject,
        message: formData.message
      });

      message({
        type: "success",
        title: "We got your message!",
        text: "We will get back to you soon."
      });
      
      setFormData({
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      message({
        type: "error", 
        title: "Error",
        text: "Failed to send message. Please try again."
      });
    }
  };

  const inputClasses = "text-sm rounded-lg block w-full p-2.5 bg-[#F2F2F2] text-zinc-900 shadow-sm focus:ring-slate-500 focus:border-slate-500 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light";
  const labelClasses = "block mb-2 text-sm font-medium text-zinc-900 dark:text-slate-100";

  return (
    <section className="bg-gray-50 dark:bg-dark py-20">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto">
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-darkElevate dark:border-gray-700">
          <div className="space-y-4 md:space-y-6 p-8">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-zinc-900 dark:text-slate-200">
              Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-base text-center text-zinc-700 dark:text-slate-200 sm:text-md">
              <b>Got any problem in this website or functionality? ☹️</b>
              <br />
              <i className="font-normal">
                Send us a message here we will fix it as soon as possible.
              </i>
              <br /><br />
              <b>If you not got one 😊</b>
              <br />
              <i className="font-normal">
                "Connect with Us: Let's Make Your Student Journey Seamless!"
              </i>
            </p>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={inputClasses}
                  placeholder="name.branchYY@adaniuni.ac.in"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="subject" className={labelClasses}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={inputClasses}
                  placeholder="Let us know how we can help you"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClasses}>
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={inputClasses}
                  placeholder="Leave a comment..."
                  required
                  value={formData.message}
                  onChange={handleChange}
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
  );
};

export default ContactUs;
