"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { handleSignOut } from "@/actions";
import { web3auth, decodeToken } from "@/lib/web3auth";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

type UserInfoProps = {
  session: Session | null;
};

export default function UserInfo({ session }: UserInfoProps) {
  const [provider, setProvider] = useState<any>(null);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (web3auth.status !== "connected" && !provider) {
        setIsLoading(true);
        await web3auth.init();
      }
      if (web3auth.status === "connected") {
        setIsLoading(true);
        const provider = web3auth.provider;
        setProvider(provider);
        const publicAddress = await provider?.request({
          method: "eth_accounts",
        });
        setPublicAddress(publicAddress as string);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        if (!session?.idToken) return;
        const { payload } = decodeToken(session.idToken);
        const provider = await web3auth.connect({
          verifier: "w3a-sfa-web-google",
          verifierId: (payload as any).email,
          idToken: session.idToken,
        });
        setProvider(provider);
        setIsLoading(false);
      }
    };
    init();
  }, [session, provider]);

  if (!session) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        publicAddress && (
          <div className="flex flex-col items-center space-y-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile picture"
                width={140}
                height={140}
                className="rounded-full border-4 border-blue-500"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {session.user?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {session.user?.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {publicAddress}
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
        )
      )}
    </div>
  );
}
