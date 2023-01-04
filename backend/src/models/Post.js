import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const PostSchema = new Schema({
	title: { types: String, required: true },
	agree: { types: [String], required: true },
	disagree: { types: [String], required: true },
	votes: { types: Number, required: true, immutable: true },
	interactions: { types: Number, required: true, immutable: true },
	date: { types: Date, required: true, immutable: true },
});

PostSchema.pre("save", (next) => {
	agreeLength = this.agree.length;
	disagreeLength = this.disagree.length;
	this.votes = agreeLength - disagreeLength;
	this.interactions = agreeLength + disagreeLength;
	next();
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
