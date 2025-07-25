import { VStack } from "@yamada-ui/react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const AuthForm = dynamic(() =>
  import("~/components/auth").then((m) => m.AuthForm)
);

export default function SignInPage() {
  return (
    <VStack as="main">
      <AuthForm />
    </VStack>
  );
}
