import React, { useState, useRef, useEffect } from "react";
// UI imports
import { useDisclosure, Button, Icon, ChakraProvider } from "@chakra-ui/react";
// Icons
import { BsPlusLg } from "react-icons/bs";
// Components
import { PostCard } from "../components/PostCard";
import { CreatePost } from "../components/CreatePost";
import { Navbar } from "../components/Navbar";

import { v4 as uuidv4 } from "uuid";

import styles from "../styles/Home.module.css";

import ReactGA from "react-ga";
const TRACKING_ID = "UA-253199381-1"; // OUR_TRACKING_ID

export async function getServerSideProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const res = await fetch("https://api.hottake.gg/posts");
	const postsFromDB = await res.json();
	//console.log(postsFromDB)

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			postsFromDB,
		},
	};
}

export default function Home({ postsFromDB }) {
	const refs = useRef(Array(postsFromDB.length).fill(React.createRef()));

	const [animated, setAnimated] = useState({ left: false, right: false });
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [uuid, setUUID] = useState(null);
	const scrollContainerRef = useRef(null);
	//const posts = await getPosts();
	//on load, check if the user has a uuid stored
	useEffect(() => {
		ReactGA.initialize(TRACKING_ID);
		ReactGA.pageview(window.location.pathname);
		// console.log(postsFromDB);
		// console.log(refs);
		if (localStorage.getItem("uuid") == null) {
			//console.log("UUID has not been found, creating UUID");
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
