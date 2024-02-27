import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/config";
import TaskForm from "./TaskForm";
import TaskEdit from "./TaskEdit";
import { Button } from "react-bootstrap";

function Tasks({ listId }) {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetchTasks();
  }, [listId]);

  const fetchTasks = async () => {
    try {
      const response = await service.get(
        `/boards/${params.boardId}/lists/${listId}/tasks`
      );
      setTaskDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setIsLoading(false);
    }
  };

  const handleShowForm = () => {
    setShowModalForm(true);
    setShowModalEdit(false);
    setSelectedTaskId(null);
  };

  const handleShowEdit = (taskId) => {
    setShowModalForm(false);
    setShowModalEdit(true);
    setSelectedTaskId(taskId);
  };

  const handleCloseForm = () => {
    setShowModalForm(false);
  };

  const handleCloseEdit = () => {
    setShowModalEdit(false);
    setSelectedTaskId(null);
  };

  const handleEditComplete = (completed) => {
    setShowModalEdit(false);
    setSelectedTaskId(null);
    fetchTasks();
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTasks = taskDetails.map((task) => {
        if (task._id === taskId) {
          // Toggle the completion status of the task
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      // Update the state with the modified tasks
      setTaskDetails(updatedTasks);

      // Update the task's completion status on the server
      await service.put(
        `/boards/${params.boardId}/lists/${listId}/tasks/${taskId}`,
        {
          completed: !taskDetails.find((task) => task._id === taskId).completed,
        }
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  if (isLoading) {
    return <h3>Loading tasks...</h3>;
  }

  return (
    <div className="task-container-wrapper">
      <ul
        className="task-list"
        style={{ listStyleType: "none", margin: 0, padding: 0 }}
      >
        {taskDetails && taskDetails.length > 0 ? (
          taskDetails.map((task) => (
            <li key={task._id} className="task-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task._id)}
              />
              <p
                onClick={() => handleShowEdit(task._id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </p>
              <TaskEdit
                fetchTasks={fetchTasks}
                showModalEdit={showModalEdit && selectedTaskId === task._id}
                handleCloseEdit={handleCloseEdit}
                task={task}
                listId={listId}
                taskId={task._id}
                onEditComplete={handleEditComplete}
              />
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
      <Button className="add-task-button" onClick={handleShowForm}>
        Add Task
      </Button>
      <TaskForm
        fetchTasks={fetchTasks}
        showModalForm={showModalForm}
        handleCloseForm={handleCloseForm}
        boardId={params}
        listId={listId}
      />
    </div>
  );
}

export default Tasks;
