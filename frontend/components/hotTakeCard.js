import React from "react";
import { useState } from "react";
//prettier-ignore
import { Stack, Heading, Divider, ButtonGroup, Button, Image, Text, Card, CardHeader, CardBody, CardFooter, HStack, Tooltip, Center, Flex, Box, Spacer } from "@chakra-ui/react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsExclamationTriangle,
} from "react-icons/bs";
import axios, { isCancel, AxiosError } from "axios";

export default function HotTakeCard({ title, agree, disagree, id, uuid }) {
  //console.log(agree.length)
  const handleAgreeClick = () => {};

  const handleDisagreeClick = () => {};
  const [heat, setHeat] = useState(agree.length - disagree.length);
  console.log(agree.includes(uuid))
  console.log(disagree.includes(uuid))
  //console.log(id, uuid)
  function agreeWithPost() {

    axios
      .post("http://localhost:3001/agree", {
        postID: id,
        userUUID: uuid,
      })
      .then(function (response) {
        if (agree.includes(uuid)) {
          setHeat((prev) => {
            agree.splice(agree.indexOf(uuid), 1);
            return prev - 1;
          });
          //our user has previously agreed, we should now undo the agree by -1ing from the number
        } else if (disagree.includes(uuid)) {
          setHeat((prev) => {
            agree.push(uuid);
            disagree.splice(disagree.indexOf(id), 1);

            return prev + 2;
          });
          //our user has previously disagreed, we should now undo disagree by +2ing the number
        } else {
          setHeat((prev) => {
            agree.push(uuid);

            return prev + 1;
          });
          //has not agreed or disagreed, just +1
        }

        //console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function disagreeWithPost() {

    axios
      .post("http://localhost:3001/agree", {
        postID: id,
        userUUID: uuid,
      })
      .then(function (response) {
        if (disagree.includes(uuid)) {
          setHeat((prev) => {
            disagree.splice(disagree.indexOf(uuid), 1);
            return prev + 1;
          });
        } else if (agree.includes(uuid)) {
          setHeat((prev) => {
            
            agree.splice(agree.indexOf(uuid), 1);
			disagree.push(uuid)

            return prev -2;
          });
          //our user has previously disagreed, we should now undo disagree by +2ing the number
        } else {
          setHeat((prev) => {
            disagree.push(uuid);

            return prev -1;
          });
          //has not agreed or disagreed, just +1
        }

        //console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div
      style={{
        scrollSnapAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outline">
        <Tooltip label="Report this post">
          <Button
            color="gray.300"
            variant="ghost"
            style={{
              minWidth: "20px",
              height: "20px",
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "0",
            }}
            _hover={{ bg: "none", color: "var(--chakra-colors-gray-500)" }}
            _active={{
              bg: "none",
              transform: "scale(.9)",
            }}
          >
            <BsExclamationTriangle
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </Button>
        </Tooltip>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="lg">{title}</Heading>
          </Stack>
        </CardBody>
        {/* <Divider /> */}
        <CardFooter>
          <Flex style={{ width: "100%" }}>
            <Button
              width="125px"
              leftIcon={<BsFillHandThumbsUpFill />}
              variant="outline"
              colorScheme="teal"
              color="#319795"
              onClick={agreeWithPost}
            >
              Agree
            </Button>
            <Spacer />
            <Button disabled variant="outline" color="black" colorScheme="gray">
              {heat}
            </Button>
            <Spacer />
            <Button
              width="125px"
              rightIcon={<BsFillHandThumbsDownFill />}
              variant="outline"
              colorScheme="red"
              color="#ff5242"
              onClick={disagreeWithPost}
            >
              Disagree
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
}
