import React from "react";
//prettier-ignore
import { Stack, Heading, Divider, ButtonGroup, Button, Image, Text, Card, CardHeader, CardBody, CardFooter, HStack, Tooltip, Center, Flex, Box, Spacer } from "@chakra-ui/react";
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill, BsExclamationTriangle } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";

export default function HotTakeCard({ title }) {
	const handleAgreeClick = () => {};

	const handleDisagreeClick = () => {};

	return (
		<div
			style={{
				scrollSnapAlign: "center",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card variant="outline">
				<Tooltip label="Report this post">
					<Button
						color="gray.300"
						variant="ghost"
						style={{
							minWidth: "20px",
							height: "20px",
							position: "absolute",
							top: "20px",
							right: "20px",
							padding: "0",
						}}
						_hover={{ bg: "none", color: "var(--chakra-colors-gray-500)" }}
						_active={{
							bg: "none",
							transform: "scale(.9)",
						}}
					>
						<BsExclamationTriangle
							style={{
								width: "20px",
								height: "20px",
							}}
						/>
					</Button>
				</Tooltip>
				<CardBody>
					<Stack mt="6" spacing="3">
						<Heading size="lg">{title}</Heading>
					</Stack>
				</CardBody>
				{/* <Divider /> */}
				<CardFooter>
					<Flex style={{ width: "100%" }} gap="6px">
						<Button
							width="125px"
							leftIcon={<BsFillHandThumbsUpFill />}
							variant="outline"
							colorScheme="teal"
							color="#319795"
						>
							Agree
						</Button>
						<Spacer />
						<Button leftIcon={<AiOutlineFire />} disabled variant="outline" color="black" colorScheme="gray">
							1.0k
						</Button>
						<Spacer />
						<Button
							width="125px"
							rightIcon={<BsFillHandThumbsDownFill />}
							variant="outline"
							colorScheme="red"
							color="#ff5242"
						>
							Disagree
						</Button>
					</Flex>
				</CardFooter>
			</Card>
		</div>
	);
}
