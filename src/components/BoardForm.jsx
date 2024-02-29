import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function BoardForm({ fetchBoards, showModal, handleClose }) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for the list");
      return;
    }

    try {
      await service.post("/boards", {
        title,
        owner,
      });
      fetchBoards();

      setTitle("");
      handleClose();
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
              autoFocus
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
