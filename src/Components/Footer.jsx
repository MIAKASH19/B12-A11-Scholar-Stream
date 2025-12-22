import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGoogleScholar } from "react-icons/fa6";

const socialLinks = [
  { name: "Facebook", icon: FaFacebook, link: "#" },
  { name: "Twitter", icon: RiTwitterXFill , link: "#" },
  { name: "Instagram", icon: FaInstagram, link: "#" },
  { name: "Youtube", icon: FaYoutube, link: "#" },
];

const Footer = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center p-3 pt-10 md:pt-3 border-t border-zinc-200 overflow-hidden">
      <div className="bg-blue-200 w-100 h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full"></div>
      <div className="bg-pink-100 w-100 h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full"></div>
      <h1 className="md:text-6xl text-5xl text-center md:w-1/2 w-full md:font-medium font-semiboldpt-10 relative">
        Ready to Take Challenge in Your Study?
      </h1>
      <p className="relative text-sm md:w-1/2 w-full text-center mt-5 opacity-85">
        Discover verified local and international scholarships in one place.
        Search, compare, and apply with confidence, all from a single platform.
      </p>
      <div className="md:flex hidden gap-8 bg-red-500 mt-5">
        <button className="bg-blue-600 px-5 py-2 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer">
          Get Start
        </button>
        <button className="bg-white px-5 py-2 rounded-full text-black text-sm font-medium shadow-2xl cursor-pointer relative border border-zinc-200">
          Contact us
        </button>
      </div>
      <div className="bg-white relative h-fit  border border-zinc-200 mt-10 w-full rounded-2xl p-5 pb-0">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex flex-col w-120 gap-5">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              {" "}
              <FaGoogleScholar className="text-blue-600" />
              Scholar-Stream
            </h1>
            <p className="w-fit tracking-tight text-sm">
              Sign Up to Enjoy Your Learning.
            </p>
            <div className="w-fit p-2 pl-3 border border-zinc-400 rounded-full">
              <input type="text" placeholder="Enter Your Email" />
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Submit
              </button>
            </div>
            <p className="md:w-full w-[70%] opacity-80 text-sm">
              Discover verified local and international scholarships in one
              place. Search, compare, and apply with confidence, all from a
              single platform.
            </p>
          </div>
          <div className="gap-3 mt-5 md:mt-0">
            <h1 className="font-medium mb-3">Learn</h1>
            <div className="flex flex-col gap-2">
              {["Blogs", "Education", "Certification"].map((n, i) => (
                <p key={i} className="text-sm font-medium md:font-normal hover:text-blue-600">
                  {n}
                </p>
              ))}
            </div>
          </div>
          <div className="gap-3 mt-5 md:mt-0">
            <h1 className="font-medium mb-3">About</h1>
            <div className="flex flex-col gap-2">
              {["Providers", "About Us"].map((n, i) => (
                <p key={i} className="text-sm hover:text-blue-600">
                  {n}
                </p>
              ))}
            </div>
          </div>
          <div className="gap-3 mt-5 md:mt-0">
            <h1 className="font-medium mb-3">Pages</h1>
            <div className="flex flex-col gap-2">
              {["Home", "All Scholarships", "Contact Us", "About Us"].map(
                (n, i) => (
                  <Link
                    key={i}
                    to={`/${n}`}
                    className="text-sm hover:text-blue-600"
                  >
                    {n}
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="gap-3 mt-5 md:mt-0">
            <h1 className="font-medium mb-3">Legal</h1>
            <div className="flex flex-col gap-2">
              {["Terms & Condition", "Privacy Policy", "Risk and Benefits"].map(
                (n, i) => (
                  <p key={i} className="text-sm hover:text-blue-600">
                    {n}
                  </p>
                )
              )}
            </div>
          </div>
          <div className="gap-3 mt-5 md:mt-0">
            <h1 className="font-medium mb-3">Social</h1>
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ name, icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  className="flex items-center gap-2 text-sm hover:text-blue-600"
                >
                  <Icon className="text-lg" />
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t text-center flex items-center justify-center h-15 border-zinc-300 mt-5">
          <p className="opacity-80 text-sm">Copyright Reserved @ 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
