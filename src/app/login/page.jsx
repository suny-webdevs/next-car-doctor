"use client"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import SocialLogin from "@/components/shared/SocialLogin"

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)

  const searchParams = useSearchParams()
  const redirectedPath = searchParams.get("redirect")

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: redirectedPath ? redirectedPath : "/",
      })
      if (response.status === 200) {
        toast.success("Login successful!")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className="container mx-auto min-h-screen px-2 md:px-0 my-2 md:my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="hidden md:flex">
          <Image
            src={"/assets/images/login/login.svg"}
            alt="login image"
            width={1920}
            height={1080}
            className="w-full h-full p-20"
          />
        </div>
        <div className="border-2 py-10 md:px-10 md:py-14 rounded-xl">
          <div className="w-full flex justify-center items-center">
            <Link href={"/"}>
              <Image
                src={"/assets/logo.svg"}
                alt="logo"
                width={130}
                height={130}
              />
            </Link>
          </div>
          <h1 className="text-center text-secondary mt-6">Login</h1>
          <form
            onSubmit={handleLogin}
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
              <div className="flex gap-2 items-center mt-2">
                <input
                  onClick={(e) =>
                    e.target.checked ? setShowPass(true) : setShowPass(false)
                  }
                  type="checkbox"
                  name="password"
                  className="checkbox checkbox-sm checkbox-primary [--chkfg:white]"
                />
                <label
                  htmlFor="password"
                  className="text-sm text-secondary"
                >
                  Show password
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white"
              >
                Login
              </button>
            </div>
          </form>
          <h3 className="my-5 text-center text-lg">or sign in with</h3>
          <SocialLogin />
          <p className="mt-10 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={"/signup"}
              className="text-primary font-bold"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
