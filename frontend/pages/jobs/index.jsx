import { Container, Heading, Image, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { AiFillFire } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
export default function About() {
	return (
		<>
			<Navbar />
			<div style={{ height: "10vh" }}></div>
			<Container>
				<Heading mt={3} style={{ textAlign: "center" }}>
					Job Offerings
				</Heading>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "5vh",
					}}
				></div>
				<Text mt={10} style={{ textAlign: "center" }}>
					HotTake is currently looking for a CMO. The CMO will lead growth and marketing operations.
					This includes but is not limited to: social media marketing (TikTok, YouTube, Instagram),
					graphics design, campus outreach, etc.. If you feel like you are a fit, please reach out
					to @hottake.gg on Instagram, or @ibrahimthespy, or @jgoon3.
				</Text>
			</Container>
		</>
	);
}
