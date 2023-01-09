import React, { useState, useRef, useEffect } from "react";
// UI imports
import {
	useDisclosure,
	Button,
	Icon,
	Flex,
	Text,
	ChakraProvider,
} from "@chakra-ui/react";
// Icons
import {
	BsPlusLg,
	BsSortNumericUp,
	BsFillStarFill,
	BsSortNumericDownAlt,
	BsShuffle,
	BsFillHandThumbsUpFill,
	BsFillHandThumbsDownFill,
} from "react-icons/bs";
// Components
import { PostCard } from "../components/PostCard";
import { CreatePostModal } from "../components/CreatePostModal";
import { Navbar } from "../components/Navbar";
import InfiniteScroll from 'react-infinite-scroll-component';

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
	const res = await fetch("http://localhost:3001/posts?offset="+0);
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
	// key for sorting button
	const SORT_ICONS = [
		{ icon: BsSortNumericDownAlt, name: "New", w: 6, h: 6 },
		{ icon: BsFillStarFill, name: "Best", w: 4, h: 4 },
		{ icon: BsSortNumericUp, name: "Old", w: 6, h: 6 },
		{ icon: BsShuffle, name: "Random", w: 6, h: 6 },
		{ icon: BsFillHandThumbsDownFill, name: "Disagreed", w: 5, h: 5 },
		{ icon: BsFillHandThumbsUpFill, name: "Agreed", w: 5, h: 5 },
	];
	const [sortMethod, setSortMethod] = useState(0);

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

	async function loadMore() {
		console.log("Loading")
		const res = await fetch('http://localhost:3001/posts?offset='+posts.length)
		const loadedPosts = await res.json();
		if (loadedPosts.length == 0){
			setHasMorePosts(false)
		}
		setPosts((prev)=>{
			//const newPosts = [...prev, loadedPosts]
			return [...prev,...loadedPosts]

		})


	}	

	return (
		<>
			<Navbar />
			<CreatePostModal isOpen={isOpen} onClose={onClose} />
			<Button
				onClick={onOpen}
				colorScheme="teal"
				style={{
					zIndex: "999",
					height: "48px",
					width: "48px",
					// aspectRatio: "1/1",
					borderRadius: "100%",
					position: "fixed",
					right: "18px",
					bottom: "18px",
				}}
			>
				<Icon as={BsPlusLg} w={4} h={4} color="white" />
			</Button>
			<Flex
				justify="center"
				align="center"
				gap="6px"
				style={{
					zIndex: "999",
					position: "fixed",
					left: "18px",
					bottom: "18px",
				}}
			>
				<Button
					onClick={() => {
						setSortMethod((prev) => {
							if (prev + 1 > SORT_ICONS.length - 1) return 0;
							else return prev + 1;
						});
					}}
					colorScheme="gray"
					style={{
						background: "#718096",
						height: "48px",
						width: "48px",

						borderRadius: "25%",
					}}
				>
					<Icon
						as={SORT_ICONS[sortMethod].icon}
						w={SORT_ICONS[sortMethod].w}
						h={SORT_ICONS[sortMethod].h}
						color="white"
					/>
				</Button>
				<Text
					style={{
						background: "white",
						padding: "6px",
						borderRadius: ".5em",
					}}
					fontSize="large"
				>
					Sort by {SORT_ICONS[sortMethod].name}
				</Text>
			</Flex>

			
				<InfiniteScroll

				

					dataLength={posts.length}
					next={loadMore}
					hasMore={true}
					loader={<h4>loading</h4>}
					scrollableTarget="scrollContainer"
				>
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
									console.log(post.agree)
									scrollContainerRef.current.scrollBy({ top: 50 });
									setAnimated((prev) => {
										return { ...prev, left: true };
									});

									//refs.current[1].current.agree();
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

									//refs.current[i].current.disagree();
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

				</InfiniteScroll>
				
			
		</>
	);
}
