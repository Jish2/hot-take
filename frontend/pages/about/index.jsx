// import { HStack, Icon, Container, Heading, Image, Text, Button, Flex } from "@chakra-ui/react";
// import { AiFillFire } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { TitleBlock, ItemBlock, Spacer } from "../../components/StaticComponent";

export default function About() {
	const BACKGROUND_URL = "https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg";

	return (
		<>
			<Navbar />
			<div style={{ height: "60px" }}></div>

			{/* <div
				style={{
					height: "40vh",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BACKGROUND_URL})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<Heading size="2xl" style={{ color: "white" }} noOfLines={1}>
					About HotTake
				</Heading>
			</div> */}

			{/* <Container>
				<Text fontSize="xl" mt={5} p={5} style={{}}>
					HotTake was founded in December of 2022 by two CS students at University of California,
					Irvine and University of Illinois Urbana-Champaign. HotTake was created as a platform
					where users can create and rate other people's hot takes within their college, connecting
					the community and providing comedic relief.
				</Text>
			</Container> */}

			{/* <Flex style={{}} align="center" justify="center" direction="column" p={10}>
				<Heading style={{ textAlign: "left" }} w={"100%"}>
					About HotTake
				</Heading>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "5vh",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Image
							borderRadius="full"
							boxSize={{ base: "125px", sm: "150px" }}
							src="https://i.postimg.cc/52zDJrby/hottakepfp-1.png"
							alt="Dan Abramov"
						/>
						<Button mt={3} colorScheme="teal" size={{ base: "sm", sm: "md" }}>
							CEO @ibrahimthespy
						</Button>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Image
							borderRadius="full"
							boxSize={{ base: "125px", sm: "150px" }}
							src="https://i.postimg.cc/477KCk0k/josh-1.png"
							alt="Dan Abramov"
						/>
						<Button mt={3} colorScheme="teal" size={{ base: "sm", sm: "md" }}>
							CTO @jgoon3
						</Button>
					</div>
				</div>
				<Text mt={2} fontSize="xl" style={{}}>
					HotTake was founded in December of 2022 by two CS students at University of California,
					Irvine and University of Illinois Urbana-Champaign. HotTake was created as a platform
					where users can create and rate other people's hot takes within their college, connecting
					the community and providing comedic relief.
				</Text>

				
				{"HotTake was founded in December of 2022, by founders Ibrahim Shah, and
					Joshua Goon. Ibrahim Shah attends the University of California,
					Irvine, while Joshua Goon attends the University of Illinois, Urbana
					Champaign, where they both study computer science. HotTake was created
					as a platform where users can create and rate other people's hot takes
					within their college, connecting the community and providing comedic
					relief."}
				
				
			</Flex> */}

			<TitleBlock
				title="About HotTake"
				url="https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg"
			/>
			<ItemBlock title="Our Purpose">
				HotTake was created as a platform where users can create and rate other people's hot takes
				within their college, connecting the community and providing comedic relief. We aim to
				provide a space where unheard opinions can be shared and your anonymity is respected.
			</ItemBlock>
			<ItemBlock title="Our Founders">
				HotTake was founded in December of 2022 by two students studying Computer Science with a
				passion for Web Development. They are currently studying at University of California, Irvine
				and University of Illinois Urbana-Champaign.
			</ItemBlock>
			<Spacer size={100} />

			<Footer />
		</>
	);
}
