// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// export const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//   # This "Book" type defines the queryable fields for every book in our data source.
//   # type Book {
//   #   title: String
//   #   author: String
//   # }
//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   # type Query {
//   #   books: [Book]
//   # }
// `;
export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]!             # Building relation with the "Review" and each game has multiple review so using the []
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!                     # Building relation with the "Game" data
    author: Author!                 # Building relation with the "Author" data
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!             # Building relation with the "Review" and every author has multiple review so using the []
  }
  type Query {
    games: [Game]
    game(id: ID!): Game             # Get the Game data based on the ID(dynamically from the frontend)
    reviews: [Review]
    review(id: ID!): Review         # Get the Review data based on the ID(dynamically from frontend)
    authors: [Author]
    author(id: ID!): Author         # Get the Author data based on the ID(dynamically from the frontend)
  }

  type Mutation {
    deleteGame(id: ID!) : [Game]
    addGame(game: AddGameInput!) : Game
    updateGame(id: ID!, edits: EditGameInput!) : Game
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }
  input EditGameInput {
    title: String
    platform: [String!]
  }

`;
// int, float, string, boolean, ID (unique identifier)
// here "!" is used to telll that it is required field and cant be null
