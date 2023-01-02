import { React, useState, useRef } from "react";
// prettier-ignore
import { Button, Textarea, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent } from "@chakra-ui/react";
import axios, { isCancel, AxiosError } from "axios";

export default function UploadHotTake({ isOpen, onClose }) {
	const handlePostSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/post", {
				title: input.current.value,
			})
			.then(function (response) {
				location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
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
							<Button colorScheme="blue" type="submit">
								Post to UCI
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}
