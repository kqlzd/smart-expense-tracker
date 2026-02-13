import { Box, Card, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import { useGetExpenses } from "../../store";

interface StatCardProps {
  title: string;
  value: string;
  emoji: string;
  color: string;
}

const StatCard = ({ title, value, emoji, color }: StatCardProps) => (
  <Card.Root
    overflow="hidden"
    transition="all 0.3s ease"
    _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
    borderRadius="xl"
    bg="white"
    shadow="md"
    borderTop="4px"
    borderColor={color}
  >
    <Card.Body p={6}>
      <HStack justify="space-between" mb={3}>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {title}
        </Text>
        <Text fontSize="3xl">{emoji}</Text>
      </HStack>
      <Text fontSize="3xl" fontWeight="bold" color={color}>
        {value}
      </Text>
    </Card.Body>
  </Card.Root>
);

export const StatsCards = () => {
  const { expenses } = useGetExpenses();

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const avgExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;
  const maxExpense =
    expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;
  const minExpense =
    expenses.length > 0 ? Math.min(...expenses.map((e) => e.amount)) : 0;

  const categoryTotals: Record<string, number> = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const topCategoryName = topCategory ? topCategory[0] : "Yoxdur";

  const stats = [
    {
      title: "Ümumi Xərc",
      value: `${totalSpent.toFixed(2)}₼`,
      emoji: "💰",
      color: "blue.500",
    },
    {
      title: "Ən Böyük Xərc",
      value: `${maxExpense.toFixed(2)}₼`,
      emoji: "📈",
      color: "red.500",
    },
    {
      title: "Ortalama Xərc",
      value: `${avgExpense.toFixed(2)}₼`,
      emoji: "📊",
      color: "purple.500",
    },
    {
      title: "Ən Kiçik Xərc",
      value: `${minExpense.toFixed(2)}₼`,
      emoji: "📉",
      color: "green.500",
    },
    {
      title: "Ən Çox Xərclədiyin",
      value: topCategoryName,
      emoji: "🏆",
      color: "orange.500",
    },
    {
      title: "Xərc Sayı",
      value: `${expenses.length} ədəd`,
      emoji: "📋",
      color: "teal.500",
    },
  ];

  return (
    <Box mb={8}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={6}>
        📊 Statistika
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            emoji={stat.emoji}
            color={stat.color}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
