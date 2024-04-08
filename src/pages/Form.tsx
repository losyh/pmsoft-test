import { useForm } from "react-hook-form"
import { useQuery } from "@apollo/client"
import { GET_BOOK_BY_ID } from "../apollo/queries"
import { useEffect } from "react";
import { Flex } from "antd";
import { Book } from "../types";

type Props = {
  onSubmit: (data: Book) => Promise<void>,
  bookId: number | null,
  resetForm: boolean | null
}


const Form = ({onSubmit, bookId, resetForm}: Props) => {
    const {data} = useQuery(GET_BOOK_BY_ID, {
      variables: { id: bookId },
    });
    const book = data ? data : null
    
  const {
      register,
      handleSubmit,
      reset
    } = useForm({
      defaultValues: {
        "name": "",
        "year": "",
        "genre": "",
        "author": "",
        "like": false
      },
    }) 

    useEffect(() => {
      if(resetForm){
        reset()
      }
    },[])

    useEffect(() => {
      if(book){
        reset(book.BookById)
      }
    }, [book, reset])
    

  return (
<form action="" onSubmit={handleSubmit(onSubmit)}>
  <Flex vertical>
    <label htmlFor="name" style={{marginBottom: '10px'}}>Name book</label>
    <input type="text" id="name" {...register("name", {required: true})} style={{padding: '5px', marginBottom: '10px'}}/>
    
    <label htmlFor="year" style={{marginBottom: '10px'}}>Year</label>
    <input type="number" id="year" {...register("year", {required: true})} style={{padding: '5px', marginBottom: '10px'}}/>
    
    <label htmlFor="genre" style={{marginBottom: '10px'}}>Genre</label>
    <select id="genre" {...register("genre", {required: true})} style={{padding: '5px', marginBottom: '10px'}}>
      <option value="">Select genre</option>
      <option value="Horror">Horror</option>
      <option value="Classics">Classics</option>
      <option value="Fantasy">Fantasy</option>
    </select>
    
    <label htmlFor="author" style={{marginBottom: '10px'}}>Author</label>
    <input type="text" id="author" {...register("author", {required: true})} style={{padding: '5px', marginBottom: '10px'}}/>
    
    <input type="submit" style={{padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}/>
  </Flex>
</form>
  )
}

export default Form