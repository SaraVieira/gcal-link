import React from "react";
import {
  Box,
  Button,
  Heading,
  useColorMode,
  Flex,
  Text
} from "@chakra-ui/core";
import { Helmet } from "react-helmet";
import Form from "../components/Form";
import { MoonIcon, SunIcon, Logo } from "../components/icons";

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Google Calendar Link Generator</title>
        <meta
          name="description"
          content="Easily generate sharable google calendar links"
        />
      </Helmet>
      <Box maxWidth="80%" width="1200" margin="auto" p={5}>
        <Flex justifyContent="space-between">
          <Heading size="md" mb={5}>
            <Logo width={50} height={50} />
          </Heading>
          <Box>
            <Button variant="ghost" onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <SunIcon width={26} height={26} />
              ) : (
                <MoonIcon width={26} height={26} />
              )}
            </Button>
          </Box>
        </Flex>
        <Text>
          Create Google Calendar Links to share with anyone and also get a
          shorter link
        </Text>
        <Form />
      </Box>
    </>
  );
};

export default IndexPage;
