'use client'
import { Inter } from '@next/font/google'
import { VStack, Text,Center} from '@chakra-ui/react'
import HotTakeCard from '../components/hotTakeCard'
import React, {useState, useRef, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react'

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
      <VStack w="full" overflowY='scroll'>
        {
          posts.map((post)=>{
            return <HotTakeCard title={post.title} />
          })
        }
        


        
      </VStack>
    </>
  )
}
