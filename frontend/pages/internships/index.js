import React from "react";
import { Container, Heading, Image, Text,Button, HStack, Icon } from "@chakra-ui/react";
import { AiFillFire } from "react-icons/ai";

import WithSubnavigation from "../../components/ChakraNavbar";
export default function About() {
  return (
    <>
      <WithSubnavigation />
      <div style={{ height: "10vh" }}></div>
      <Container>
        <Heading mt={3} style={{ textAlign: "center" }}>
          Internship Offerings
        </Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vh",
          }}
        >
         
          
        </div>
        <Text mt={10} style={{textAlign:"center"}}>
          We are currently in the R&D stage of HotTake, with an MVP created.
          If you have full stack development skills, with MongoDB, Express, Node.js
          , React.js, feel free to reach out for a software engineering internship
          by contacting @hottake.gg on Instagram, or @ibrahimthespy or @jgoon3.

          If you feel like you have lots of skills in marketing, please refer to our jobs section
          as there is a CMO position available.
        </Text>
        
      </Container>
    </>
  );
}
