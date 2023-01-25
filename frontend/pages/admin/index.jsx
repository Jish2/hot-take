import { useState, useEffect, useRef } from "react";
import {
	Text,
	InputGroup,
	Stack,
	Card,
	CardHeader,
	CardBody,
	InputRightElement,
	Container,
	Spacer,
	Button,
	Flex,
	Heading,
	Input,
	ButtonGroup,
	Icon,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillDelete, AiOutlineWarning } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
import { useErrorToast } from "../../hooks/useErrorToast";
import Cookies from "js-cookie";
import DeletePostModal from "../../components/DeletePostModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hottake.gg";

function Dashboard({ setLoggedIn }) {
	let arr = new Array(10).fill("Sample post content...");

	const [results, setResults] = useState(arr);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedPost, setSelectedPost] = useState();

	function handleLogout() {
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	function resetCookies() {
		Cookies.remove("adminUsername");
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	function loadMorePosts() {
		// append to end of posts
		setResults((p) => [...p, ...arr]);
	}

	function fetchPosts() {}

	useEffect(() => {}, []);

	return (
		<>
			<DeletePostModal id={"1"} isOpen={isOpen} onClose={onClose} />

			<Flex
				justify="center"
				align="center"
				direction="column"
				p={0}
				style={{ height: "100vh", width: "100vw" }}
			>
				<div style={{ width: "50px", minHeight: "60px", maxHeight: "60px" }}></div>
				<Flex
					justify="center"
					align="center"
					direction="row"
					p="16px"
					gap="8px"
					style={{ height: "fit-content", width: "100%", maxWidth: "var(--chakra-sizes-prose)" }}
				>
					<Heading fontSize="xl" style={{ textTransform: "capitalize" }}>
						Welcome, {Cookies.get("adminUsername")}
					</Heading>
					<Spacer />
					<ButtonGroup>
						<Button fontSize="s" onClick={handleLogout}>
							Logout
						</Button>
					</ButtonGroup>
				</Flex>

				<Container
					p={0}
					style={{
						alignSelf: "stretch",
						flex: "auto 1 1",
						overflow: "clip",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Heading fontSize="xl" textAlign="left" p="16px" pt="0">
						Posts
					</Heading>
					<Container
						style={{
							height: "auto",
							display: "flex",
							flexDirection: "row",
							gap: "8px",
							paddingBottom: "16px",
						}}
					>
						<Input placeholder="Search for a post"></Input>
						<Button fontSize="sm" leftIcon={<AiFillDelete />}>
							Sort
						</Button>
					</Container>
					<Container
						style={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							gap: "6px",
							overflow: "scroll",

							marginBottom: "16px",
							marginTop: "16px",
						}}
					>
						{results.map((item) => {
							return (
								<Card
									variant="outline"
									p={2}
									style={{
										width: "100%",
										maxHeight: "34px",
										display: "flex",
										flexDirection: "row",
									}}
								>
									<Text
										style={{
											fontSize: "12px",
											width: "100%",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
											overflow: "clip",
											marginRight: "6px",
										}}
									>
										{item}
									</Text>
									<div
										style={{
											width: "20px",
											maxHeight: "34px",
										}}
									>
										<Icon
											as={AiOutlineWarning}
											w="16px"
											h="16px"
											style={{ verticalAlign: "2px" }}
										/>
									</div>
									<Text
										style={{
											fontSize: "12px",
											marginRight: "6px",
											marginLeft: "2px",
										}}
									>
										21
									</Text>
									<div
										style={{
											width: "20px",
											maxHeight: "34px",
										}}
									>
										<Icon
											as={AiFillDelete}
											w="16px"
											h="16px"
											_hover={{ fill: "red" }}
											style={{ verticalAlign: "2px" }}
											onClick={() => {
												onOpen();
											}}
										/>
									</div>

									{/* <CardBody>
									<Text>Hello</Text>
								</CardBody> */}
								</Card>
							);
						})}
						<Button p={2} size="sm" style={{ width: "auto" }} onClick={loadMorePosts}>
							Load more [10]
						</Button>
					</Container>
				</Container>
			</Flex>
		</>
	);
}

export default function Admin() {
	const { addToast } = useErrorToast();

	const usernameRef = useRef();
	const passwordRef = useRef();

	const [loggedIn, setLoggedIn] = useState(false);

	function handlePasswordSubmit(e) {
		const expiration = new Date(new Date().getTime() + 60 * 60 * 1000); // 60 * 1000 is a minute

		e?.preventDefault();

		if (!usernameRef.current.value) {
			addToast("Username is empty");
			return;
		} else if (!passwordRef.current.value) {
			addToast("Password is empty");
			return;
		}

		fetch(`${API_URL}/admin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Some error?");
			})
			.then((data) => {
				if (data?.success) {
					setLoggedIn(true);
					Cookies.set("adminUsername", usernameRef.current.value); // username lasts for 2 weeks // omitting expires makes it a session cookies
					Cookies.set("adminPassword", passwordRef.current.value, { expires: expiration });
				}
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	useEffect(() => {
		try {
			if (
				Cookies.get("adminUsername") !== undefined &&
				Cookies.get("adminPassword") !== undefined
			) {
				usernameRef.current.value = Cookies.get("adminUsername");
				passwordRef.current.value = Cookies.get("adminPassword");
				handlePasswordSubmit();
			} else if (Cookies.get("adminPassword") !== undefined) {
				passwordRef.current.value = Cookies.get("adminPassword");
			} else if (Cookies.get("adminUsername") !== undefined) {
				usernameRef.current.value = Cookies.get("adminUsername");
			} else {
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	return loggedIn ? (
		<>
			<Navbar />

			<Dashboard setLoggedIn={setLoggedIn} unr={usernameRef} />
		</>
	) : (
		<>
			<Navbar />

			<form onSubmit={handlePasswordSubmit}>
				<Flex
					justify="center"
					align="center"
					direction="column"
					p={5}
					gap="8px"
					style={{ height: "100vh", width: "100vw" }}
				>
					<Heading textAlign="center" noOfLines={2} mb={2}>
						Welcome, Moderator
					</Heading>
					<Input ref={usernameRef} placeholder="username" size="lg" style={{ maxWidth: "400px" }} />
					<Input
						type="password"
						ref={passwordRef}
						placeholder="password"
						size="lg"
						style={{ maxWidth: "400px" }}
					/>
					<Button
						type="submit"
						colorScheme="teal"
						size="md"
						style={{ width: "100%", maxWidth: "400px" }}
					>
						Enter
					</Button>
				</Flex>
			</form>
		</>
	);
}
