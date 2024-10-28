import Navbar from "@/components/Navbar";
import "./../globals.css";
import Footer from "@/components/Footer";
import { CombinedProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "degenMax - Get your crypto trading fee back in real time!",
  description: "degenmax.io",
};

export default function RootLayout({ children }) {
  return (
    <CombinedProvider>
      <Navbar />
      <div className="bg-[#F0F3F9] pt-[52px] md:pt-16 flex justify-center">
        <div className="w-[840px] bg-white">{children}</div>
      </div>
      <div className="bg-[#F0F3F9] flex justify-center">
        <Footer />
      </div>
    </CombinedProvider>
  );
}
