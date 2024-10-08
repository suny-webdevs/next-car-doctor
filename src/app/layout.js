import localFont from "next/font/local"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import AuthProvider from "@/services/AuthProvider"
import { Toaster } from "react-hot-toast"
import { Noto_Sans_Display } from "next/font/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const notoSansDisplay = Noto_Sans_Display({ subsets: ["latin"] })

export const metadata = {
  title: "Next Car",
  description: "Car repairing workshop",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={notoSansDisplay.className}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster />
          <div>
            <Navbar />
          </div>
          <div>{children}</div>
          <div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
