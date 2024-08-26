import SignIn from "@/components/SignIn";
import UserInfo from "@/components/UserInfo";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  // console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {!session ? <SignIn /> : <UserInfo session={session} />}
    </main>
  );
}
