
// this is like cobination of route and model section

const { gql } = require('graphql-tag');

const userPostTypeDefs = gql`
    type UserPost {
        postId: ID!
        title: String!
        caption: String
        thumbnail: String!
        links: [String]
        likes: Int
        createdBy: UserPrimary!
        comments: [Comment]
        medias: [String]
        tags: [String]
        createdAt: String!
    }

    type Query {
        getUserPosts: [UserPost]
        getUserPost(postId: ID!): UserPost  
    }

    type Mutation {
        createUserPost(title: String!, caption: String, thumbnail: String!, links: [String], medias: [String], tags: [String]): UserPost
        # updateUserPost(postId: ID!, title: String, caption: String, thumbnail: String, links: [String], medias: [String], tags: [String]): UserPost
        # deleteUserPost(postId: ID!): UserPost
    }
`;

module.exports = userPostTypeDefs;