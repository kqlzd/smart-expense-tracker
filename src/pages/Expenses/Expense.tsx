import {
  Heading,
  HStack,
  Input,
  Text,
  Box,
  VStack,
  NativeSelectField,
  Button,
  NativeSelectRoot,
  Card,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetExpenses } from "../../store";

export const Expense = () => {
  const { expenses } = useGetExpenses();

  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const uniqueCategories = Array.from(new Set(expenses.map((e) => e.category)));

  const filteredExpenses = expenses.filter((item) => {
    const matchesText = text
      ? item.description.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
      : true;

    const matchesCategory = category ? item.category === category : true;

    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      if (startDate && !endDate) return item.date >= startDate;
      if (!startDate && endDate) return item.date <= endDate;
      return item.date >= startDate && item.date <= endDate;
    })();

    return matchesText && matchesCategory && matchesDate;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum: number, item) => sum + item.amount,
    0,
  );

  const handleReset = (): void => {
    setStartDate("");
    setEndDate("");
    setText("");
    setCategory("");
  };

  return (
    <Box p={8} minH="100vh" bg="gray.50">
      <Box maxW="1000px" mx="auto">
        <Box mb={8}>
          <Heading size="2xl" color="gray.800" mb={2}>
            📋 Bütün Xərclər
          </Heading>
          <Text color="gray.600">
            {expenses.length} xərc • Toplam: {totalAmount.toFixed(2)}₼
          </Text>
        </Box>

        <Card.Root bg="white" shadow="md" borderRadius="xl" mb={6}>
          <Card.Body p={6}>
            <Text fontSize="md" fontWeight="bold" color="gray.700" mb={4}>
              🔍 Filter və Axtarış
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
              <Input
                type="text"
                placeholder="Axtar (açıqlama və ya kateqoriya)"
                bg="gray.50"
                border="2px"
                borderColor="gray.300"
                value={text}
                onChange={(e) => setText(e.target.value)}
                size="lg"
                _focus={{ borderColor: "blue.500", bg: "white" }}
              />

              <NativeSelectRoot size="lg">
                <NativeSelectField
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                >
                  <option value="">Bütün kateqoriyalar</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="medium">
                  Başlanğıc tarixi
                </Text>
                <Input
                  type="date"
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  size="lg"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
              </Box>

              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="medium">
                  Bitmə tarixi
                </Text>
                <Input
                  type="date"
                  bg="gray.50"
                  border="2px"
                  borderColor="gray.300"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  size="lg"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
              </Box>

              {(startDate || endDate || text || category) && (
                <Box>
                  <Text fontSize="sm" mb={2} color="transparent">
                    .
                  </Text>
                  <Button
                    colorScheme="gray"
                    size="lg"
                    w="full"
                    onClick={handleReset}
                  >
                    🔄 Sıfırla
                  </Button>
                </Box>
              )}
            </SimpleGrid>

            {(text || category || startDate || endDate) && (
              <HStack gap={2} mt={4} flexWrap="wrap">
                <Text fontSize="sm" color="gray.600">
                  Aktiv filterlər:
                </Text>
                {text && (
                  <Badge
                    colorScheme="blue"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    Axtarış: {text}
                  </Badge>
                )}
                {category && (
                  <Badge
                    colorScheme="purple"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {category}
                  </Badge>
                )}
                {startDate && (
                  <Badge
                    colorScheme="green"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {startDate}-dən
                  </Badge>
                )}
                {endDate && (
                  <Badge
                    colorScheme="orange"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {endDate}-dək
                  </Badge>
                )}
              </HStack>
            )}
          </Card.Body>
        </Card.Root>

        {filteredExpenses.length > 0 && (
          <HStack
            justify="space-between"
            bg="blue.50"
            p={4}
            borderRadius="lg"
            mb={4}
          >
            <Text fontWeight="semibold" color="gray.700">
              {filteredExpenses.length} nəticə tapıldı
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
              Toplam: {totalAmount.toFixed(2)}₼
            </Text>
          </HStack>
        )}

        <VStack gap={3} align="stretch">
          {filteredExpenses.length === 0 ? (
            <Card.Root bg="white" shadow="md" borderRadius="xl">
              <Card.Body p={12}>
                <Box textAlign="center">
                  <Text fontSize="4xl" mb={4}>
                    🔍
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color="gray.700"
                    mb={2}
                  >
                    Nəticə tapılmadı
                  </Text>
                  <Text color="gray.500">
                    Axtarış və ya filter kriteriyalarını dəyişdirin
                  </Text>
                </Box>
              </Card.Body>
            </Card.Root>
          ) : (
            filteredExpenses.map((item) => (
              <Card.Root
                key={item.id}
                bg="white"
                shadow="sm"
                borderRadius="lg"
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Card.Body p={5}>
                  <HStack justify="space-between" align="flex-start">
                    <Box flex={1}>
                      <HStack gap={3} mb={2}>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="gray.800"
                        >
                          {item.description}
                        </Text>
                        <Badge
                          colorScheme="blue"
                          fontSize="xs"
                          borderRadius="full"
                        >
                          {item.category}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        📅 {item.date}
                      </Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="2xl" fontWeight="bold" color="red.600">
                        -{item.amount.toFixed(2)}₼
                      </Text>
                    </Box>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))
          )}
        </VStack>
      </Box>
    </Box>
  );
};
