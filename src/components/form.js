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
  Heading,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import Times from "./times";
import moment from "moment-timezone";
import { CopyIcon } from "./icons";

export default function HookForm() {
  const now =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState("1200");
  const [endTime, setEndTime] = useState("1300");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(now);
  const [eventDescription, setEventDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [links, setLinks] = useState({});
  const { onCopy: onCopyShort, hasCopied: hasCopiedShort } = useClipboard(
    links.shortUrl
  );
  const { onCopy: onCopyLong, hasCopied: hasCopiedLong } = useClipboard(
    links.url
  );
  const toast = useToast();

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const data = await fetch("api/create", {
      method: "POST",
      body: JSON.stringify({
        name: eventName,
        startTime,
        endTime,
        timezone: moment.tz.guess(),
        eventDate,
        eventDescription,
        allDay,
      }),
    }).then((d) => d.json());
    setIsSubmitting(false);
    setLinks(data);
  }

  useEffect(() => {
    if (hasCopiedShort || hasCopiedLong) {
      toast({
        title: "Copied to Clipboard",
        status: "success",
      });
    }
  }, [hasCopiedShort, hasCopiedLong]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl marginTop={4}>
          <FormLabel htmlFor="name">Event name</FormLabel>
          <Input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
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
            onChange={(e) => setEventDate(e.target.value)}
            name="eventDate"
            placeholder="Event Date"
            required
          />
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel display="block">Is this event all day?</FormLabel>
          <Checkbox
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
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
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>End</FormLabel>
                <Times
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Box>
            </Flex>
          </FormControl>
        )}
        <FormControl marginTop={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
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
                paddingRight={46}
                onClick={(e) => e.target.select()}
                value={links.url}
              />
              <CopyIcon
                onClick={onCopyLong}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  width: 26,
                  height: 26,
                  right: 10,
                  top: 8,
                }}
              />
            </Box>
          </FormControl>
        </Box>
      )}
    </>
  );
}
