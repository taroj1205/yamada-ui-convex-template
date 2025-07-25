"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@yamada-ui/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Button
      colorScheme="gray"
      onClick={() => {
        signOut().then(() => {
          router.push("/signin");
        });
      }}
      size="sm"
      type="button"
      variant="subtle"
    >
      Sign out
    </Button>
  );
};
