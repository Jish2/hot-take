import { React, useState, useRef } from "react";
// prettier-ignore
import { Button, Textarea, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent } from "@chakra-ui/react";
import axios, { isCancel, AxiosError } from "axios";

export function CreatePost({ isOpen, onClose }) {
	const API_URL = process.env.API_URL || "https://api.hottake.gg";
	const handlePostSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${API_URL}/post`, {
				title: input.current.value,
			})
			.then(function (response) {
				//window.location = window.location

				window.location.reload(true);
			})
			.catch(function (error) {
				console.log(error);
			});
		//window.location.href = window.location.href
	};
	const input = useRef(null);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
				<ModalOverlay />
				<ModalContent style={{ width: "90%" }}>
					<ModalHeader>Share a hot take of up to 140 words!</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handlePostSubmit}>
						<ModalBody>
							<Textarea ref={input} placeholder="Share your hot take" />
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="teal" type="submit">
								Post to UCI
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}
