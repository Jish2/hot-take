import React, { useState, useRef, useEffect } from "react";
<<<<<<< HEAD:frontend/pages/index.js
import { useDisclosure, Button, Icon, ChakraProvider } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { HotTakeCard } from "../components/hotTakeCard";
import UploadHotTake from "../components/uploadHT";
import WithSubnavigation from "../components/ChakraNavbar";

import { v4 as uuidv4 } from "uuid";

=======
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
// Styling
>>>>>>> f0f73c793c495418408615cb56478b2ab61efeec:frontend/pages/index.jsx
import styles from "../styles/Home.module.css";
// Dependencies
import { v4 as uuidv4 } from "uuid";
import ReactGA from "react-ga";

<<<<<<< HEAD:frontend/pages/index.js
  const TRACKING_ID = "UA-253199381-1" // OUR_TRACKING_ID
  
=======
// Google Analytics ID
const TRACKING_ID = "UA-253199381-1"; // OUR_TRACKING_ID
>>>>>>> f0f73c793c495418408615cb56478b2ab61efeec:frontend/pages/index.jsx


function sortByInteractions(arr){
  arr = arr.sort((a,b)=>{
    return a.interactions-b.interactions
  })
  return arr
}
  

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
<<<<<<< HEAD:frontend/pages/index.js
	const scrollContainerRef = useRef(null);
  const [posts, setPosts] = useState(postsFromDB);
  console.log(posts)
	//const posts = await getPosts();
	//on load, check if the user has a uuid stored
=======
	const scrollContainerRef = useRef(null); // To access scroll container containing posts
	const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

>>>>>>> f0f73c793c495418408615cb56478b2ab61efeec:frontend/pages/index.jsx
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
  useEffect(() => {
		
	}, [posts]);
	

	return (
		<>
<<<<<<< HEAD:frontend/pages/index.js
			<WithSubnavigation />
      

			<UploadHotTake isOpen={isOpen} onClose={onClose} />
=======
			<Navbar />
			<CreatePostModal isOpen={isOpen} onClose={onClose} />
>>>>>>> f0f73c793c495418408615cb56478b2ab61efeec:frontend/pages/index.jsx
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

			<div
				id="scrollContainer"
				ref={scrollContainerRef}
				m={0}
				p={0}
				style={{
          position:"relative",
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

          <Menu>
            <MenuButton style={{position:"fixed" ,bottom:"25px", left:"18px", zIndex:"999", borderRadius:"18px"}} as={Button}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=>{

                let postsCopy = [...posts]
                postsCopy = postsCopy.sort((a,b)=>{
                  let dateA = Date(a.date)
                  let dateB = Date(b.date)
                  return dateA-dateB
                 
                })
                setPosts((prev=>{

                  return prev
                
                  
                }))



                let d = Date(post.date)
                console.log(d)

              }}>Newest</MenuItem>
              <MenuItem onClick={()=>{
                  let postsCopy = [...posts]
                  postsCopy = postsCopy.sort((a,b)=>{
                    return b.interactions-a.interactions
                  })
                  setPosts((prev)=>{
                    return postsCopy
                  })
               
              }}>Hottest</MenuItem>
              <MenuItem>Most agreed</MenuItem>
              <MenuItem>Most disagreed</MenuItem>
            </MenuList>
          </Menu>

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
