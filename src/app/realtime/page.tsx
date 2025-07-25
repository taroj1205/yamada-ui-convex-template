"use client";
import { BarChart, LineChart } from "@yamada-ui/charts";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

export default function RealtimePage() {
  const chartData = useQuery(api.functions.chartData.getChartData, {
    limit: 15,
  });

  const lineChartData =
    chartData?.lineData.map(
      (item: { name: string; value: number; timestamp: number }) => ({
        name: item.name,
        value: item.value,
      })
    ) ?? [];

  const barChartData =
    chartData?.barData.map(
      (item: { name: string; value: number; category: string }) => ({
        name: item.name,
        [item.category]: item.value,
      })
    ) ?? [];

  return (
    <Container centerContent maxW="6xl" py="lg">
      <VStack gap="lg" w="full">
        <Heading size="xl" textAlign="center">
          Real-time Chart Dashboard
        </Heading>

        <HStack flexWrap="wrap" gap="lg" w="full">
          <Card flex="1" minW="md">
            <CardBody>
              <VStack gap="md">
                <Heading size="md">Line Chart - Time Series Data</Heading>
                <Box h="300px" w="full">
                  <LineChart
                    data={lineChartData}
                    dataKey="name"
                    h="full"
                    lineProps={{ isAnimationActive: true }}
                    series={[{ dataKey: "value", color: "blue.500" }]}
                    w="full"
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card flex="1" minW="md">
            <CardBody>
              <VStack gap="md">
                <Heading size="md">Bar Chart - Category Data</Heading>
                <Box h="300px" w="full">
                  <BarChart
                    barProps={{ isAnimationActive: true }}
                    data={barChartData}
                    dataKey="name"
                    h="full"
                    series={[
                      { dataKey: "Sales", color: "green.500" },
                      { dataKey: "Revenue", color: "blue.500" },
                      { dataKey: "Users", color: "purple.500" },
                      { dataKey: "Growth", color: "orange.500" },
                    ]}
                    w="full"
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </HStack>

        <Card w="full">
          <CardBody>
            <VStack gap="md">
              <Heading size="md">Real-time Data</Heading>
              <Text color="muted">
                Data is automatically generated every minute via Convex cron
                job. Charts update in real-time as new data points are added.
              </Text>
              <Text color="muted" fontSize="sm">
                Current data points: {chartData?.lineData.length ?? 0}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}
