import React from "react";
import { Container, Heading, Text, Icon } from "@chakra-ui/react";
import {
  Button,
  Stack,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ChatIcon, PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { AiFillFire } from "react-icons/ai";
import { TbAd2 } from "react-icons/tb";

import { Navbar } from "../../components/Navbar";
export default function About() {
  return (
    <>
      <Navbar />
      <div style={{ height: "60px" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card w="90%" maxW="400px" mt="20px">
          <CardBody>
            <Heading size="3xl">UCI</Heading>

            <Text mt="15px">Everything hot about the anteaters</Text>
            <Stack divider={<StackDivider />} spacing="4">
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button borderRadius={20} style={{ width: "112px" }}>
                  813 <Icon as={AiFillFire} ml={1} />
                </Button>
                <Button borderRadius={20} style={{ width: "112px" }}>
                  212 <Icon as={TbAd2} ml={1} />
                </Button>
                <Button borderRadius={20} style={{ width: "112px" }}>
                  1.2k
                  <ChatIcon ml={2} />
                </Button>
              </div>

              <Button colorScheme="teal">Join UCI</Button>
            </Stack>
          </CardBody>
        </Card>

		<Card w="90%" maxW="400px" mt="50px">
          <CardBody>
            <Heading size="3xl">UIUC</Heading>

            <Text mt="15px">What are the illini fighting for?</Text>
            <Stack divider={<StackDivider />} spacing="4">
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button borderRadius={20} style={{ width: "112px" }}>
                  253 <Icon as={AiFillFire} ml={1} />
                </Button>
                <Button borderRadius={20} style={{ width: "112px" }}>
                  282 <Icon as={TbAd2} ml={1} />
                </Button>
                <Button borderRadius={20} style={{ width: "112px" }}>
                  989
                  <ChatIcon ml={2} />
                </Button>
              </div>

              <Button colorScheme="orange">Join UCI</Button>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
