"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaGoogle, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6"

const Footer = () => {
  const pathname = usePathname()

  if (pathname.includes("login") || pathname.includes("signup")) return

  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside>
        <Image
          src={"/assets/logo.svg"}
          width={"100"}
          height={"100"}
          alt="logo"
        />
        <p className="w-[300px] leading-loose">
          Next Car Industries Ltd.
          <br />
          Providing reliable tech since 1992. Edwin Diaz is a software and web
          technologies engineer, a life coach trainer who is also a serial .
        </p>
        <div className="flex gap-3 items-center">
          {/* Social links */}
          <Link
            href={"https://accounts.google.com"}
            className="bg-white/60 p-3 rounded-full"
            target="_blank"
          >
            <FaGoogle className="text-xl text-black/80" />
          </Link>
          <Link
            href={"https://x.com"}
            className="bg-white/60 p-3 rounded-full"
            target="_blank"
          >
            <FaTwitter className="text-xl text-black/80" />
          </Link>
          <Link
            href={"https://instagram.com"}
            className="bg-white/60 p-3 rounded-full"
            target="_blank"
          >
            <FaInstagram className="text-xl text-black/80" />
          </Link>
          <Link
            href={"https://linkedin.com"}
            className="bg-white/60 p-3 rounded-full"
            target="_blank"
          >
            <FaLinkedinIn className="text-xl text-black/80" />
          </Link>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer
