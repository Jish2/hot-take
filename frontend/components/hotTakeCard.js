import React, { forwardRef, useState, useImperativeHandle } from "react";
//prettier-ignore
import { Stack, Heading, Button, Card, CardHeader, CardBody, CardFooter, HStack, Tooltip, Center, Flex, Box, Spacer } from "@chakra-ui/react";
import {
	BsFillHandThumbsUpFill,
	BsFillHandThumbsDownFill,
	BsExclamationTriangle,
} from "react-icons/bs";
import {
	AiOutlineFire,
	AiOutlineInfoCircle,
	AiOutlineWarning,
} from "react-icons/ai";

import axios, { isCancel, AxiosError } from "axios";

export const HotTakeCard = forwardRef(
	(
		{
			title,
			agree,
			disagree,
			id,
			uuid,
			setAnimated,
			scrollContainerRef,
			index,
			interactions,
		},
		ref
	) => {
		const [heat, setHeat] = useState(agree.length - disagree.length);

		useImperativeHandle(ref, () => ({
			log() {
				testing123();
			},
			agree() {
				agreeWithPost();
			},
			disagree() {
				disagreeWithPost();
			},
		}));

		function testing123() {
			console.log("TEST COMPLETE! " + id);
		}

		function formatNumberCompact(num) {
			return new Intl.NumberFormat("en-GB", {
				notation: "compact",
			}).format(num);
		}

		function agreeWithPost() {
			console.log(index + " " + id);
			setAnimated((prev) => {
				return { ...prev, left: true };
			});
			scrollContainerRef.current.scrollBy({ top: 50 });

			axios
				.post("https://api.hottake.gg/agree", {
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
			setAnimated((prev) => {
				return { ...prev, right: true };
			});
			scrollContainerRef.current.scrollBy({ top: 50 });

			axios
				.post("https://api.hottake.gg/disagree", {
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
							disagree.push(uuid);

							return prev - 2;
						});
						//our user has previously disagreed, we should now undo disagree by +2ing the number
					} else {
						setHeat((prev) => {
							disagree.push(uuid);

							return prev - 1;
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
			<>
				<div
					style={{
						scrollSnapAlign: "center",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Card variant="outline" bg="white" w="90%" maxW="400px">
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "4px",
								position: "absolute",
								top: "20px",
								right: "20px",
							}}
						>
							<Tooltip label="Report this post">
								<Button
									color="gray.300"
									variant="ghost"
									style={{
										minWidth: "20px",
										height: "20px",
										padding: "0",
									}}
									_hover={{
										bg: "none",
										color: "var(--chakra-colors-gray-500)",
									}}
									_active={{
										bg: "none",
										transform: "scale(.9)",
									}}
								>
									<AiOutlineWarning
										style={{
											width: "20px",
											height: "20px",
										}}
									/>
								</Button>
							</Tooltip>

							<Tooltip label={"Total votes: " + interactions}>
								<Button
									color="gray.300"
									variant="ghost"
									style={{
										minWidth: "20px",
										height: "20px",
										padding: "0",
									}}
									_hover={{
										bg: "none",
										color: "var(--chakra-colors-gray-500)",
									}}
									_active={{
										bg: "none",
										transform: "scale(.9)",
									}}
								>
									<AiOutlineInfoCircle
										style={{
											width: "20px",
											height: "20px",
										}}
									/>
								</Button>
							</Tooltip>
						</div>
						<CardBody>
							<Stack mt="6" spacing="3">
								<Heading size="lg">{title}</Heading>
							</Stack>
						</CardBody>
						{/* <Divider /> */}
						<CardFooter>
							<Flex style={{ width: "100%" }} gap="6px">
								<Button
									width="125px"
									leftIcon={<BsFillHandThumbsUpFill />}
									variant="outline"
									colorScheme="teal"
									color="#319795"
									onClick={agreeWithPost}
									style={{ background: agree.includes(uuid) ? "#B2F5EA" : "" }}
								>
									<Text fontSize={{base:'12px',sm:'15px'}}>{agree.length} Agree</Text>
								</Button>
								<Spacer />
								<Button
									leftIcon={<AiOutlineFire />}
									disabled
									variant="outline"
									color="black"
									colorScheme="gray"
								>
									{(() => {
										return formatNumberCompact(heat);
									})()}
								</Button>
								<Spacer />
								<Button
									width="125px"
									rightIcon={<BsFillHandThumbsDownFill />}
									variant="outline"
									colorScheme="red"
									color="#ff5242"
									onClick={disagreeWithPost}
									style={{
										background: disagree.includes(uuid) ? "#FEB2B2" : "",
									}}
								>
									<Text fontSize={{base:'12px',sm:'15px'}}>{disagree.length} Disagree</Text>
								</Button>
							</Flex>
						</CardFooter>
					</Card>
				</div>
			</>
		);
	}
);
