"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { handleSignOut } from "@/actions";

type UserInfoProps = {
  session: Session | null;
};

export default function UserInfo({ session }: UserInfoProps) {
  if (!session) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full mx-auto">
      <div className="flex flex-col items-center space-y-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {session.user?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {session.user?.email}
        </p>
        <form action={handleSignOut} className="w-full">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
