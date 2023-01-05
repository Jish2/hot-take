import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import { AiFillFire } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
export default function About() {
	return (
		<>
			<Navbar />
			<div style={{ height: "10vh" }}></div>
			<Container>
				<Heading mt={3} style={{ textAlign: "center" }}>
					Active Communities
				</Heading>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "5vh",
					}}
				></div>
				<Text mt={10} style={{ textAlign: "center" }}>
					HotTake is currently being beta tested across University of
					California, Irvine, as well as University of Illinois, Urbana
					Champaign. It will be tested across these campuses, as well as within
					specific classes; for example, your intro CS101 class may have a
					HotTake, where that HotTakes only contain posts made by people in
					CS101.
				</Text>
			</Container>
		</>
	);
}
