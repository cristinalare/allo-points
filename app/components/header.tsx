import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => (
  <header className="px-6 py-8 fixed top-0 left-0 flex items-center justify-between w-full">
    <Image
      className="sm:max-h-none max-h-[20px] w-auto"
      src="/allo-logo-black.svg"
      alt="Allo Protocol Logo"
      width={111}
      height={30}
      priority
    />

    <ConnectButton />
  </header>
);
