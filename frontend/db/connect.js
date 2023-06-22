import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Local dev method
// async function connect() {
// 	if (process.env.NEXT_PUBLIC_ENVIRONMENT === "LOCAL") {
// 		/**
// 		 * Global is used here to maintain a cached connection across hot reloads
// 		 * in development. This prevents connections growing exponentially
// 		 * during API Route usage.
// 		 */
// 		let cached = global.mongoose;

// 		if (!cached) {
// 			cached = global.mongoose = { conn: null, promise: null };
// 		}

// 		if (cached.conn) {
// 			return cached.conn;
// 		}

// 		if (!cached.promise) {
// 			mongoose.set("strictQuery", false);

// 			cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
// 				return mongoose;
// 			});
// 		}

// 		try {
// 			cached.conn = await cached.promise;
// 		} catch (e) {
// 			cached.promise = null;
// 			throw e;
// 		}

// 		return cached.conn;
// 	} else {
// 		mongoose.set("strictQuery", false);

// 		mongoose.connect(MONGODB_URI).then((mongoose) => {
// 			return mongoose;
// 		});
// 	}
// }

// let cached = global.mongoose;

// if (!cached) {
// 	cached = global.mongoose = { conn: null, promise: null };
// }

// async function connect() {
// 	if (cached.conn) {
// 		return cached.conn;
// 	}

// 	if (!cached.promise) {
// 		mongoose.set("strictQuery", true);

// 		const opts = {
// 			bufferCommands: true,
// 		};

// 		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
// 			return mongoose;
// 		});
// 	}

// 	try {
// 		cached.conn = await cached.promise;
// 	} catch (e) {
// 		cached.promise = null;
// 		throw e;
// 	}

// 	return cached.conn;
// }

async function connect() {
	mongoose.set("strictQuery", true);
	mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

	// alt method
	// const conn = mongoose.createConnection(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
	// await conn.asPromise();
}

export default connect;
