/* prettier-ignore */
import React, { forwardRef, useState, useImperativeHandle } from "react";
// UI Imports
/* prettier-ignore */
import { Stack, Input, Divider, Container, Heading, Button, Card, CardHeader, CardBody, CardFooter, Tooltip, Flex, Spacer, Text, Icon } from "@chakra-ui/react";
// Icons
/* prettier-ignore */
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill, BsChat, BsReply } from "react-icons/bs";
/* prettier-ignore */
import { AiOutlineFire, AiOutlineInfoCircle, AiOutlineWarning, AiFillHeart, AiOutlineSend } from "react-icons/ai";
// Dependencies
import axios, { isCancel, AxiosError } from "axios";
// Components
import { PostComment } from "./PostComment";

export const PostCard = forwardRef(
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
		const API_URL = process.env.API_URL || "https://api.hottake.gg";

		const [heat, setHeat] = useState(agree.length - disagree.length);
		const [commentsOpen, setCommentsOpen] = useState(false);
		const [reportTooltip, setReportTooltip] = useState(false);
		const [infoTooltip, setInfoTooltip] = useState(false);

		useImperativeHandle(ref, () => ({
			agree() {
				agreeWithPost();
			},
			disagree() {
				disagreeWithPost();
			},
		}));

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
				.post(`${API_URL}/agree`, {
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
				.post(`${API_URL}/disagree`, {
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
								top: "16px",
								right: "16px",
							}}
						>
							<Tooltip label="Report this post" isOpen={reportTooltip}>
								<Button
									onMouseEnter={() => setReportTooltip(true)}
									onMouseLeave={() => setReportTooltip(false)}
									onClick={() => setReportTooltip(true)}
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

							<Tooltip
								label={"Total votes: " + interactions}
								isOpen={infoTooltip}
							>
								<Button
									onMouseEnter={() => setInfoTooltip(true)}
									onMouseLeave={() => setInfoTooltip(false)}
									onClick={() => {
										setInfoTooltip(true);
									}}
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
						<CardBody p="16px">
							<Stack mt="6" spacing="3">
								<Heading size="lg">{title}</Heading>
							</Stack>
						</CardBody>
						<CardBody p="16px">
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
									Agree
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
									Disagree
								</Button>
							</Flex>
						</CardBody>
						<Divider />

						<CardFooter p="16px">
							<Flex w="100%" align="" direction="column" gap={2}>
								<Flex
									w="100%"
									justify="center"
									align="center"
									gap={2}
									onClick={() => {
										setCommentsOpen((i) => !i);
									}}
								>
									<Icon as={BsChat} />
									<Text>Comments</Text>
								</Flex>
								{commentsOpen && (
									<div>
										<Card variant="outline">
											<div
												style={{
													maxHeight: "176px",
													overflowY: "scroll",
													overflowX: "hidden",
												}}
											>
												<PostComment content="This post sucks!" />
												<PostComment content="sadas" />
												<PostComment content="defiently two ugly bsfs 💀" />
												<Divider />
												<Container m={1} ml={4} position="relative">
													<Icon
														w={3}
														h={3}
														as={AiFillHeart}
														fill="red"
														style={{
															position: "absolute",
															top: "20px",
															right: "28px",
														}}
													/>
													<Icon
														w={3}
														h={3}
														as={BsReply}
														style={{
															position: "absolute",
															top: "20px",
															right: "44px",
														}}
													/>
													<Text fontSize="xs">10:01 am, Jan 5</Text>
													<Text>u just coping</Text>
												</Container>
												<PostComment content="😭😭😭" time="10:09 am, Jan 5" />
												<PostComment content="This post sucks!" />
												<PostComment content="aa" />
											</div>
											<Divider />

											<CardFooter
												style={{
													margin: "0",
													padding: "0",
												}}
											>
												<Flex
													direction="row"
													w="100%"
													justify="center"
													align="center"
												>
													<Input
														variant="filled"
														placeholder="Comment your thoughts..."
														style={{ margin: "8px" }}
													/>
													<Icon as={AiOutlineSend} h={6} w={6} mr="8px" />
												</Flex>
											</CardFooter>
										</Card>
									</div>
								)}
							</Flex>
						</CardFooter>
					</Card>
				</div>
			</>
		);
	}
);
