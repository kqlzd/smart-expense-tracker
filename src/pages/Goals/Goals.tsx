import {
  Button,
  Box,
  NativeSelectField,
  NativeSelectRoot,
  Input,
  Text,
  VStack,
  HStack,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { CATEGORIES } from "../../consts/consts";
import { useGetExpenses } from "../../store";

export const Goals = () => {
  const { goals, setGoals, expenses } = useGetExpenses();
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const currentMonth = new Date().toISOString().slice(0, 7);

  const getSpent = (cat: string) =>
    expenses
      .filter((e) => e.category === cat && e.date.startsWith(currentMonth))
      .reduce((sum, e) => sum + e.amount, 0);

  const addGoal = () => {
    if (!category || !limit) return;
    const newGoal = { id: Date.now(), category, limit: Number(limit) };
    setGoals([...goals, newGoal]);
    setCategory("");
    
    setLimit("");
  };

  const removeGoal = (id: number) =>
    setGoals(goals.filter((g: any) => g.id !== id));

  return (
    <Box p={8} minH="100vh" bg="gray.50">
      <Box maxW="700px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          🎯 Xərc Hədəfləri
        </Text>


        <Card.Root bg="white" shadow="md" borderRadius="xl" mb={6}>
          <Card.Body p={6}>
            <VStack gap={4}>
              <NativeSelectRoot size="lg" w="full">
                <NativeSelectField
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                >
                  <option value="">Kateqoriya seçin</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>

              <Input
                type="number"
                placeholder="Limit (₼)"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                size="lg"
                bg="gray.50"
                border="2px"
                borderColor="gray.300"
              />

              <Button
                w="full"
                size="lg"
                colorScheme="teal"
                onClick={addGoal}
                disabled={!category || !limit}
              >
                Hədəf Əlavə Et
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>

        <VStack gap={4}>
          {goals.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={8}>
              Hələ hədəf yoxdur
            </Text>
          ) : (
            goals.map((goal: any) => {
              const spent = getSpent(goal.category);
              const percent = Math.min((spent / goal.limit) * 100, 100);
              const isOver = spent > goal.limit;

              return (
                <Card.Root
                  key={goal.id}
                  bg="white"
                  shadow="md"
                  borderRadius="xl"
                  w="full"
                >
                  <Card.Body p={6}>
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="bold" fontSize="lg">
                        {goal.category}
                      </Text>
                      <HStack>
                        <Text
                          color={isOver ? "red.500" : "gray.600"}
                          fontWeight="semibold"
                        >
                          {spent.toFixed(2)}₼ / {goal.limit}₼
                        </Text>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeGoal(goal.id)}
                        >
                          ❌
                        </Button>
                      </HStack>
                    </HStack>

                    <Box
                      w="full"
                      h={3}
                      bg="gray.200"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        h="100%"
                        w={`${percent}%`}
                        bg={
                          isOver
                            ? "red.500"
                            : percent > 70
                              ? "orange.400"
                              : "teal.400"
                        }
                        borderRadius="full"
                        transition="all 0.3s"
                      />
                    </Box>

                    <Text
                      fontSize="sm"
                      color={isOver ? "red.500" : "gray.500"}
                      mt={2}
                    >
                      {isOver
                        ? `⚠️ Limiti ${(spent - goal.limit).toFixed(2)}₼ keçdin!`
                        : `✅ ${(goal.limit - spent).toFixed(2)}₼ qalıb`}
                    </Text>
                  </Card.Body>
                </Card.Root>
              );
            })
          )}
        </VStack>
      </Box>
    </Box>
  );
};
