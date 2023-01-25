import bcrypt from "bcrypt";

function hash(pass) {
	return bcrypt.hash(pass, 8, (err, hash) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(hash);
	});
}

async function comparement(pass, hashed) {
	const res = await bcrypt.compare(pass, hashed);
	console.log(res);
}

hash("georgia");
