import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// importing data
import db from "./_db.js";
// types
import { typeDefs } from "./schema.js";
// Data Set - Define the structure of our data
// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];
// Resolver - It tells the Apollo Server "how" to fetch the data associated with a particular type.
//  Resolver for Static book data
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };
// Resolver for Dynamic data coming from Database
const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id);
        }
    },
    // Game: {
    //   reviews(parent) {
    //     return db.reviews.filter(review => review.game_id === parent.id)
    //   }
    // },
    // Author: {
    //   reviews(parent) {
    //     return db.reviews.filter(review => review.author_id === parent.id)
    //   }
    // },
    // Review: {
    //   author(parent) {
    //     return db.authors.find(author => author.id === parent.author_id)
    //   },
    //   game(parent) {
    //     return db.games.find(game => game.id === parent.game_id)
    //   }
    // }
};
// Apollo Server -
// ApolloServer constructor requires two parameters: Schema definition and your set resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the 'startStandaloneServer' function:
// 1. Create an Express app
// 2. INstalls our ApolloServer instance as middleware
// 3. prepare your app to handle incoming server.
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`Server ready at ${url}`);
