import Navbar from "@/components/Navbar";
import "./../globals.css";

export const metadata = {
  title: "tetherMax - Get your crypto trading fee back in real time!",
  description: "tethermax.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="bg-gray-200 min-h-screen pt-16 flex justify-center">
          <div className="w-[840px] bg-white">{children}</div>
        </div>
      </body>
    </html>
  );
}
