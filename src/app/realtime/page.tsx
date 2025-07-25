"use client";
import { Button, Container, Text } from "@yamada-ui/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

export default function RealtimePage() {
  const numbers = useQuery(api.functions.counter.listNumbers, {
    count: 10,
  });
  const addNumber = useMutation(api.functions.counter.addNumber);
  return (
    <Container centerContent maxW="xl">
      <Text>Numbers: {numbers?.numbers.join(", ")}</Text>
      <Button
        onClick={() => addNumber({ value: Math.floor(Math.random() * 10) })}
      >
        Add a random number
      </Button>
    </Container>
  );
}
