import React from 'react'
import {Stack, Heading, Divider, ButtonGroup, Button, Image, Text, Card, CardHeader, CardBody, CardFooter, HStack } from '@chakra-ui/react'


export default function HotTakeCard() {
  return (
            <Card maxW='sm' >
        <CardBody>
            
            <Stack mt='6' spacing='3'>
            <Heading size='lg'>My math teacher is so sexy I cannot take it anymore</Heading>
            
            
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
                <HStack>
                    
                    <p>Upvote</p>
                    <p>1.9k</p>
                    
                </HStack>
                
            </Button>
            <Button variant='ghost' colorScheme='blue'>
                Downvote
            </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
  )
}
