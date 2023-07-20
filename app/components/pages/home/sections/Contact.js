'use client';

import ContactForm from "./subsections/contact/ContactForm";
import ContactInformation from "./subsections/contact/ContactInformation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  return (
    <>
      <section id="contact" className="overflow-hidden sm:flex sm:h-[calc(100vh_-_(80px_+_60px))] sm:[&>div]:h-full sm:[&>div]:w-min lg:h-[calc(100vh_-_(86px_+_60px))]">
        {/* Contact Form Subsection */}
        <ContactForm />
        {/* Alternative Contact Subsection */}
        <ContactInformation />
      </section>
      <ToastContainer
        className="text-sm mt-[80px] lg:mt-[86px]"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
