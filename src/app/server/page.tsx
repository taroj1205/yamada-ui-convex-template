import { Code, Container, Heading, Text, VStack } from "@yamada-ui/react";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import Home from "./inner";

export default async function ServerPage() {
  const preloaded = await preloadQuery(api.functions.counter.listNumbers, {
    count: 3,
  });

  const data = preloadedQueryResult(preloaded);

  return (
    <VStack>
      <Container centerContent>
        <Heading as="h1" size="2xl" textAlign="center">
          Convex + Next.js
        </Heading>
        <Heading as="h2" size="xl">
          Non-reactive server-loaded data
        </Heading>
        <Code w="full">
          <Text as="pre">{JSON.stringify(data, null, 2)}</Text>
        </Code>
      </Container>
      <Home preloaded={preloaded} />
    </VStack>
  );
}
