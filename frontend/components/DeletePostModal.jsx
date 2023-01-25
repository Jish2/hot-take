import {
	Button,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	ModalFooter,
	ButtonGroup,
	Spacer,
	Flex,
} from "@chakra-ui/react";

export default function DeletePostModal({ post, isOpen, onClose }) {
	function handleDelete() {
		onClose();
	}

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent style={{ margin: "0 16px 0 16px" }}>
					<ModalHeader>Deleting Post: POSTID</ModalHeader>
					<ModalCloseButton />
					<ModalBody>POST CONTENT</ModalBody>
					<ModalFooter>
						<Flex w={"100%"} gap="4px">
							<Button onClick={onClose}>Cancel</Button>
							<Spacer />
							<Button colorScheme="red" onClick={handleDelete}>
								Delete
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
