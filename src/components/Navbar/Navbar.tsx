import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box bg={"white"} height={"auto"} p={5}>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Link to="/">
          <Text fontWeight="bold">💰 Tracker</Text>
        </Link>
        <Link to="/expenses">
          <Text>Xərclər</Text>
        </Link>
        <Link to="/analytics">
          <Text>Analitika</Text>
        </Link>
        <Link to="/stats">
          <Text>Statistika</Text>
        </Link>
        <Link to="/csv">
          <Text>CSV Export</Text>
        </Link>
      </Flex>
    </Box>
  );
};
