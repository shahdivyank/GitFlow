import Image from "next/image";
import mascot from "../../public/mascot.png";
import Protected from "@/components/Protected";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Protected>
      <div className="w-full h-screen p-8 flex items-center flex-col justify-center">
        <p className="flex items-center justify-center text-6xl font-semibold">
          GitFlow
        </p>
        <p className="flex items-center justify-center text-3xl text-center my-4">
          Centralizing Github Actions Workflows.
        </p>

        <p className="flex items-center justify-center text-xl text-center my-4">
          Avoid messy, outdated workflows. With the combination of Together AI
          and Convex, GitFlow changes the game.
        </p>

        <p className="flex items-center justify-center text-xl text-center my-4">
          Generate CI with Llama 2 to create organization wide workflows and
          install with a click of a button! Install, track, and remove workflows
          in seconds, while keeping workflows in sync.
        </p>
        <Link href="/create">
          <Button>Get Started</Button>
        </Link>
      </div>
      <Image src={mascot} className="w-1/2" />
    </Protected>
  );
}
