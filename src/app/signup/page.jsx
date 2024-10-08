"use client"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaLinkedin } from "react-icons/fa6"
import { IoCloseCircleSharp } from "react-icons/io5"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SignUpPage = () => {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showConPass, setShowConPass] = useState(false)

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    validatePassword(password, e.target.value)
  }

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError("Password did not match")
    } else {
      setError("")
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const form = e.target

    const name = form.name.value
    const email = form.email.value

    if (password !== confirmPassword) {
      toast.error("Password did not match")
      return
    }

    const newUser = {
      name,
      email,
      password: password,
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/signup/api`,
        newUser
      )
      if (data.status === 200) {
        toast.success(data.message)
      }
      if (data.status === 300 || data.status === 500) {
        toast.error(data.message)
        if (data.status === 500) return
      }
    } catch (error) {
      console.log(error)
    }

    if (password === confirmPassword) {
      setPassword("")
      setConfirmPassword("")
    }
    form.reset()
    router.push("/login")
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
            className="w-auto h-auto p-20"
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
          <h1 className="text-center text-secondary mt-6">Sign Up</h1>
          <form
            onSubmit={handleSignUp}
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
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
                value={password}
                onChange={handlePassword}
                placeholder="password"
                className="input input-bordered"
                required
              />
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
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type={showConPass ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Confirm password"
                className="input input-bordered"
                required
              />
              {error && (
                <span className="text-sm text-error font-semibold mt-1 ml-2 flex items-center gap-1">
                  <IoCloseCircleSharp className="text-lg" /> {error}
                </span>
              )}
              <div className="flex gap-2 items-center mt-2">
                <input
                  onClick={(e) =>
                    e.target.checked
                      ? setShowConPass(true)
                      : setShowConPass(false)
                  }
                  type="checkbox"
                  name="confirmPassword"
                  className="checkbox checkbox-sm checkbox-primary [--chkfg:white]"
                />
                <label
                  htmlFor="confirmPassword"
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
                Sign Up
              </button>
            </div>
          </form>
          <h3 className="my-5 text-center text-lg">or sign up with</h3>
          <div className="w-full flex gap-5 items-center justify-center mt-5">
            <button className="text-[#0866FF]">
              <FaFacebook className="text-4xl" />
            </button>
            <button className="text-[#0A66C2]">
              <FaLinkedin className="text-4xl" />
            </button>
            <button>
              <FcGoogle className="text-4xl" />
            </button>
          </div>
          <p className="mt-10 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={"/login"}
              className="text-primary font-bold"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
