import React from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Link,
  DarkMode
} from "@chakra-ui/core";
import { Helmet } from "react-helmet";
import Form from "../components/form";
import { Logo, GHIcon } from "../components/icons";

const IndexPage = () => {
  if (typeof window === "undefined") return null;
  return (
    <DarkMode>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Google Calendar Link Generator</title>
        <meta
          name="description"
          content="Easily generate sharable google calendar links"
        />
      </Helmet>
      <Box maxWidth="80%" width="1200" margin="auto" p={5} pb={10}>
        <Flex justifyContent="space-between">
          <Heading size="md" mb={5}>
            <Logo width={50} height={50} />
          </Heading>
          <Box>
            <Button variant="ghost">
              <Link to="https://github.com/SaraVieira/gcal-link">
                <GHIcon width={22} height={22} />
              </Link>
            </Button>
          </Box>
        </Flex>
        <Text>
          Create Google Calendar Links to share with anyone and also get a
          shorter link
        </Text>
        <Form />
      </Box>
    </DarkMode>
  );
};

export default IndexPage;
