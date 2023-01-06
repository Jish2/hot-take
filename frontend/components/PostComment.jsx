import React from "react";
import { Divider, Container, Icon, Text, Input } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReply } from "react-icons/bs";

export const PostComment = ({ content, time }) => {
	return (
		<>
			<Divider />
			<Container m={1} position="relative">
				<Icon
					w={3}
					h={3}
					as={BsReply}
					style={{
						position: "absolute",
						top: "20px",
						right: "16px",
					}}
				/>
				<Text fontSize="xs">{time || "10:06 am, Jan 5"}</Text>
				<Text>{content}</Text>
			</Container>
		</>
	);
};
