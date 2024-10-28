import Link from "next/link";
import { Instagram, MessageCircle, Youtube, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-gray-600 py-8 px-4  w-[840px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-blue-600 font-bold text-xl mb-4">
          DEGENMAX PTE. LTD
        </h2>
        <div className="space-y-2 mb-6">
          <p>Unique Entity Number (UEN) : 202326628N</p>
          <p>
            Location : 531A UPPER CROSS STREET #04-98 HONG LIM COMPLEX SINGAPORE
            (051531)
          </p>
          <p>Consultation : Chat Support (00:00 - 24:00)</p>
          <p>
            Email :{" "}
            <a href="mailto:support@degenmax.io" className="hover:underline">
              support@degenmax.io
            </a>
          </p>
        </div>
        <div className="mb-6">
          <p>Copyright 2022 degenMax All Rights Reserved.</p>
          <p>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        <p className="mb-6 text-sm">
          All contents related to degenMax, including information, events, and
          UI, are protected under copyright law and the Content Industry
          Promotion Act. Unauthorized reproduction, transmission, distribution,
          scraping, or any similar actions are strictly prohibited under
          relevant laws and regulations without the prior written consent of
          DEGENMAX PTE.LTD.
        </p>
        <div className="flex space-x-4">
          <Link
            href="#"
            aria-label="Instagram"
            className="text-gray-400 hover:text-gray-500"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            aria-label="Discord"
            className="text-gray-400 hover:text-gray-500"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            aria-label="YouTube"
            className="text-gray-400 hover:text-gray-500"
          >
            <Youtube className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            aria-label="Twitter"
            className="text-gray-400 hover:text-gray-500"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            aria-label="Telegram"
            className="text-gray-400 hover:text-gray-500"
          >
            <Send className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
