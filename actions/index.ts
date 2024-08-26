"use server";

import { signOut } from "@/auth";
import { web3auth } from "@/lib/web3auth";

export async function handleSignOut() {
  await signOut();
  await web3auth.logout();
}
