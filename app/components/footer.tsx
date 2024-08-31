import Image from "next/image";

export const Footer = () => (
  <footer className="mt-10 mx-4 border-t border-grey-400 pt-6 px-2">
    <Image
      className="sm:max-h-none max-h-[20px] w-auto"
      src="/allo-logo-black.svg"
      alt="Allo Protocol Logo"
      width={111}
      height={30}
    />
  </footer>
);
