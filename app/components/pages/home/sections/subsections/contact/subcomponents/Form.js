import { useState, useRef } from "react";
import { gsap } from "gsap";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";

export default function Form({ formRef }) {
  const [isProcessing, setIsProcessing] = useState(false); // State hook to keep track of ongoing form submission process

  // References for contact form inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Function to handle form submission
  const handleFormSubmission = async (event) => {
    event.preventDefault(); // Prevent browser's default form submission behavior

    // Extract form data from input fields
    let formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    // Validate form input fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill up the form first.');
      return;
    } else if (!(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(formData.email))) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Animate the form submit button on the start of the submission process
    const submitButtonTween = await gsap.to('form button p, form button div', {
      keyframes: {
        '0%': { autoAlpha: 1, y: 0 },
        '50%': { autoAlpha: 0, y: 15, onComplete: () => setIsProcessing(prevState => !prevState) },
        '100%': { autoAlpha: 1, y: 0 },
        easeEach: 'power1.inOut',
        ease: 'power1.inOut',
      },
      duration: 0.6,
    });

    try {
      // Send the form data to the server using a POST request
      const clientResponse = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the response from the server
      const serverResponse = await clientResponse.json();

      // Based on the client and server response status codes, display a success/error message
      if (clientResponse.status === 200 && serverResponse.status === 200) {
        toast.success('Your message is received. Thank you.');

        // Clear the form input fields
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
      } else {
        toast.error('Unable to send message.');
      }
    } catch (error) {
      toast.error('Unable to send message.');
    } finally {
      submitButtonTween.restart(); // Animate the button again after the form submission success/error
    }
  };

  return (
    <form ref={formRef} className="space-y-7 [&>div]:form-field-wrapper sm:space-y-9 xl:grid xl:grid-cols-2 xl:gap-8 xl:space-y-0 2xl:gap-10 3xl:gap-12" onSubmit={handleFormSubmission}>
      <div className="xl:col-span-1">
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" autoComplete="off" />
      </div>
      <div className="xl:col-span-1">
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="email" id="email" autoComplete="off" />
      </div>
      <div className="xl:col-span-2">
        <label htmlFor="message">Message</label>
        <textarea className="resize-none h-[20vh]" ref={messageRef} id="message" />
      </div>
      <button
        className={`flex items-center justify-center gap-x-2 w-full overflow-hidden py-3.5 rounded-sm font-medium transition-colors duration-100 ${isProcessing ? 'cursor-not-allowed bg-primary-lighter text-black hover:bg-primary-lightest' : 'cursor-pointer bg-primary-base text-white hover:bg-primary-light'} lg:w-5/12 xl:gap-x-3 xl:w-[36%] xl:col-span-2 2xl:w-[30%]`}
        disabled={isProcessing} // Disable button if form submission is ongoing
      >
        <p className={isProcessing ? 'order-1' : ''}>
          {isProcessing ? 'Processing' : 'Send Message'}
        </p>
        <div>
          {isProcessing ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FaPaperPlane />}
        </div>
      </button>
    </form>
  );
}
