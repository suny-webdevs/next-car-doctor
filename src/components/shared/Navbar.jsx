"use client"
import Link from "next/link"
import Image from "next/image"
import { FiSearch } from "react-icons/fi"
import { IoBagHandleOutline } from "react-icons/io5"
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  const session = useSession()
  const router = useRouter()

  const menuLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ]

  const menuLink = (
    <>
      {menuLinks.map((link, index) => (
        <li
          key={index}
          className="hover:!bg-none hover:!text-primary"
        >
          <Link href={link.path}>{link.title}</Link>
        </li>
      ))}
    </>
  )

  if (pathname.includes("login") || pathname.includes("signup")) return

  return (
    <div className="container mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuLink}
          </ul>
        </div>
        <Link href={"/"}>
          <Image
            src={"/assets/logo.svg"}
            width={"90"}
            height={"90"}
            alt="logo"
            className="ml-1 md:ml-0"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuLink}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-3 mr-5">
          <button
            onClick={() => router.push("/my-bookings")}
            className="btn btn-ghost hover:!bg-white"
          >
            <IoBagHandleOutline className="!text-2xl !text-black/80" />
          </button>
          <button>
            <FiSearch className="text-2xl text-black/70" />
          </button>
        </div>
        <button className="btn btn-outline btn-primary hover:!text-white !rounded mr-3">
          Agreement
        </button>
        <div className="flex items-center gap-3">
          {session.status === "loading" && (
            <button className="btn btn-primary !text-white rounded-md">
              Loading...
            </button>
          )}
          {session.status === "authenticated" && (
            <button
              onClick={() => signOut()}
              className="btn btn-primary !text-white rounded-md"
            >
              Logout
            </button>
          )}
          {session.status === "unauthenticated" && (
            <Link
              href={"/login"}
              className="btn btn-primary !text-white !rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
