// ListForm.js
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";

function ListForm({ boardId, fetchLists, showModal, handleClose }) {
  const [title, setTitle] = useState("");
  const redirect = useNavigate();

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se haya ingresado un título antes de enviar el formulario
    if (!title.trim()) {
      alert("Please enter a title for the list");
      return;
    }
    // Realizar la solicitud al backend para crear un nuevo tablero
    try {
      await service.post(`/boards/${params.boardId}/lists`, {
        title,
        boardId,
      });
      fetchLists();

      // Limpiar los campos después de enviar el formulario
      setTitle("");
      handleClose(); // Cerrar el modal después de crear el tablero
    } catch (error) {
      console.error("Error creating list:", error);
      redirect("/error");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0079bf" }}>
          Create a New List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="formTitle" style={{ marginBottom: "1rem" }}>
            <Form.Label style={{ color: "#0079bf" }}>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus // Autofocus en el campo de título
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ListForm;
