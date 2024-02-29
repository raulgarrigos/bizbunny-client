import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";

function BoardEdit({
  fetchDetails,
  showModal,
  handleClose,
  initialTitle,
  initialDescription,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const redirect = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBoard = {
      title,
      description,
    };

    try {
      await service.put(`/boards/${params.boardId}`, updatedBoard);
      fetchDetails();
      handleClose();
    } catch (error) {
      console.log("Error editing board:", error);
      redirect("/error");
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#0079bf" }}>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group controlId="formTitle" style={{ marginBottom: "1rem" }}>
              <Form.Label style={{ color: "#0079bf" }}>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId="formDescription"
              style={{ marginBottom: "1rem" }}
            >
              <Form.Label style={{ color: "#0079bf" }}>Description:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BoardEdit;
