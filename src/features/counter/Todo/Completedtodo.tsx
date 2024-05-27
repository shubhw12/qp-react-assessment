import React, { useState } from 'react'
import { todoProps } from '../../../app/Interfaces/InterFaces'
import { Form, Button, ButtonGroup, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons'


const Completedtodo = (props: todoProps) => {

  const [isEdit, setIsEdit] = useState<boolean>(true)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div key={props.index} className='d-flex flex-wrap todoCard align-items-center m-1 p-2 border justify-content-between'>
        <div className="text-wrap text-break ">
          <p className='text-decoration-line-through text-wrap'>{props.todoTitle} </p>
          <p className='text-decoration-line-through text-wrap'>{props.todoDescription} </p>
        </div>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={(e: React.MouseEvent) => props.handleComplete(e, props.index)}><FontAwesomeIcon icon={faArrowRotateLeft} /></Button>
          <Button onClick={() => props.handleDelete(props.index)} > <FontAwesomeIcon icon={faTrash} /> </Button>
          {/* <Button onClick={} > <FontAwesomeIcon icon={faTrash} /> </Button> */}
          <Button onClick={handleShow} ><FontAwesomeIcon icon={faCircleInfo} /></Button>
        </ButtonGroup>
      </div>
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

export default Completedtodo