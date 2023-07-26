import "./globals.css";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins relative text-sm 2xl:text-base 3xl:text-lg`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
