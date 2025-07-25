"use client";

import { Box, Button, HStack, Loading, Text } from "@yamada-ui/react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth/client";

export const Header = () => {
  const router = useRouter();
  return (
    <Box
      alignItems="center"
      as="header"
      bg="background"
      borderBottomColor={{ base: "slate.200", _dark: "slate.800" }}
      borderBottomWidth="2px"
      display="flex"
      justifyContent="space-between"
      pos="sticky"
      px="4"
      py="3"
      top={0}
      w="full"
      zIndex={10}
    >
      <Text
        as={NextLink}
        color="primary"
        fontSize="lg"
        fontWeight="bold"
        href="/"
      >
        Convex + Next.js + Convex Auth
      </Text>
      <HStack gap="4">
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Unauthenticated>
          <Button as={NextLink} href="/signin">
            Sign In
          </Button>
        </Unauthenticated>
        <Authenticated>
          <Button
            colorScheme="gray"
            onClick={() => {
              authClient.signOut().then(() => {
                router.push("/signin");
              });
            }}
            size="sm"
            type="button"
            variant="subtle"
          >
            Sign out
          </Button>
        </Authenticated>
      </HStack>
    </Box>
  );
};
