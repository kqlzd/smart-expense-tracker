import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../consts/consts";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        py={4}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <HStack gap={2}>
            <Text fontSize="xl">💰</Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Expense
              <Text as="span" color="teal.500">
                Tracker
              </Text>
            </Text>
          </HStack>
        </Link>

        <HStack gap={1}>
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <Box
                  px={4}
                  py={2}
                  borderRadius="lg"
                  fontWeight={isActive ? "bold" : "medium"}
                  fontSize="sm"
                  color={isActive ? "teal.600" : "gray.600"}
                  bg={isActive ? "teal.50" : "transparent"}
                  borderBottom={
                    isActive ? "2px solid" : "2px solid transparent"
                  }
                  borderColor={isActive ? "teal.500" : "transparent"}
                  _hover={{ bg: "gray.100", color: "gray.800" }}
                  transition="all 0.2s"
                >
                  {item.emoji} {item.label}
                </Box>
              </Link>
            );
          })}
        </HStack>
      </Flex>
    </Box>
  );
};
