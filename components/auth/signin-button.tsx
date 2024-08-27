import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="flex justify-center items-center h-32 mt-16"
    >
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-md text-lg hover:bg-blue-600 transition-colors"
      >
        Sign in with Google
      </button>
    </form>
  );
}
