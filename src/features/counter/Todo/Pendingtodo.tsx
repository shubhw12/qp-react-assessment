import React, { useState } from 'react'
import { todoProps } from '../../../app/Interfaces/InterFaces'
import { Form, Button, ButtonGroup, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo, faClock, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'


const PendingTodo = (props: todoProps) => {

  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form.Group key={props.index} className='todoCard align-items-center m-1 p-2 border justify-content-between'>
        <Form.Control
          aria-label="To Do title"
          aria-describedby="titile"
          value={props.todoTitle}
          name="todoTitle"
          placeholder='Enter the things to do'
          disabled={isEdit}
          onChange={(event: any) => props.handleEdit(event, props.index)}
        />
        <Form.Control
          aria-label="To do description"
          aria-describedby="Descrition"
          value={props.todoDescription}
          placeholder='Enter the description'
          name="todoDescription"
          disabled={isEdit}
          className='mt-2'
          onChange={(event: any) => props.handleEdit(event, props.index)}
        />
        <ButtonGroup className='d-flex justify-content-end mt-2'>
          {isEdit && <Button onClick={(e: React.MouseEvent) => props.handleComplete(e, props.index)}> Complete <FontAwesomeIcon icon={faCheck} /></Button>}
          {isEdit && <Button onClick={() => props.handleDelete(props.index)} > Delete <FontAwesomeIcon icon={faTrash} /> </Button>}
          <Button onClick={() => setIsEdit(!isEdit)} > {isEdit ? <> Edit <FontAwesomeIcon icon={faFilePen} /> </> : "Done"} </Button>
          <Button onClick={handleShow} ><FontAwesomeIcon icon={faCircleInfo} /></Button>
        </ButtonGroup>
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className='d-flex flex-column align-items-center'>
            <h2 className="display-5">{props.todoTitle}</h2>
            <h4 className="display-8" >{props.todoDescription}</h4>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default PendingTodo