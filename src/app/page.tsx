import { Heading, VStack } from "@yamada-ui/react";
import { Content } from "~/components/home/content";

export default function Home() {
  return (
    <VStack as="main">
      <VStack w="full">
        <Heading as="h1" size="2xl" textAlign="center">
          Convex + Next.js + Convex Auth
        </Heading>
        <Content />
      </VStack>
    </VStack>
  );
}
