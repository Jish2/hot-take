import { React, useState, useRef } from "react";
// prettier-ignore
import { Button, Textarea, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent } from "@chakra-ui/react";
import axios, { isCancel, AxiosError } from "axios";

import { useErrorToast } from "../hooks/useErrorToast";

export function CreatePostModal({ isOpen, onClose }) {
	const { addToast } = useErrorToast();
	const [isCreateLoading, setIsCreateLoading] = useState(false);

	const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hottake.gg";
	// ref for input
	const input = useRef(null);

	const handlePostSubmit = (e) => {
		e.preventDefault();
		setIsCreateLoading(true);
		axios
			.post(`${API_URL}/post`, {
				title: input.current.value,
			})
			.then(function (response) {
				// reload to refetch
				// TODO: Change this to redirect to hottake.gg/post_id
				setIsCreateLoading(false);
				window.location.reload(true);
			})
			.catch(function (error) {
				// implement error state
				console.error(error);
				addToast(error.response.data || error.message);
				setIsCreateLoading(false);
			});
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
				<ModalOverlay />
				<ModalContent style={{ width: "90%" }}>
					<ModalHeader>Share a hot take!</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handlePostSubmit}>
						<ModalBody>
							<Textarea ref={input} placeholder="Share a hot take of up to 140 characters!" />
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="teal" type="submit" disabled={isCreateLoading}>
								Post to UCI
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}
