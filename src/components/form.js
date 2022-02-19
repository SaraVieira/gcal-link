import React, { useState, useEffect } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Checkbox,
  Box,
  Textarea,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import Times from "./times";

import { CopyIcon, OpenLinkIcon } from "./icons";
import { useForm } from "../store";

export default function HookForm() {
  const toast = useToast();
  const {
    allDay,
    startTime,
    endTime,
    eventName,
    eventDate,
    eventDescription,
    isSubmitting,
    links,
    setField,
    onSubmit,
  } = useForm();
  const { onCopy, hasCopied } = useClipboard(links.url);

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Copied to Clipboard",
        status: "success",
      });
    }
  }, [hasCopied]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl marginTop={4}>
          <FormLabel htmlFor="name">Event name</FormLabel>
          <Input
            value={eventName}
            onChange={(e) =>
              setField({ key: "eventName", value: e.target.value })
            }
            name="eventName"
            placeholder="Event Name"
            required
          />
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel htmlFor="name">Date</FormLabel>
          <Input
            type="date"
            value={eventDate}
            onChange={(e) =>
              setField({ key: "eventDate", value: e.target.value })
            }
            name="eventDate"
            placeholder="Event Date"
            required
          />
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel display="block">Is this event all day?</FormLabel>
          <Checkbox
            checked={allDay}
            onChange={(e) =>
              setField({ key: "allDay", value: e.target.checked })
            }
          >
            Yes, All Day
          </Checkbox>
        </FormControl>
        {!allDay && (
          <FormControl marginTop={4}>
            <FormLabel htmlFor="name">Times</FormLabel>
            <Flex>
              <Box marginRight={4}>
                <FormLabel>Start</FormLabel>
                <Times
                  value={startTime}
                  onChange={(e) =>
                    setField({ key: "startTime", value: e.target.value })
                  }
                />
              </Box>
              <Box>
                <FormLabel>End</FormLabel>
                <Times
                  value={endTime}
                  onChange={(e) =>
                    setField({ key: "endTime", value: e.target.value })
                  }
                />
              </Box>
            </Flex>
          </FormControl>
        )}
        <FormControl marginTop={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            value={eventDescription}
            onChange={(e) =>
              setField({ key: "eventDescription", value: e.target.value })
            }
            name="description"
            placeholder="Event Description"
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
      {links.url && (
        <Box mt={6}>
          <FormControl mt={2}>
            <Box position="relative">
              <Input
                style={{ paddingRight: 80 }}
                onClick={(e) => e.target.select()}
                value={links.url}
              />
              <CopyIcon
                onClick={onCopy}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  width: 26,
                  height: 26,
                  right: 10,
                  top: 8,
                }}
              />
              <a href={links.url} target="blank" rel="noreferrer">
                <OpenLinkIcon
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    width: 26,
                    height: 26,
                    right: 48,
                    top: 8,
                  }}
                />
              </a>
            </Box>
          </FormControl>
        </Box>
      )}
    </>
  );
}
