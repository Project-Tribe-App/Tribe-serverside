

// this is just like controller and service section


const { UserPost } = require('../../models/userPost'); // The ../ notation is used to navigate up one directory level. Each ../ moves up one level in the directory hierarchy.

const userPostResolvers = {
    Query: {
        getUserPosts: async () => {
            try {
                const posts = await UserPost.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        getUserPost: async (_, { postId }) => {
            try {
                const post = await UserPost.findById(postId);
                return post;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        createUserPost: async (_, { title, caption, thumbnail, links, medias, tags }) => {
            const newPost = new UserPost({
                title,
                caption,
                thumbnail,
                links,
                medias,
                tags
            });

            const post = await newPost.save();
            return post;
        }
    }
};

module.exports = userPostResolvers;