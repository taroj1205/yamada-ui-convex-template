"use client";

import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Code,
  Container,
  HStack,
  Link,
  Separator,
  Text,
  VStack,
} from "@yamada-ui/react";
import { ResourceCard } from "~/components/common/resource-card";
import { api } from "~/convex/_generated/api";

export const Content = () => {
  const { data } = useQuery(
    convexQuery(api.functions.counter.listNumbers, {
      count: 10,
    })
  );
  const numbers = data?.numbers ?? [];
  const { mutate: addNumber, error: addNumberError } = useMutation({
    mutationFn: useConvexMutation(api.functions.counter.addNumber),
  });

  const { data: session, isPending } = useQuery(
    convexQuery(api.functions.auth.currentUser, {})
  );

  if (isPending || numbers === undefined) {
    return (
      <Box mx="auto">
        <Text>loading... (consider a loading skeleton)</Text>
      </Box>
    );
  }

  return (
    <Container centerContent>
      <Text>Welcome {session?.name ?? "Anonymous"}!</Text>
      <Text>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </Text>
      <Button
        colorScheme="primary"
        onClick={() => {
          addNumber({ value: Math.floor(Math.random() * 10) });
        }}
        size="md"
        type="button"
        variant="solid"
      >
        Add a random number
      </Button>
      <Text>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </Text>
      {addNumberError && (
        <Text color={["danger.500", "danger.400"]}>
          Error: {addNumberError.message}
        </Text>
      )}
      <Text>
        Edit <Code fontWeight="bold">convex/myFunctions.ts</Code> to change your
        backend
      </Text>
      <Text>
        Edit <Code fontWeight="bold">app/page.tsx</Code> to change your frontend
      </Text>
      <Text>
        See the{" "}
        <Link colorScheme="primary" href="/server" variant="link">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </Text>
      <Separator />
      <VStack>
        <Text fontSize="lg" fontWeight="bold">
          Useful resources:
        </Text>
        <HStack>
          <VStack flex={1}>
            <ResourceCard
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
              title="Convex docs"
            />
            <ResourceCard
              description="Learn about best practices, use cases, and more from a growing collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
              title="Stack articles"
            />
          </VStack>
          <VStack flex={1}>
            <ResourceCard
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
              title="Templates"
            />
            <ResourceCard
              description="Join our developer community to ask questions, trade tips & tricks, and show off your projects."
              href="https://www.convex.dev/community"
              title="Discord"
            />
          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};
