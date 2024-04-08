import { Button, Layout, Row } from 'antd';
import AllBooksHeader from './AllBooksHeader';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_BOOK, GET_ALL_BOOKS } from '../../apollo/queries';
import { useEffect, useState } from 'react';
import CardBook from './CardBook';
import { Book } from '../../types';

const PAGE_SIZE = 20;

const AllBoocks = () => {
    const [booksItems, setBooksItem] = useState<Book[]>([]);
    const [genreFilter, setGenreFilter] = useState<string | null>(null);
    const { loading, data, fetchMore, refetch } = useQuery(GET_ALL_BOOKS, {
        variables: {
            limit: PAGE_SIZE,
            offset: 0
        }
    });
    const [removeBook] = useMutation(DELETE_BOOK);

    const filteredBooks = genreFilter ? booksItems.filter((item) => item.genre === genreFilter) : booksItems;

    useEffect(() => {
        if (data) {
            setBooksItem(data.books);
        }
    }, [data]);


    const loadMore = () => {
        fetchMore({
            variables: {
                offset: booksItems.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    books: [...prev.books, ...fetchMoreResult.books]
                });
            }
        });
    };

    const handleDeleteBook = async (bookId: number) => {
        await removeBook({ variables: { deleteBookId: bookId } });
        refetch();
    };

    const refetchBooks = () => {
        refetch();
    };


    return (
        <Layout>
            <AllBooksHeader setGenreFilter={setGenreFilter} refetchBooks={refetchBooks}/>
            <Layout style={{ padding: 32, backgroundColor: 'white', height: '70vh', overflowY: 'auto', width: '100%' }}>
                <Row gutter={16} >
                    {filteredBooks.map((item) => (
                        <CardBook item={item} key={item.id} onDelete={handleDeleteBook}/>
                    ))}
                </Row>
                {loading ? <span>Loading...</span>: null}
                {filteredBooks.length % 20 == 0 ? <Button onClick={loadMore}>Load More</Button>: null}
            </Layout>
        </Layout>
    );
};

export default AllBoocks;
