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
          About HotTake
        </Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vh",
          }}
        >
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Image

              borderRadius="full"
              boxSize={{base:"125px",sm:"150px"}}
              src="https://i.postimg.cc/52zDJrby/hottakepfp-1.png"
              alt="Dan Abramov"
            />
            <Button mt={3} colorScheme="teal" size={{base:"sm", sm:"md"}}>
              CEO @ibrahimthespy
            </Button>

          </div>

          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Image
              borderRadius="full"
              boxSize={{base:"125px",sm:"150px"}}

              src="https://i.postimg.cc/477KCk0k/josh-1.png"
              alt="Dan Abramov"
            />
            <Button mt={3} colorScheme="teal" size={{base:"sm", sm:"md"}}>
              CTO @jgoon3
            </Button>

          </div>
          
        </div>

        <Text mt={10} style={{textAlign:"center"}}>
          HotTake does NOT condone transphobia, homophobia, racism, sexism, or any bigotry.
          "Hot takes" are encouraged, but this is not inclusive of hate speech, and usage
          of hate speech will result in post removal and banishment from hottake.gg
        </Text>

        <Text mt={10} style={{textAlign:"center"}}>
          HotTake was founded in December of 2022, by founders Ibrahim Shah, and Joshua Goon.
          Ibrahim Shah attends the University of California, Irvine, while Joshua Goon attends
          the University of Illinois, Urbana Champaign, where they both study computer science.
          HotTake was created as a platform where users can create and rate other people's 
          hot takes within their college, connecting the community and providing comedic relief.
        </Text>
        
      </Container>
    </>
  );
}
