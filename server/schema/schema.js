const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
// Mock user data (replace with real data source)
const users = [
    { id: '1', name: 'John', age: 30 },
    { id: '2', name: 'Jane', age: 25 }
];

const hobbes = [
    {
      "id": "1",
      "hobby": "Frodo Baggins",
      "description": "A hobbit from the Shire, tasked with destroying the One Ring in the fires of Mount Doom."
    },
    {
      "id": "2",
      "hobby": "Bilbo Baggins",
      "description": "The adventurous hobbit who found the One Ring and went on an unexpected journey."
    },
    {
      "id": "3",
      "hobby": "Samwise Gamgee",
      "description": "Frodo's loyal friend and companion, who accompanies him on the quest to destroy the One Ring."
    }
  ]

const comments =  [
    {
      "id": "1",
      "comment": "Great job on this post!"
    },
    {
      "id": "2",
      "comment": "Interesting perspective, I enjoyed reading this."
    }
  ]
  
  

const UserType = new GraphQLObjectType({
    name: 'User',
    description: "Documentation for user..",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: "Documentation for hobby..",
    fields: () => ({
        id: { type: GraphQLID },
        hobby: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: "Documentation for comment..",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Find user by ID in the mock data
                return users.find(user => user.id === args.id);
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Find user by ID in the mock data
                return hobbes.find(hobby => hobby.id === args.id);
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Find user by ID in the mock data
                return comments.find(comment => comment.id === args.id);
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
