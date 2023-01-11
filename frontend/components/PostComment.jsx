import React from "react";
import { Divider, Container, Icon, Text, Input } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReply } from "react-icons/bs";

export const PostComment = ({ content, time }) => {
	const date = new Date(time);
	const months = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Nov",
		"Dec",
	];

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	return (
		<>
			<Divider />
			<Container m={1} position="relative">
				{/* <Icon
					w={3}
					h={3}
					as={BsReply}
					style={{
						position: "absolute",
						top: "20px",
						right: "16px",
					}}
				/> */}
				{/* 10:01 am, Jan 5 */}
				<Text fontSize="xs">{`${formatAMPM(date)}, ${
					months[date.getMonth()]
				} ${date.getDate()}`}</Text>
				<Text>{content}</Text>
			</Container>
		</>
	);
};
