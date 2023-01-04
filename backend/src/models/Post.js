import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const PostSchema = new Schema({
	title: String,
	agree: [String],
	disagree: [String],
	votes: Number,
	interactions: Number,
	date: Date,
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
