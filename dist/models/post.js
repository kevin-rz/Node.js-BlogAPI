"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    tittle: String,
    date: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    totalComments: Number,
    content: String,
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment'
        }]
});
var Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
//# sourceMappingURL=post.js.map