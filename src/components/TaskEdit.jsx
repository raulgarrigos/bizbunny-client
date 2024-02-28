import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { Modal, Form, Button } from "react-bootstrap";

function TaskEdit({
  fetchTasks,
  showModalEdit,
  handleCloseEdit,
  task,
  listId,
  taskId,
  taskDetails,
  setTaskDetails,
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const redirect = useNavigate();
  const params = useParams();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task.title, task.description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
    };

    try {
      await service.put(
        `/boards/${params.boardId}/lists/${listId}/tasks/${taskId}`,
        updatedTask
      );
      fetchTasks();
      handleCloseEdit();
    } catch (error) {
      console.error("Error editing task:", error);
      redirect("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(
        `/boards/${params.boardId}/lists/${listId}/tasks/${taskId}`
      );

      const updatedTasks = taskDetails.filter((task) => task._id !== taskId);
      setTaskDetails(updatedTasks);
      console.log("Deleted");

      if (updatedTasks.length === 0) {
        fetchTasks();
      }
      handleCloseEdit();
    } catch (error) {
      console.error("Error deleting task:", error);
      redirect("/error");
    }
  };

  return (
    <div>
      <Modal show={showModalEdit} onHide={handleCloseEdit} centered>
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
            <Button variant="danger" onClick={handleDelete}>
              Delete task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TaskEdit;
