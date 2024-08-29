import Image from "next/image";
import { Button } from "./components/button";
import Link from "next/link";

export default function Home() {
  const Intro = () => (
    <div className="bg-allo-bg min-h-screen bg-center bg-no-repeat flex items-center justify-center py-20">
      <div className="rounded-[32px] border border-blue-800 bg-yellow-200 px-24 py-10 mx-auto max-w-6xl">
        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-8">
            <h1 className="text-blue-600 text-6xl">
              <span className="font-medium">Allo</span>{" "}
              <span className="font-light">Points</span>
            </h1>
            <h3 className="text-blue-800 text-xl">
              Short intro about what are allo points, how to get them, what they
              are useful for and that’s it. Short intro about what are allo
              points, how to get them, what they are useful for and that’s it.
              Short intro about what are allo points, how to get them, what they
              are useful for and that’s it. Short intro about what are allo
              points, how to get them, what they are useful for and that’s it.
            </h3>
            <div className="w-fit">
              <Link href="/start">
                <Button type="secondary">Launch app</Button>
              </Link>
            </div>
          </div>

          <Image
            src="/graphic.svg"
            alt="Allo Protocol Logo"
            width={343}
            height={493}
            priority
          />
        </div>
      </div>
    </div>
  );
  return (
    <main className="min-h-screen mx-2">
      <Intro />
    </main>
  );
}
