import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Input,
  NativeSelectRoot,
  NativeSelectField,
  SimpleGrid,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { CATEGORIES } from "../../consts/consts";
import { useGetExpenses } from "../../store";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const HomePage = () => {
  const [expense, setExpense] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [budget, setBudget] = useState<number>(3000);

  const { expenses, setExpenses } = useGetExpenses();

  useLocalStorage();

  const totalSpent = expenses.reduce((sum: number, exp) => sum + exp.amount, 0);
  const remaining = budget - totalSpent;
  const percentage: number = budget > 0 ? (totalSpent / budget) * 100 : 0;

  const addExpense = () => {
    const expenseAmount = Number(expense);

    if (expenseAmount > 0 && description && selectedCategory) {
      const newExpense = {
        id: Date.now(),
        amount: expenseAmount,
        description: description,
        date: new Date().toISOString().split("T")[0],
        category: selectedCategory,
      };
      setExpenses([newExpense, ...expenses]);
      setExpense("");
      setSelectedCategory("");
      setDescription("");
    }
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <Box minH="100vh" bg="gray.50" p={{ base: 4, md: 8 }}>
      <Box maxW="900px" mx="auto">
        <Box mb={8}>
          <Heading size="2xl" color="gray.800" mb={2}>
            💰 Smart Expense Tracker
          </Heading>
          <Text color="gray.600">Xərclərinizi ağıllı şəkildə idarə edin</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Bu ay xərc
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                {totalSpent.toFixed(2)}₼
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Aylıq büdcə
              </Text>
              <Input
                type="number"
                value={budget === 0 ? "" : budget}
                onChange={(e) => {
                  const val = e.target.value;
                  setBudget(val === "" ? 0 : Number(val));
                }}
                size="lg"
                fontSize="2xl"
                fontWeight="bold"
                color="purple.600"
                border="none"
                p={0}
                _focus={{ outline: "none" }}
              />
            </Card.Body>
          </Card.Root>

          <Card.Root bg="white" shadow="md" borderRadius="xl">
            <Card.Body p={6}>
              <Text fontSize="sm" color="gray.600" mb={2}>
                Qalan məbləğ
              </Text>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color={remaining >= 0 ? "green.600" : "red.600"}
              >
                {remaining.toFixed(2)}₼
              </Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {budget > 0 && (
          <Box bg="white" p={6} borderRadius="xl" shadow="md" mb={6}>
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Büdcə istifadəsi
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.800">
                {percentage.toFixed(0)}%
              </Text>
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
                w={`${Math.min(percentage, 100)}%`}
                bg={
                  percentage > 90
                    ? "red.500"
                    : percentage > 70
                      ? "orange.500"
                      : "green.500"
                }
                borderRadius="full"
                transition="all 0.3s"
              />
            </Box>
          </Box>
        )}

        <Card.Root bg="white" shadow="md" borderRadius="xl" mb={6}>
          <Card.Body p={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>
              ➕ Yeni Xərc Əlavə Et
            </Text>

            <VStack gap={4}>
              <HStack gap={4} w="full">
                <Input
                  placeholder="Məbləğ (50)"
                  value={expense}
                  type="number"
                  onChange={(e) => setExpense(e.target.value)}
                  size="lg"
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
                <Input
                  placeholder="Açıqlama"
                  value={description}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
              </HStack>

              <NativeSelectRoot w="full" size="lg">
                <NativeSelectField
                  value={selectedCategory}
                  placeholder="Kateqoriya seçin"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  color="gray.800"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>

              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                onClick={addExpense}
                disabled={!expense || !description || !selectedCategory}
              >
                Xərc Əlavə Et
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root bg="white" shadow="md" borderRadius="xl" mb={6}>
          <Card.Body p={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>
              📋 Son Xərclər
            </Text>

            {expenses.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">Hələ xərc əlavə edilməyib</Text>
              </Box>
            ) : (
              <VStack gap={3} align="stretch">
                {expenses.slice(0, 5).map((exp: any) => (
                  <HStack
                    key={exp.id}
                    justify="space-between"
                    p={4}
                    bg="gray.50"
                    borderRadius="lg"
                    _hover={{ bg: "gray.100" }}
                    transition="all 0.2s"
                  >
                    <Box flex={1}>
                      <Text fontWeight="semibold" color="gray.800">
                        {exp.description}
                      </Text>
                      <HStack gap={2}>
                        <Text fontSize="sm" color="blue.600">
                          {exp.category}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          • {exp.date}
                        </Text>
                      </HStack>
                    </Box>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color="red.600"
                      mr={4}
                    >
                      -{exp.amount.toFixed(2)}₼
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => removeExpense(exp.id)}
                    >
                      ❌
                    </Button>
                  </HStack>
                ))}
              </VStack>
            )}
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  );
};
