const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;
// Mock user data (replace with real data source)
const users = [
  { id: "1", name: "John", age: 30 },
  { id: "2", name: "Jane", age: 25 },
  { id: "3", name: "Emal", age: 32 },
];

const hobbes = [
  {
    id: "1",
    hobby: "Painting",
    description:
      "Creating art using various mediums such as oils, watercolors, or acrylics.",
    userId: "1"
  },
  {
    id: "2",
    hobby: "Gardening",
    description:
      "Cultivating and nurturing plants, flowers, and vegetables in a garden or outdoor space.",
      userId: "2"
  },
  {
    id: "3",
    hobby: "Cooking",
    description:
      "Preparing and creating dishes using various ingredients and cooking techniques.",
    userId: "1"
  },
];

const posts = [
  {
    id: "1",
    comment: "Great job on this post!",
    userId: "1"
  },
  {
    id: "2",
    comment: "Interesting perspective, I enjoyed reading this.",
    userId: "1"
  },
];

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user..",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: {
        type: new GraphQLList(PostType),
        resolve(parent, args) {
            // Find user by ID in the mock data
            return posts.filter(post => post.userId === parent.id);
          },
    },
    hobbes: {
        type: new GraphQLList(HobbyType),
        resolve(parent, args) {
            // Find user by ID in the mock data
            return hobbes.filter(hobby => hobby.userId === parent.id);
          },
    }
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Documentation for hobby..",
  fields: () => ({
    id: { type: GraphQLID },
    hobby: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
        type: UserType,
        resolve(parent, args) {
          // Find user by ID in the mock data
          return users.find((user) => user.id === parent.userId);
        },
      },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Documentation for post..",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // Find user by ID in the mock data
        return users.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Find user by ID in the mock data
        return users.find((user) => user.id === args.id);
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Find user by ID in the mock data
        return hobbes.find((hobby) => hobby.id === args.id);
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Find user by ID in the mock data
        return posts.find((post) => post.id === args.id);
      },
    },
  },
});

//Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString},
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age
        }
        return user
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
