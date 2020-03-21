import React, { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Checkbox,
  Box,
  Textarea,
  Link,
  Heading,
  Text,
  Code
} from "@chakra-ui/core";
import Times from "./times";
import moment from "moment-timezone";

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
  const [links, setLinks] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const data = await fetch(".netlify/functions/create", {
      method: "POST",
      body: JSON.stringify({
        name: eventName,
        startTime,
        endTime,
        timezone: moment.tz.guess(),
        eventDate,
        eventDescription,
        allDay
      })
    }).then(d => d.json());
    setIsSubmitting(false);
    setLinks(data);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl marginTop={4}>
          <FormLabel htmlFor="name">Event name</FormLabel>
          <Input
            value={eventName}
            onChange={e => setEventName(e.target.value)}
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
            onChange={e => setEventDate(e.target.value)}
            name="eventDate"
            placeholder="Event Date"
            required
          />
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel display="block">Is this event all day?</FormLabel>
          <Checkbox
            checked={allDay}
            onChange={e => setAllDay(e.target.checked)}
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
                  onChange={e => setStartTime(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>End</FormLabel>
                <Times
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </Box>
            </Flex>
          </FormControl>
        )}
        <FormControl marginTop={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            value={eventDescription}
            onChange={e => setEventDescription(e.target.value)}
            name="description"
            placeholder="Event Description"
            required
          />
        </FormControl>
        <Button
          mt={4}
          variantColor="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
      {links && (
        <Box mt={6}>
          <Heading pb={3}>Links</Heading>
          <Text>
            Short: <Code>{links.shortUrl}</Code>
          </Text>
          <Text>
            Long: <Code>{links.url}</Code>
          </Text>
        </Box>
      )}
    </>
  );
}
