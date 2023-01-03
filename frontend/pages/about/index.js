import React from "react";
import { Container, Heading, Image, Text } from "@chakra-ui/react";

import WithSubnavigation from "../../components/ChakraNavbar";
export default function About() {
  return (
    <>
      <WithSubnavigation />
      <div style={{ height: "10vh" }}></div>
      <Container>
        <Heading mt={3} style={{ textAlign: "center" }}>
          About HotTake
        </Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vh",
          }}
        >
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://i.postimg.cc/52zDJrby/hottakepfp-1.png"
            alt="Dan Abramov"
          />
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://i.postimg.cc/477KCk0k/josh-1.png"
            alt="Dan Abramov"
          />
        </div>
        <Text mt={10} style={{textAlign:"center"}}>
          HotTake was founded in December of 2022, by founders Ibrahim Shah, and Joshua Goon.
          Ibrahim Shah attends the University of California, Irvine, while Joshua Goon attends
          the University of Illinois, Urbana Champaign, where they both study computer science.
          HotTake was created because both Josh and Ibrahim realized that lots of people have
          funny and controversial opinions, but there is no social media platform that focuses
          on giving each of these opinions a full screen spotlight, and in a fun, scrollable, and
          addictive manner.
        </Text>
      </Container>
    </>
  );
}
