import { useState, useEffect, useRef } from "react";
import {
	InputGroup,
	InputRightElement,
	Spacer,
	Button,
	Flex,
	Heading,
	Input,
	ButtonGroup,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { useErrorToast } from "../../hooks/useErrorToast";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hottake.gg";

function Dashboard({ setLoggedIn }) {
	function handleLogout() {
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	function resetCookies() {
		Cookies.remove("adminUsername");
		Cookies.remove("adminPassword");
		setLoggedIn(false);
	}

	return (
		<>
			<Flex
				justify="center"
				align="center"
				direction="row"
				p={5}
				gap="8px"
				style={{ height: "100vh", width: "100vw" }}
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
