import {
  Box,
  Heading,
  Button,
  Text,
  Spinner,
  Flex,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useGetExpenses } from "../../store/index";
import { useAIInsights } from "../../hooks/useAiInsights";
import { COLORS } from "../../consts/consts";

export const Analytics = () => {
  const navigate = useNavigate();
  const { expenses } = useGetExpenses();
  const { insights, loading, generateInsights } = useAIInsights();

  const getCategoryData = () => {
    const categoryTotals: Record<string, number> = {};

    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const categoryData = getCategoryData();
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, purple.50)"
      p={{ base: 4, md: 8 }}
    >
      <Box maxW="1200px" mx="auto">
        <Flex align="center" justify="space-between" mb={8}>
          <Flex align="center" gap={4}>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              borderRadius="xl"
              _hover={{ bg: "white", shadow: "md" }}
            >
              <Box boxSize={5} mr={2} />
              Geri
            </Button>
            <Box>
              <Heading size="xl" color="gray.800">
                Analitika
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Xərclərinizin təhlili
              </Text>
            </Box>
          </Flex>
          <Card.Root bg="white" borderRadius="2xl" shadow="md" px={6} py={3}>
            <Flex align="center" gap={3}>
              <Box
                w={10}
                h={10}
                bgGradient="linear(to-br, teal.400, teal.600)"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box boxSize={5} color="white" />
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Cəmi Xərc
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {totalSpent.toFixed(2)}₼
                </Text>
              </Box>
            </Flex>
          </Card.Root>
        </Flex>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} mb={6}>
          <Card.Root borderRadius="2xl" shadow="lg" overflow="hidden">
            <Card.Body p={6}>
              <Flex align="center" gap={2} mb={5}>
                <Flex
                  w={10}
                  h={10}
                  bgGradient="linear(to-br, purple.400, purple.600)"
                  borderRadius="lg"
                  justify="center"
                  align="center"
                >
                  <Box boxSize={5} color="white" />
                </Flex>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    Kateqoriya Bölgüsü
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {expenses.length} xərc qeydə alınıb
                  </Text>
                </Box>
              </Flex>

              {categoryData.length === 0 ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={16}
                  color="gray.400"
                >
                  <Box boxSize={12} mb={4} opacity={0.5} />
                  <Text>Hələ xərc yoxdur</Text>
                </Flex>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(Number(percent) * 100).toFixed(0)}%`
                      }
                      outerRadius={110}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${Number(value).toFixed(2)}₼`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card.Root>

          <Card.Root borderRadius="2xl" shadow="lg" overflow="hidden">
            <Card.Body p={6}>
              <Flex align="center" gap={2} mb={5}>
                <Flex
                  w={10}
                  h={10}
                  bgGradient="linear(to-br, teal.400, teal.600)"
                  borderRadius="lg"
                  justify="center"
                  align="center"
                >
                  <Box boxSize={5} color="white" />
                </Flex>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    Xərc Müqayisəsi
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Kateqoriyalar üzrə
                  </Text>
                </Box>
              </Flex>

              {categoryData.length === 0 ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={16}
                  color="gray.400"
                >
                  <Box boxSize={12} mb={4} opacity={0.5} />
                  <Text>Hələ xərc yoxdur</Text>
                </Flex>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" tickFormatter={(v) => `${v}₼`} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => `${Number(value).toFixed(2)}₼`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="value" fill="#14B8A6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        <Card.Root borderRadius="2xl" shadow="lg" overflow="hidden">
          <Card.Body p={6}>
            <Flex align="center" gap={2} mb={5}>
              <Flex
                w={10}
                h={10}
                bgGradient="linear(to-br, violet.400, purple.600)"
                borderRadius="lg"
                justify="center"
                align="center"
              >
                <Box boxSize={5} color="white" />
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  AI Tövsiyələri
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Süni intellekt ilə maliyyə analizi
                </Text>
              </Box>
            </Flex>

            {!insights && !loading && (
              <Flex direction="column" align="center" py={8}>
                <Box boxSize={16} color="purple.200" mb={4} />
                <Text color="gray.500" mb={4} textAlign="center">
                  AI sizin xərclərinizi analiz edib tövsiyələr verəcək
                </Text>
                <Button
                  bgGradient="linear(to-r, purple.400, purple.600)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bgGradient: "linear(to-r, purple.500, purple.700)",
                  }}
                  onClick={() => generateInsights(expenses)}
                  shadow="md"
                >
                  <Box boxSize={5} mr={2} />
                  AI Analiz Et
                </Button>
              </Flex>
            )}

            {loading && (
              <Flex direction="column" align="center" py={12}>
                <Spinner size="xl" color="purple.500" borderWidth={4} mb={4} />
                <Text color="gray.600" fontWeight="medium">
                  AI analiz edir...
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Bu bir neçə saniyə çəkə bilər
                </Text>
              </Flex>
            )}

            {insights && !loading && (
              <Box>
                <Box
                  bg="purple.50"
                  p={5}
                  borderRadius="xl"
                  borderLeft="4px solid"
                  borderColor="purple.400"
                >
                  <Text
                    whiteSpace="pre-wrap"
                    lineHeight="tall"
                    color="gray.700"
                  >
                    {insights}
                  </Text>
                </Box>
                <Button
                  mt={4}
                  size="md"
                  variant="outline"
                  borderColor="purple.200"
                  color="purple.600"
                  borderRadius="xl"
                  _hover={{ bg: "purple.50" }}
                  onClick={() => generateInsights(expenses)}
                >
                  <Box boxSize={4} mr={2} />
                  Yenidən Analiz Et
                </Button>
              </Box>
            )}
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  );
};
