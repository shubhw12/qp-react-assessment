import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,  Form, Button,  Modal, Tab, Tabs  } from 'react-bootstrap';
import { todoObject } from './app/Interfaces/InterFaces';
import PendingTodo from './features/counter/Todo/Pendingtodo';
import Completedtodo from './features/counter/Todo/Completedtodo';
import Pagination from './features/counter/Paginaton/Pagination';
import records from './records'

function App() {

  const [todos, setTodos] = useState<todoObject[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [todoDesc, setTodoDesc] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<todoObject[]>([]);

  const [pendingTodos, setPendingTodos] = useState<todoObject[]>(todos.filter((curr: todoObject, index: number) => { return curr.status === "pending" }))
  const [completedTodos, setCompletedTodo] = useState<todoObject[]>(todos.filter((curr: todoObject, index: number) => { return curr.status === "completed" }))

  const [completedcurrentPage, setcompletedCurrentPage] = useState(1);
  const [pendingcurrentPage, setpendingCurrentPage] = useState(1);

  const [postsPerPage] = useState(6);


  useEffect(() => {
    setPendingTodos(todos.filter((curr: todoObject, index: number) => { return curr.status === "pending" }))
    setCompletedTodo(todos.filter((curr: todoObject, index: number) => { return curr.status === "completed" }))
  }, [todos])

  const [show, setShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = todos.filter((item: todoObject) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDesc(e.target.value)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim() !== '') {
      setTodos([{ title: todoText, status: "pending", description: todoDesc }, ...todos]);
      setTodoText('');
      setTodoDesc('');
    }
  };

  const handleComplete = (e: React.MouseEvent, index: number) => {
    let tempTodo = [...pendingTodos]
    let splicedElement = tempTodo.splice(index, 1)
    splicedElement[0].status = 'completed'
    setPendingTodos(tempTodo)
    setCompletedTodo([...splicedElement, ...completedTodos])
  }

  const handlePending = (e: React.MouseEvent, index: number) => {
    let tempTodo = [...completedTodos]
    let splicedElement = tempTodo.splice(index, 1)
    splicedElement[0].status = 'pending'
    setPendingTodos([...splicedElement, ...pendingTodos])
    setCompletedTodo(tempTodo)
  }

  const handleEdit = (e: any, index: number) => {
    let tempTodo = [...pendingTodos]
    e.target.name === "todoTitle" ? tempTodo[index].title = e.target.value : tempTodo[index].description = e.target.value
    setPendingTodos(tempTodo)
  }

  const handleDelete = (index: number) => {
    let tempTodo = [...todos]
    tempTodo.splice(index, 1)
    setTodos(tempTodo)
  }

  // Get current posts
  const pendingindexOfLastPost = pendingcurrentPage * postsPerPage;
  const pendingIndexOfFirstPost = pendingindexOfLastPost - postsPerPage;
  const pendingTodoslist = pendingTodos.slice(pendingIndexOfFirstPost, pendingindexOfLastPost);

  console.log(pendingTodoslist)

  const completedindexOfLastPost = completedcurrentPage * postsPerPage;
  const completedIndexOfFirstPost = completedindexOfLastPost - postsPerPage;
  const completedTodoslist = completedTodos.slice(completedIndexOfFirstPost, completedindexOfLastPost);

  console.log(completedTodoslist)

  // Change page
  const pendingPaginate = (pageNumber: number) => setpendingCurrentPage(pageNumber);
  const completedPaginate = (pageNumber: number) => setcompletedCurrentPage(pageNumber);



  return (
    <>
      <div className='d-flex mt-2 justify-content-center'>
        <h1 className="display-1" >Prioritize Your Day </h1>
      </div>
      <div className='d-flex mt-2 justify-content-center'>
        <Button variant="outline-secondary" onClick={handleShow}>
          Add To Do Item
        </Button>
      </div>
      <div className='w-50 d-flex mt-2 justify-content-center'>
        {/* <Form onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form> */}
      </div>
      <Container>
        <Tabs
          defaultActiveKey="home"
          id="id1"
          className="mb-3 mt-3 "
          justify
        >
          <Tab eventKey="home" title="Pending">
            {todos.length > 0 && <p className="display-4">Lets do this </p>}
            <div className="d-flex flex-wrap jusify-space-between m-2">
              {pendingTodoslist.length > 0 && pendingTodoslist.map((todo: todoObject, index: number) => (
                todo?.status === "pending" ?
                  <PendingTodo todoTitle={todo.title}
                    todoDescription={todo.description}
                    status={todo.status}
                    index={index}
                    handleEdit={handleEdit}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete} /> : <></>
              ))}
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={pendingTodos.length}
              paginate={pendingPaginate}
            />
          </Tab>
          <Tab eventKey="profile" title="Completed">
            <p className="display-4">And Thats Done! </p>
            <div className='d-flex justify-content-center'>
            <div className="d-flex flex-wrap jusify-space-evenly m-2">
              {completedTodoslist.length > 0 && completedTodoslist.map((todo: todoObject, index: number) => (
                todo?.status === "completed" ?
                  <Completedtodo todoTitle={todo.title}
                    status={todo.status}
                    todoDescription={todo.description}
                    index={index}
                    handleEdit={handleEdit}
                    handleComplete={handlePending}
                    handleDelete={handleDelete} /> : <></>
              ))}
            </div>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={completedTodos.length}
              paginate={completedPaginate}
            />
          </Tab>
        </Tabs>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-3" onSubmit={handleFormSubmit}>
            <Form.Group className=''>
              {/* <InputGroup className="mb-3"> */}
              <Form.Control
                aria-label="Enter your to do item"
                aria-describedby="to do item"
                value={todoText}
                placeholder='Enter the things to do'
                className='text-wrap text-break mt-2'
                onChange={handleInputChange}
              />

              <Form.Control
                aria-label="Enter your to do item"
                aria-describedby="to do item"
                value={todoDesc}
                placeholder='Enter To do Description'
                className='text-wrap text-break mt-2'
                onChange={handleDescChange}
              />

              {/* </InputGroup> */}
            </Form.Group>
            <div className="d-flex mt-2 justify-content-center">
              <Button type='submit' onClick={handleClose} variant="outline-secondary" id="button-addon1">
                Add To Do
              </Button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
