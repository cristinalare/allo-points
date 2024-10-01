import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => (
  <header className="px-6 bg-black flex items-center justify-between sm:gap-16 gap-6 py-2">
    <div className="flex items-center sm:gap-16 gap-6">
      <Image src="/allo-logo.svg" alt="Allo logo" width={74} height={20} />
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white font-semibold">
            <div className="flex items-center gap-2">
              Experts
              <Image alt="" width="12" height="11" src="/down-icon.svg" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black">
            <DropdownMenuItem>
              <Link href="/" target="_blank" className="w-full">
                Leaderboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="https://allobook.gitcoin.co/"
                target="_blank"
                className="w-full"
              >
                Book
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="sm:block hidden">
        <ul className="font-semibold flex items-center sm:gap-8 gap-4 text-white">
          <li>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className="link white"
            >
              Experts
            </Link>
          </li>
          <li>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className="link white selected"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              href="https://allobook.gitcoin.co/"
              target="_blank"
              className="link white"
            >
              Book
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <ConnectButton />
  </header>
);
