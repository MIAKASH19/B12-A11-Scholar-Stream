import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGoogleScholar } from "react-icons/fa6";
import Button from "./Button";

const socialLinks = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/mazaharul.islam.98434" },
  { name: "X", icon: RiTwitterXFill , link: "https://x.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Youtube", icon: FaYoutube, link: "https://www.youtube.com/" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/in/mi-akash/" },
];

const Footer = () => {
  return (
    <div className="relative flex flex-col items-center p-3 pt-10 md:pt-3 border-t border-zinc-200 dark:border-zinc-700 overflow-hidden bg-linear-to-b from-white to-slate-50 dark:from-[#0b0f19] dark:to-[#0e1424] transition-colors">
      
      {/* Decorative Blurs */}
      <div className="bg-blue-200 dark:bg-blue-900 w-full h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full opacity-50"></div>
      <div className="bg-pink-100 dark:bg-pink-900 w-full h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full opacity-30"></div>

      {/* Heading */}
      <h1 className="md:text-6xl text-5xl text-center md:w-1/2 w-full md:font-normal font-semibold pt-10 relative text-gray-900 dark:text-white">
        Ready to Take{" "}
        <span className="bg-linear-to-r to-[#fd95e7] from-[#0CB3FA] bg-clip-text text-transparent">
          Challenge
        </span>{" "}
        in Your Study?
      </h1>
      <p className="relative text-sm md:w-1/2 w-full text-center mt-5 opacity-85 text-gray-600 dark:text-gray-400">
        Discover verified local and international scholarships in one place.
        Search, compare, and apply with confidence, all from a single platform.
      </p>

      {/* Call to Action */}
      <Link to="/contact-us" className="md:flex relative hidden gap-8 mt-5">
        <Button text={"Contact us"} />
      </Link>

      {/* Footer Content */}
      <div className="bg-white dark:bg-[#0b0f19] relative h-fit border border-zinc-200 dark:border-zinc-700 mt-10 w-full rounded-2xl p-5 pb-0 transition-colors">
        <div className="flex flex-col md:flex-row items-start justify-between">
          
          {/* Branding / Newsletter */}
          <div className="flex flex-col w-120 gap-5">
            <h1 className="text-3xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <FaGoogleScholar className="text-blue-600" />
              Scholar_Stream
            </h1>
            <p className="w-fit tracking-tight text-sm text-gray-700 dark:text-gray-300">
              Sign Up to Enjoy Your Learning.
            </p>
            <div className="w-fit p-2 pl-3 border border-zinc-400 dark:border-zinc-600 rounded-full flex items-center">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full ml-2 transition-colors">
                Submit
              </button>
            </div>
            <p className="md:w-full w-[70%] opacity-80 text-sm text-gray-600 dark:text-gray-400">
              Discover verified local and international scholarships in one
              place. Search, compare, and apply with confidence, all from a
              single platform.
            </p>
          </div>

          {/* Navigation Columns */}
          {[
            { title: "Learn", items: ["Blogs", "Education", "Certification"] },
            { title: "About", items: ["Providers", "About Us"] },
            { title: "Pages", items: ["Home", "All Scholarships", "Contact Us", "About Us"  ] },
            { title: "Legal", items: ["Terms & Condition", "Privacy Policy", "Risk and Benefits"] },
            { title: "Social", items: socialLinks },
          ].map((col, idx) => (
            <div className="gap-3 mt-5 md:mt-0" key={idx}>
              <h1 className="font-medium mb-3 text-gray-900 dark:text-white">{col.title}</h1>
              <div className="flex flex-col gap-2">
                {col.title === "Social"
                  ? col.items.map(({ name, icon: Icon, link }, i) => (
                      <a
                        key={i}
                        href={link}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                      >
                        <Icon className="text-lg" />
                        {name}
                      </a>
                    ))
                  : col.items.map((n, i) => (
                      col.title === "Pages"
                        ? <Link
                            key={i}
                            to={`/${n.replace(/\s+/g, "-").toLowerCase()}`}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                          >
                            {n}
                          </Link>
                        : <p
                            key={i}
                            className="text-sm font-medium md:font-normal text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                          >
                            {n}
                          </p>
                    ))
                }
              </div>
            </div>
          ))}

        </div>

        {/* Copyright */}
        <div className="border-t text-center flex items-center justify-center h-15 border-zinc-300 dark:border-zinc-700 mt-5">
          <p className="opacity-80 text-sm text-gray-700 dark:text-gray-400">
            Copyright Reserved @ 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
