'use client'
import { Inter } from '@next/font/google'
import { VStack, Text,Center, useDisclosure, Button, Container, HStack,Box,Tag,Image} from '@chakra-ui/react'
import HotTakeCard from '../components/hotTakeCard'
import React, {useState, useRef, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import UploadHotTake from '../components/uploadHT';
import useScrollSnap from 'react-use-scroll-snap';

import { v4 as uuidv4 } from 'uuid';



const inter = Inter({ subsets: ['latin'] })



export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3001/posts')
  const postsFromDB = await res.json()
  //console.log(postsFromDB)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      postsFromDB,
    },
  }
}

export default function Home({postsFromDB}) {
  // const scrollRef = useRef(null);
  // useScrollSnap({ ref: scrollRef, duration: 300, delay: 0 });


  const { isOpen, onOpen, onClose } = useDisclosure()
  //const posts = await getPosts();
  //on load, check if the user has a uuid stored
  useEffect(()=>{
    console.log(postsFromDB)
    
    
    if (localStorage.getItem('uuid') == null){
      console.log("UUID has not been found, creating UUID")
      localStorage.setItem('uuid', uuidv4())
    }
    

  }, [])

  const [posts, setPosts] = useState(postsFromDB)
  //console.log(posts)


  return (
    <>
       <UploadHotTake isOpen={isOpen} onClose={onClose}/>
      <Button onClick={onOpen} colorScheme='twitter' size='lg' style={{aspectRatio:"1/1", borderRadius:"100%", position:"fixed", right:'10vw', bottom:'10vh'}} >+</Button>
      <Container m={0} w="100%" style={{marginLeft:"auto", marginRight:"auto", height:"100vh", scrollSnapType:"y mandatory",overflowY:"scroll"}} w="full" >
        {posts.map((post,i)=><div style={{scrollSnapAlign:"center"}}><HotTakeCard key={i} title={post.title} /></div>)}
      </Container> 
      
        
    </>
  )
}
