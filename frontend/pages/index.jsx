import React, { useState, useRef, useEffect } from "react";
// UI imports
import { useDisclosure, Button, Icon, ChakraProvider } from "@chakra-ui/react";
// Icons
import { BsPlusLg } from "react-icons/bs";
// Components
import { PostCard } from "../components/PostCard";
import { CreatePost } from "../components/CreatePost";
import { Navbar } from "../components/Navbar";
// Styling
import styles from "../styles/Home.module.css";
// Dependencies
import { v4 as uuidv4 } from "uuid";
import ReactGA from "react-ga";

// Google Analytics ID
const TRACKING_ID = "UA-253199381-1"; // OUR_TRACKING_ID

export async function getServerSideProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const res = await fetch("https://api.hottake.gg/posts");
	const postsFromDB = await res.json();

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			postsFromDB,
		},
	};
}

export default function Home({ postsFromDB }) {
	// Array of refs to reference each post
	const refs = useRef(Array(postsFromDB.length).fill(React.createRef()));

	// states
	const [animated, setAnimated] = useState({ left: false, right: false }); // Left and Right flashing animations
	const [uuid, setUUID] = useState(null);
	const scrollContainerRef = useRef(null); // To access scroll container containing posts
	const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

	useEffect(() => {
		// Google Analytics initialization
		ReactGA.initialize(TRACKING_ID);
		ReactGA.pageview(window.location.pathname);

		// Check if user has visited already
		if (localStorage.getItem("uuid") == null) {
			// If not, add UUID to local storage.
			localStorage.setItem("uuid", uuidv4());
			setUUID(localStorage.getItem("uuid"));
		} else {
			//console.log("UUID: "+localStorage.getItem("uuid"))
			setUUID(localStorage.getItem("uuid"));
		}
	}, []);
	const [posts, setPosts] = useState(postsFromDB);

	return (
		<>
			<Navbar />
			<CreatePost isOpen={isOpen} onClose={onClose} />
			<Button
				onClick={onOpen}
				colorScheme="teal"
				style={{
					zIndex: "999",
					height: "48px",
					// aspectRatio: "1/1",
					borderRadius: "100%",
					position: "fixed",
					right: "18px",
					bottom: "18px",
				}}
			>
				<Icon as={BsPlusLg} w={4} h={4} color="white" />
			</Button>
			<div
				id="scrollContainer"
				ref={scrollContainerRef}
				m={0}
				p={0}
				style={{
					marginLeft: "auto",
					marginRight: "auto",
					height: "100vh",
					width: "100vw",
					scrollSnapType: "y mandatory",
					overflowY: "scroll",
					scrollBehavior: "smooth",
				}}
			>
				{posts.map((post, i) => (
					<div key={post._id} style={{ position: "relative" }}>
						<div
							id="flexContainer"
							style={{
								overflow: "scroll",
								position: "absolute",
								display: "flex",
								scrollSnapAlign: "end",
								width: "100%",
								height: "100%",
							}}
						>
							<div
								onClick={() => {
									scrollContainerRef.current.scrollBy({ top: 50 });
									setAnimated((prev) => {
										return { ...prev, left: true };
									});

									refs.current[1].current.agree();
								}}
								onAnimationEnd={() =>
									setAnimated((prev) => {
										return { ...prev, left: false };
									})
								}
								style={{ width: "50%", height: "100vh" }}
								className={animated.left ? styles.animateGreen : ""}
							></div>

							<div
								onClick={() => {
									scrollContainerRef.current.scrollBy({ top: 50 });

									setAnimated((prev) => {
										return { ...prev, right: true };
									});

									refs.current[i].current.disagree();
								}}
								onAnimationEnd={() =>
									setAnimated((prev) => {
										return { ...prev, right: false };
									})
								}
								style={{ width: "50%", height: "100vh" }}
								className={animated.right ? styles.animateRed : ""}
							></div>
						</div>

						<PostCard
							title={post.title}
							agree={post.agree}
							disagree={post.disagree}
							id={post._id}
							uuid={uuid}
							setAnimated={setAnimated}
							scrollContainerRef={scrollContainerRef}
							ref={refs.current[i]}
							index={i}
							interactions={post.interactions}
						/>
					</div>
				))}
			</div>
		</>
	);
}
