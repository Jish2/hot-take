import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const PostSchema = new Schema({
	title: { type: String, required: true },
	agree: { type: [String], required: true },
	disagree: { type: [String], required: true },
	votes: { type: Number, required: true },
	interactions: { type: Number, required: true },
	date: { type: Date, required: true, immutable: true },
});

// middleware populates votes and interactions
PostSchema.pre("save", function (next) {
	let agreeLength = this.agree.length;
	let disagreeLength = this.disagree.length;
	this.votes = agreeLength - disagreeLength;
	this.interactions = agreeLength + disagreeLength;
	next();
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
