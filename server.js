import { ApolloServer, gql } from 'apollo-server';
import { promises as fsPromises } from 'fs';

const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    year: String!
    genre: String!
    author: String!
    like: Boolean!
  }

  type Query {
    books(limit: Int, offset: Int): [Book]
    BookById(id: ID!): Book
  }

  type Mutation {
    addBook(name: String!, year: String!, genre: String!, author: String!, like: Boolean): Book
    updateBook(id: ID!, name: String, year: String, genre: String, author: String, like: Boolean): Book
    deleteBook(id: ID!): String
  }
`;

let data; // Переменная для хранения данных книг

const resolvers = {
  Query: {
    books: (_, { limit = 12, offset = 0 }) => {
      const slicedBooks = data.books.slice(offset, offset + limit);
      return slicedBooks;
    },
    BookById: (_, { id }) => data.books.find(book => book.id === id)
  },
  Mutation: {
    addBook: (parent, args) => {
        const newBook = { id: String(data.books.length + 1), ...args };
        data.books.push(newBook);
        fsPromises.writeFile('./db.json', JSON.stringify(data, null, 2));
        return newBook;
    },
    updateBook: (parent, { id, ...args }) => {
        const book = data.books.find(book => book.id === id);
        if (!book) {
            throw new Error('Book not found');
        }
        Object.assign(book, args);
        fsPromises.writeFile('./db.json', JSON.stringify(data, null, 2));
        return book;
    },
    deleteBook: (parent, { id }) => {
        data.books = data.books.filter(book => book.id !== id);
        fsPromises.writeFile('./db.json', JSON.stringify(data, null, 2));
        return `Book with id ${id} deleted`;
    }
  }
};

const loadData = async () => {
  try {
    const rawData = await fsPromises.readFile('./db.json', 'utf-8');
    data = JSON.parse(rawData);
  } catch (error) {
    console.error(error);
    data = { books: [] }; // Если не удалось прочитать файл, устанавливаем пустой массив книг
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

loadData().then(() => {
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});