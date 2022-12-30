
import { Inter } from '@next/font/google'
import { VStack, Text } from '@chakra-ui/react'
import HotTakeCard from '../components/hotTakeCard'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <VStack w="full" h="100vh">
        <HotTakeCard />
      </VStack>
    </>
  )
}
