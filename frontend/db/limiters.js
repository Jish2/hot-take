// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/pages/api/user.ts

import rateLimit from "./rate-limit";

export const createPostLimiter = rateLimit({
  interval: 1 * 60 * 1000, // 1000 is a second
  max: 1,
  // message: "Only allowed 1 posts per minute.",
});

export const fetchPostLimiter = rateLimit({
  interval: 10 * 60 * 1000, // 1000 is a second
  max: 150,
  // message: "Only allowed to fetch up to 150 posts every 10 minutes.",
});

export const voteLimiter = rateLimit({
  interval: 500, // 1000 is a second
  max: 2,
  // message: "You are voting too fast!.",
});

export const adminLimiter = rateLimit({
  // skip: async (request, response) => {
  // 	try {
  // 		return await checkUser(request.body.username, request.body.password); //request.body.username
  // 	} catch (error) {
  // 		console.error(error);
  // 		return false;
  // 	}
  // },
  interval: 60 * 60 * 1000, // 1000 is a second
  max: 3,
  // message: "You are blocked",
});
