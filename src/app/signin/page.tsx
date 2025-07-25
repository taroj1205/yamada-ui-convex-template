import { VStack } from "@yamada-ui/react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignInForm = dynamic(() =>
  import("~/components/auth").then((m) => m.SignInForm)
);

export default function SignInPage() {
  return (
    <VStack as="main">
      <SignInForm />
    </VStack>
  );
}
