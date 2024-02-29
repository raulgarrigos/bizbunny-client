import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import service from "../services/config";

function TaskForm({ listId, fetchTasks, showModalForm, handleCloseForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const params = useParams();
  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for the task");
      return;
    }

    try {
      await service.post(`boards/${params.boardId}/lists/${listId}/tasks`, {
        title,
        description,
        completed,
        listId,
      });
      fetchTasks();

      setTitle("");
      setDescription("");
      handleCloseForm();
    } catch (error) {
      console.error("Error creating task:", error);
      redirect("/error");
    }
  };
  return (
    <Modal show={showModalForm} onHide={handleCloseForm} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0079bf" }}>
          Create a New Task
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

          <Form.Group
            controlId="formDescription"
            style={{ marginBottom: "1rem" }}
          >
            <Form.Label style={{ color: "#0079bf" }}>Description:</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

TaskForm.propTypes = {
  listId: PropTypes.string.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  showModalForm: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

export default TaskForm;
