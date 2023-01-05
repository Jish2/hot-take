import React, { useState, useRef, useEffect } from "react";
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

import styles from "../styles/Home.module.css";

  const TRACKING_ID = "UA-253199381-1" // OUR_TRACKING_ID
  


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
  const [posts, setPosts] = useState(postsFromDB);
  console.log(posts)
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
  useEffect(() => {
		
	}, [posts]);
	

	return (
		<>
			<WithSubnavigation />
      

			<UploadHotTake isOpen={isOpen} onClose={onClose} />
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

									refs.current[i].current.log();
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

									refs.current[i].current.log();
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

						<HotTakeCard
							key={i}
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
