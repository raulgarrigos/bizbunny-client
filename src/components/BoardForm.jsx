import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function BoardForm({ fetchBoards, showModal, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");

  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se haya ingresado un título antes de enviar el formulario
    if (!title.trim()) {
      alert("Please enter a title for the list");
      return;
    }
    // Realizar la solicitud al backend para crear un nuevo tablero
    try {
      const response = await service.post("/boards", {
        title,
        description,
        owner,
      });
      fetchBoards();

      // Limpiar los campos después de enviar el formulario
      setTitle("");
      setDescription("");
      handleClose(); // Cerrar el modal después de crear el tablero
    } catch (error) {
      console.error("Error creating board:", error);
      redirect("/error");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Board</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="formTitle" style={{ marginBottom: "1rem" }}>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus // Autofocus en el campo de título
            />
          </Form.Group>

          <Form.Group
            controlId="formDescription"
            style={{ marginBottom: "1rem" }}
          >
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formOwner" style={{ marginBottom: "1rem" }}>
            <Form.Label>Owner:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="outline-secondary"
            className="custom-button"
            type="submit"
          >
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BoardForm;
