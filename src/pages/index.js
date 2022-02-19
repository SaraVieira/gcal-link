import React from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Link,
  DarkMode,
} from "@chakra-ui/react";
import Form from "../components/form";
import { Logo, GHIcon } from "../components/icons";

const IndexPage = () => {
  return (
    <DarkMode>
      <Box maxWidth="80%" width="1200" margin="auto" p={5} pb={10}>
        <Flex justifyContent="space-between">
          <Heading size="md" mb={5}>
            <Logo width={50} height={50} />
          </Heading>
          <Box>
            <Button variant="ghost">
              <Link href="https://github.com/SaraVieira/gcal-link">
                <GHIcon width={22} height={22} />
              </Link>
            </Button>
          </Box>
        </Flex>
        <Text>Create Google Calendar Links to share with anyone</Text>
        <Form />
      </Box>
    </DarkMode>
  );
};

export default IndexPage;
