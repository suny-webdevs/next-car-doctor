"use client"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaLinkedin } from "react-icons/fa6"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const SocialLogin = () => {
  const searchParams = useSearchParams()
  const redirectedPath = searchParams.get("redirect")

  const handleSocialLogin = (provider) => {
    signIn(provider, {
      redirect: true,
      callbackUrl: redirectedPath ? redirectedPath : "/",
    })
  }

  return (
    <div className="w-full flex gap-5 items-center justify-center mt-5">
      <button
        onClick={() => handleSocialLogin("facebook")}
        className="text-[#0866FF]"
      >
        <FaFacebook className="text-4xl" />
      </button>
      <button
        onClick={() => handleSocialLogin("linkedin")}
        className="text-[#0A66C2]"
      >
        <FaLinkedin className="text-4xl" />
      </button>
      <button onClick={() => handleSocialLogin("google")}>
        <FcGoogle className="text-4xl" />
      </button>
    </div>
  )
}

export default SocialLogin
