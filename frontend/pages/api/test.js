// import connect from "../../db/connect";
import mongoose from "mongoose";

export const config = {
	api: {
		externalResolver: true,
	},
};

const mongo = process.env.MONGO_URL;

export default async function handler(req, res) {
	const { method } = req;

	mongoose.set("strictQuery", true);

	// await connect();
	// mongoose.set("strictQuery", true);
	// mongoose.connect(process.env.MONGO_URL).then((response) => {
	// 	res.status(200).json({ success: true, data: "MOMs111231!" });
	// });

	// const connection = mongoose.connect(process.env.MONGO_URL).then((mongoose) => {
	// 	return mongoose;
	// });
	// await connection;

	const conn = mongoose.createConnection(mongo, { serverSelectionTimeoutMS: 5000 });

	await conn.asPromise();

	switch (method) {
		case "GET":
			res.status(200).json({ success: true, data: "MOMs!1aa" });
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
