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
	Flex,
	Heading,
	Input,
	ButtonGroup,
	Icon,
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	ModalFooter,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";

import { FaSort } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";

import { AiFillDelete, AiOutlineWarning } from "react-icons/ai";

import { Navbar } from "../../components/Navbar";
import { useErrorToast } from "../../hooks/useErrorToast";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import Cookies from "js-cookie";
// import DeletePostModal from "../../components/DeletePostModal";

import {
	BsSortNumericUp,
	BsFillStarFill,
	BsSortNumericDownAlt,
	BsShuffle,
	BsFillHandThumbsUpFill,
	BsFillHandThumbsDownFill,
} from "react-icons/bs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hottake.gg/"; // this reamins legacy

function Dashboard({ setLoggedIn }) {
	const sort_method = [
		{ icon: BsSortNumericDownAlt, name: "new", w: 6, h: 6 },
		{ icon: BsShuffle, name: "reported", w: 6, h: 6 },
		{ icon: BsFillStarFill, name: "popular", w: 4, h: 4 },
		{ icon: BsFillHandThumbsDownFill, name: "disagreed", w: 5, h: 5 },
		{ icon: BsFillHandThumbsUpFill, name: "agreed", w: 5, h: 5 },
		{ icon: BsSortNumericUp, name: "old", w: 6, h: 6 },
	];

	const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Nov", "Dec"];

	function formatAMPM(date) {
		var day = date.getDate();
		var month = date.getMonth();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = months[month] + " " + day + " at " + hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	const { addToast } = useErrorToast();
	const { addSuccessToast } = useSuccessToast();

	const [results, setResults] = useState([]);
	const [selectedPost, setSelectedPost] = useState();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [sortMethod, setSortMethod] = useState(0);
	const deleteRef = useRef();
	const searchRef = useRef();

	function handleDelete() {
		try {
			fetch(`${API_URL}/delete`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: Cookies.get("adminUsername"),
					password: Cookies.get("adminPassword"),
					postID: selectedPost._id,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					addSuccessToast(`Post ${selectedPost._id} deleted.`);
				});
			const index = results.indexOf(selectedPost);
			setResults((prev) => {
				let arr = prev;
				arr.splice(index, 1);
				return arr;
			});
		} catch (error) {
			console.error(error);
			addToast(error?.response?.data || error.message);
		}

		onClose();
	}

	function handleSearch(e) {
		e.preventDefault();
		if (searchRef.current.value === "") {
			fetchPosts();
			return;
		}
		// const { username, password, query, sort, skip, limit } = req.body;
		try {
			fetch(`${API_URL}/search`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: Cookies.get("adminUsername"),
					password: Cookies.get("adminPassword"),
					query: searchRef.current.value,
					sort: sort_method.name,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					setResults(data);
				});
		} catch (error) {
			console.error(error);
			addToast(error.message);
		}
	}

	function handleLogout() {
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	function resetCookies() {
		Cookies.remove("adminUsername");
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	async function fetchPosts(index) {
		try {
			const res = await fetch(`${API_URL}/posts?offset=0&sort=${sort_method[index ?? sortMethod].name}`);
			const posts = await res.json();
			setResults([...posts]);
		} catch (error) {
			console.error(error);
		}
	}

	async function loadMorePosts() {
		if (!searchRef.current.value) {
			try {
				const res = await fetch(`${API_URL}/posts?offset=${results.length}&sort=${sort_method[sortMethod].name}`);
				const posts = await res.json();
				if (posts.length === 0) addToast("No more posts");
				setResults((prev) => [...prev, ...posts]);
			} catch (error) {
				addToast(error?.response?.data || error.message);
			}
		} else {
			try {
				fetch(`${API_URL}/search`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						skip: results.length,
						username: Cookies.get("adminUsername"),
						password: Cookies.get("adminPassword"),
						query: searchRef.current.value,
						sort: sort_method[sortMethod].name,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.length === 0) addToast("No more posts");

						setResults((prev) => [...prev, ...data]);
					});
			} catch (error) {
				addToast(error?.response?.data || error.message);
			}
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered initialFocusRef={deleteRef}>
				<ModalOverlay />
				<ModalContent style={{ margin: "0 16px 0 16px" }}>
					<ModalHeader fontSize="l" pb={0}>
						Post {selectedPost?._id} created on {formatAMPM(new Date(selectedPost?.date))}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{selectedPost?.title}</ModalBody>
					<ModalFooter>
						<Flex w={"100%"} gap="12px">
							<div
								style={{
									height: "inherit",
									color: "#A0AEC0",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: "20px",
									fontWeight: "600",
									gap: "6px",
									marginRight: "6px",
									marginLeft: "6px",
								}}
							>
								<Icon as={AiOutlineFire} w={5} h={5} />
								{selectedPost?.interactions}
							</div>
							<div
								style={{
									height: "inherit",
									color: "#A0AEC0",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: "20px",
									fontWeight: "600",
									gap: "6px",
									marginRight: "6px",
									marginLeft: "6px",
								}}
							>
								<Icon as={AiOutlineWarning} w={5} h={5} />
								{selectedPost?.reports.length}
							</div>
							<Spacer />
							<Button onClick={onClose}>Cancel</Button>

							<Button colorScheme="red" onClick={() => handleDelete()} ref={deleteRef}>
								Delete
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Flex justify="center" align="center" direction="column" p={0} style={{ height: "100vh", width: "100vw" }}>
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
					<Heading fontSize="xl" textAlign="left" p="0 16px 0 16px">
						Posts
					</Heading>

					<form
						onSubmit={handleSearch}
						style={{
							height: "auto",
							display: "flex",
							flexDirection: "row",
							gap: "8px",
							padding: "8px 16px 8px 16px",
						}}
					>
						<Menu matchWidth={true} placement="bottom">
							<MenuButton as={Button} p="8px 10px 8px 10px">
								<Icon as={FaSort} w="20px" h="20px" />
							</MenuButton>
							<MenuList>
								{sort_method.map((item, index) => {
									return (
										<MenuItem
											key={index}
											icon={<item.icon w={item.h} h={item.w} />}
											onClick={async () => {
												setSortMethod(index);
												await fetchPosts(index);
											}}
											style={{ textTransform: "capitalize" }}
										>
											{item.name}
										</MenuItem>
									);
								})}
							</MenuList>
						</Menu>
						<Input placeholder="Search for a post" ref={searchRef}></Input>
						<Button type="submit">Go</Button>
					</form>

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
						{results.map((post, i) => {
							return (
								<Card
									key={i}
									variant="outline"
									p={2}
									style={{
										width: "100%",
										maxHeight: "34px",
										display: "flex",
										flexDirection: "row",
									}}
									onClick={() => {
										setSelectedPost(post);
										onOpen();
									}}
									_hover={{
										background: "var(--chakra-colors-blackAlpha-100)",
										boxShadow: "var(--chakra-shadows-base)",
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
										{post.title}
									</Text>
									<div
										style={{
											width: "20px",
											maxHeight: "34px",
										}}
									>
										<Icon as={AiOutlineWarning} w="16px" h="16px" style={{ verticalAlign: "2px" }} />
									</div>
									<Text
										style={{
											fontSize: "12px",
											marginRight: "6px",
											marginLeft: "2px",
										}}
									>
										{Math.round((post.reports.length / (post.interactions || 1)) * 100) ?? 0}%
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
												setSelectedPost(post);
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
				throw new Error("Incorrect information");
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
				addToast(error.message);
			});
	}

	useEffect(() => {
		try {
			if (Cookies.get("adminUsername") !== undefined && Cookies.get("adminPassword") !== undefined) {
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
				<Flex justify="center" align="center" direction="column" p={5} gap="8px" style={{ height: "100vh", width: "100vw" }}>
					<Heading textAlign="center" noOfLines={2} mb={2}>
						Welcome, Moderator
					</Heading>
					<Input ref={usernameRef} placeholder="username" size="lg" style={{ maxWidth: "400px" }} />
					<Input type="password" ref={passwordRef} placeholder="password" size="lg" style={{ maxWidth: "400px" }} />
					<Button type="submit" colorScheme="teal" size="md" style={{ width: "100%", maxWidth: "400px" }}>
						Enter
					</Button>
				</Flex>
			</form>
		</>
	);
}
