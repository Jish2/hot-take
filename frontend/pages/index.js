"use client";
import { Inter } from "@next/font/google";
import { useDisclosure, Button, Container, Icon } from "@chakra-ui/react";
import HotTakeCard from "../components/hotTakeCard";
import React, { useState, useRef, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import UploadHotTake from "../components/uploadHT";
import WithSubnavigation from "../components/ChakraNavbar";
import { BsPlusLg } from "react-icons/bs";


import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const res = await fetch("http://localhost:3001/posts");
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
	// const scrollRef = useRef(null);
	// useScrollSnap({ ref: scrollRef, duration: 300, delay: 0 });
	
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		console.log(window.pageYOffset)
		setScrollPosition(position);
	};
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
	
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const postListRef = useRef(null)
	//const posts = await getPosts();
	//on load, check if the user has a uuid stored
	useEffect(() => {
		console.log(postsFromDB);

		if (localStorage.getItem("uuid") == null) {
			console.log("UUID has not been found, creating UUID");
			localStorage.setItem("uuid", uuidv4());
		}
	}, []);

	const [posts, setPosts] = useState(postsFromDB);

	return (
		<>
			<WithSubnavigation />
			<UploadHotTake isOpen={isOpen} onClose={onClose} />
			<Button
				onClick={onOpen}
				colorScheme="teal"
				size="lg"
				style={{
					zIndex:"999",
					aspectRatio: "1/1",
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
				ref={postListRef}
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
					<div style={{position:"relative"}}>
						<div id="flexContainer" style={{ position:"absolute",display:"flex",scrollSnapAlign: "end",width:"100%",height:"100%"}}>
							<div  onClick={()=>{

								var position = document.getElementById("flexContainer").getBoundingClientRect();
								console.log(position.top)

								document.getElementById("scrollContainer").scrollTo(-400,0)


							 }} style={{width:"50%",height:"100vh"}}></div>
							<div  onClick={()=>{console.log("clicked right")}}style={{width:"50%",height:"100vh"}}></div> 
						</div>
						
						<HotTakeCard key={i} title={post.title} /> 

						
					</div>
					
					
				))}
			</div>
		</>
	);
}
