import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="">
      Your name: {session?.user?.name}
    </main>
  );
}
