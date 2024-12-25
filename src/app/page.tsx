import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { SessionSettings } from "./_components/input/SessionSettings";
// import { TimerDisplay } from "./_components/TimerDisplay";
import Timer from "./_components/Timer";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"> */}
        <Timer />
        {/* </div> */}
        <SessionSettings />
        {/* <TimerDisplay /> */}
      </main>
    </HydrateClient>
  );
}
