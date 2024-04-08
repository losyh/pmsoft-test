import { Card, Col, Flex, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, HeartTwoTone } from '@ant-design/icons'
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK, UPDATE_BOOK_LIKE } from '../../apollo/queries';
import { useState } from 'react';
import { Book } from '../../types';
import Form from '../Form';

type Props = {
    item: Book,
    onDelete: (bookId: number) => Promise<void>
}

const CardBook = ({item, onDelete}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateBook] = useMutation(UPDATE_BOOK);
    const [updateBookLike] = useMutation(UPDATE_BOOK_LIKE);


    const handleDeleteBook = () => {
        onDelete(item.id);
    };
    const onSubmit = async (data: Book) => {
        await updateBook({ variables: {...data} });
        setIsModalOpen(false);
    };

    const handleLikeToggle = async () => {
        try {
            const newLikeValue = !item.like;
            await updateBookLike({ variables: { id: item.id, like: newLikeValue } });
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };



    return (
        <Col span={6}>
            <Card title={item.name} style={{ width: 300, margin: 16 }}>
                <Flex vertical>
                    <span>Year of release: {item.year}</span>
                    <span>Genre: {item.genre}</span>
                    <span>Аuthor: {item.author}</span>
                    <Flex align='center' justify='space-between' style={{marginTop: 20}}>
                        <EditOutlined onClick={() => setIsModalOpen(true)}/>
                        <HeartTwoTone twoToneColor={item.like ? "#eb2f96" : '#C0C0C0'} onClick={handleLikeToggle}/>
                        <DeleteOutlined onClick={handleDeleteBook}/>
                    </Flex>
                </Flex>
            </Card>
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form onSubmit={onSubmit} bookId={item.id} resetForm={false}/>
            </Modal>
        </Col>
    )
}

export default CardBook