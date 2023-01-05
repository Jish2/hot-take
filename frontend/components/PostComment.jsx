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
				<Text fontSize="xs">9:54 am, Jan 4</Text>
				<Text>{content}</Text>
			</Container>
		</>
	);
};
