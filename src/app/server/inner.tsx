"use client";

import { Button, Code, Container, Heading, Text } from "@yamada-ui/react";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

export default function Home({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.functions.counter.listNumbers>;
}) {
  const data = usePreloadedQuery(preloaded);
  const addNumber = useMutation(api.functions.counter.addNumber);
  return (
    <Container centerContent>
      <Heading as="h2" size="xl">
        Reactive client-loaded data
      </Heading>
      <Code w="full">
        <Text as="pre">{JSON.stringify(data, null, 2)}</Text>
      </Code>
      <Button
        onClick={() => {
          addNumber({ value: Math.floor(Math.random() * 10) });
        }}
      >
        Add a random number
      </Button>
    </Container>
  );
}
