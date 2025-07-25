"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  ErrorMessage,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  Text,
  useDisclosure,
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { otpSignInFormSchema } from "~/schemas/auth";
import type { OtpSignInFormData } from "~/types/auth";

export function SignInForm() {
  const notice = useNotice();
  const { signIn } = useAuthActions();
  const { open, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otpError, setOtpError] = useState("");

  const form = useForm<OtpSignInFormData>({
    resolver: zodResolver(otpSignInFormSchema),
    defaultValues: { email: "" },
  });

  const handleEmailSubmit = async (data: OtpSignInFormData) => {
    setIsSubmitting(true);
    setOtpError("");
    try {
      await signIn("resend-otp", { email: data.email });
      setEmail(data.email);
      setStep("otp");
      onOpen();
      notice({
        title: "OTP sent",
        description: "Check your email for a one-time code",
        status: "success",
      });
    } catch (err) {
      notice({
        title: "Could not send OTP",
        description: (err as Error).message,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpComplete = async (otpValue: string) => {
    setIsSubmitting(true);
    setOtpError("");
    try {
      await signIn("resend-otp", { email, code: otpValue, redirectTo: "/" });
    } catch (err) {
      setOtpError((err as Error).message);
      notice({
        title: "Invalid code",
        description: (err as Error).message,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container centerContent>
      <Heading textAlign="center">Sign In</Heading>
      {step === "email" && (
        <VStack
          as="form"
          onSubmit={form.handleSubmit(handleEmailSubmit)}
          w="md"
        >
          <FormControl
            errorMessage={form.formState.errors.email?.message}
            invalid={!!form.formState.errors.email}
            label="Email"
          >
            <Input
              autoComplete="email"
              placeholder="Email"
              type="email"
              {...form.register("email")}
            />
          </FormControl>
          <Button
            colorScheme="primary"
            loading={isSubmitting}
            type="submit"
            w="full"
          >
            Send Code to Email
          </Button>
        </VStack>
      )}
      <Modal
        closeOnEsc={!isSubmitting}
        closeOnOverlay={false}
        onClose={onClose}
        open={open}
        size="lg"
      >
        <ModalOverlay />
        <ModalHeader>Enter OTP Code</ModalHeader>
        <ModalBody>
          <VStack gap="md">
            <Text>Enter the code sent to your email.</Text>
            <PinInput
              autoFocus
              disabled={isSubmitting}
              items={8}
              onChange={setCode}
              onComplete={handleOtpComplete}
              otp
              size="lg"
              value={code}
            />
            {otpError && <ErrorMessage>{otpError}</ErrorMessage>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isSubmitting} onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
