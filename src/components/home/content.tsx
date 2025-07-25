"use client";

import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useMutation, useQuery } from "convex/react";
import { ResourceCard } from "~/components/common/resource-card";
import { api } from "~/convex/_generated/api";

export const Content = () => {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <Box mx="auto">
        <Text>loading... (consider a loading skeleton)</Text>
      </Box>
    );
  }

  return (
    <Container centerContent>
      <Text>Welcome {viewer ?? "Anonymous"}!</Text>
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
      <Divider />
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
