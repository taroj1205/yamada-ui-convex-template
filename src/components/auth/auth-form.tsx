"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  FormControl,
  Input,
  PasswordInput,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type AuthFormData, authFormSchema } from "./types";

export function AuthForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setError(null);
    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("password", data.password);
    formData.set("flow", flow);
    try {
      await signIn("password", formData);
      router.push("/");
    } catch (err) {
      setError(
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message)
          : "Authentication failed"
      );
      setFormError("email", { message: " " });
      setFormError("password", { message: " " });
    }
  };

  return (
    <Container centerContent>
      <Text fontSize="xl" fontWeight="semibold" w="fit-content">
        {flow === "signIn" ? "Sign in to your account" : "Create a new account"}
      </Text>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} w="96">
        <FormControl
          errorMessage={errors.email?.message}
          invalid={!!errors.email}
          label="Email"
        >
          <Input
            autoComplete="email"
            placeholder="Email"
            type="email"
            {...register("email")}
          />
        </FormControl>
        <FormControl
          errorMessage={errors.password?.message}
          invalid={!!errors.password}
          label="Password"
        >
          <PasswordInput
            autoComplete={
              flow === "signUp" ? "new-password" : "current-password"
            }
            placeholder="Password"
            {...register("password")}
          />
        </FormControl>
        {error && (
          <Text
            color="danger.500"
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
          >
            {error}
          </Text>
        )}
        <Button
          colorScheme="primary"
          isLoading={isSubmitting}
          type="submit"
          w="full"
        >
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </Button>
        <VStack align="center" w="full">
          <Text fontSize="sm">
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>
          <Button
            alignSelf="center"
            colorScheme="primary"
            fontSize="sm"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setFlow(flow === "signIn" ? "signUp" : "signIn");
              }
            }}
            type="button"
            variant="link"
            w="fit-content"
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
