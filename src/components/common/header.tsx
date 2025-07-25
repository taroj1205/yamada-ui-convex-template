"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Box, Button, HStack, Loading, Text } from "@yamada-ui/react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  return (
    <Box
      alignItems="center"
      as="header"
      bg="background"
      borderBottomColor={["slate.200", "slate.800"]}
      borderBottomWidth="2px"
      display="flex"
      h="12"
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
      <HStack>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Unauthenticated>
          <Button
            as={NextLink}
            href="/signin"
            size="sm"
            type="button"
            variant="subtle"
          >
            Sign In
          </Button>
        </Unauthenticated>
        <Authenticated>
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
        </Authenticated>
      </HStack>
    </Box>
  );
};
