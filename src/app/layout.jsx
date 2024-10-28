import { Button } from "@/components/ui/button";
import "./globals.css";
import ChatModal from "@/components/ChatModal";

export const metadata = {
  title: "degenMax - Get your crypto trading fee back in real time!",
  description: "degenmax.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ChatModal />
    </html>
  );
}
