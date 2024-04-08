import { Button, Flex, Layout, Modal } from "antd"
import { useState } from "react";
import Form from "../Form";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../../apollo/queries";
import { Book } from "../../types";

type Props = {
    setGenreFilter: React.Dispatch<React.SetStateAction<string | null>>,
    refetchBooks: () => void
};

const AllBooksHeader = ({setGenreFilter, refetchBooks}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createBook] = useMutation(CREATE_BOOK);

    const onSubmit = async (data: Book) => {
        try {
            await createBook({ variables: { ...data } });
            setIsModalOpen(false);
            refetchBooks(); 
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <Flex justify='space-around' align='center'>
            <h1 style={{color: 'black'}}>All books</h1>
            <Flex style={{borderRadius: '10px', border: '2px solid black', padding: 10, height: '75px'}} content='center' align='center'>
                <span style={{color: 'black'}}>
                    Choose a genre: 
                </span>
                <Layout >
                    <Flex >
                    <Button style={{ width: '70px'}} onClick={() => setGenreFilter(null)}>All</Button>
                    <Button style={{ width: '70px'}} onClick={() => setGenreFilter('Classics')}>Classics</Button>
                    <Button style={{ width: '70px'}} onClick={() => setGenreFilter('Horror')} >Horror</Button>
                    <Button style={{ width: '70px'}} onClick={() => setGenreFilter('Fantasy')}>Fantasy</Button>
                    </Flex>
                </Layout>
            </Flex>
            <Button onClick={() => setIsModalOpen(true)}>Add new book</Button>
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form onSubmit={onSubmit} bookId={null} resetForm={true}/>
            </Modal>
        </Flex>
    )
}

export default AllBooksHeader