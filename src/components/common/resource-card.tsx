"use client";

import { Card, Text, VStack } from "@yamada-ui/react";

export type ResourceCardProps = {
  title: string;
  description: string;
  href: string;
};

export const ResourceCard = ({
  title,
  description,
  href,
}: ResourceCardProps) => {
  return (
    <Card
      _hover={{ boxShadow: "lg" }}
      as="a"
      h="28"
      href={href}
      overflowY="auto"
      p="4"
      variant="elevated"
    >
      <VStack align="start">
        <Text as="span" color="primary.600" fontSize="md" fontWeight="semibold">
          {title}
        </Text>
        <Text as="span" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </Card>
  );
};
