import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
query GetBooks($limit: Int, $offset: Int) {
  books(limit: $limit, offset: $offset) {
    id
    name
    author
    genre
    like
    year
  }
}
`;

export const UPDATE_BOOK =  gql`
mutation UpdateBook($id:ID!, $name: String, $year: String, $genre: String, $author: String){
  updateBook(id: $id, name: $name, genre:$genre, year: $year, author: $author){
    id
    name
    genre
    year
    author
  }
}
`

export const DELETE_BOOK = gql`
mutation DeleteBook($deleteBookId: ID!){
  deleteBook(id: $deleteBookId)
}
`
export const GET_BOOK_BY_ID = gql`
query BookById($id: ID!) {
  BookById(id: $id) {
    id
    name
    year
    genre
    author
  }
}
`;

export const CREATE_BOOK = gql`
mutation AddBook($name: String!, $genre: String!, $author: String!, $year: String!, $like: Boolean) {
  addBook(name: $name, genre: $genre, author: $author, year: $year, like: $like) {
    author
    genre
    id
    like
    name
    year
  }
}`

export const UPDATE_BOOK_LIKE = gql`
mutation UpdateBookLike($id: ID!, $like: Boolean) {
  updateBook(id: $id, like: $like) {
    id
    name
    genre
    year
    author
    like
  }
}
`