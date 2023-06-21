// import connect from "../../db/connect";
import mongoose from "mongoose";

export const config = {
	api: {
		externalResolver: true,
	},
};

const mongo = process.env.MONGO_URL;

async function establish_connect() {
	// const connection = mongoose.connect(mongo);
	// await connection.asPromise();

	const conn = mongoose.createConnection(mongo, { serverSelectionTimeoutMS: 5000 });
	await conn.asPromise();
}

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

	// const conn = mongoose.createConnection(mongo, { serverSelectionTimeoutMS: 5000 });

	// await conn.asPromise();

	// await mongoose.createConnection(mongo, { serverSelectionTimeoutMS: 5000 });

	await establish_connect();

	switch (method) {
		case "GET":
			res.status(200).json({ success: true, data: "MOMs!1aa", other: mongoose.connection.readyState });
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
