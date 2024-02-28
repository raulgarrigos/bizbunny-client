import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import service from "../../services/config";
import BoardForm from "../../components/BoardForm";
import { SyncLoader } from "react-spinners";

import { Button } from "react-bootstrap";

function Boards() {
  const [boards, setBoards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await service.get("/boards");
      setBoards(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching boards:", error);
      redirect("/error");
      setIsLoading(false);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (isLoading) {
    return (
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SyncLoader color="white" size={30} />
      </div>
    );
  }

  return (
    <div className="boards-container">
      <h1 className="welcome-title">
        Welcome to BizBunny
        <img src="/images/bunny.png" alt="bunny logo" />
      </h1>

      {boards && boards.length > 0 ? (
        <div className="boards-list">
          {boards.map((board) => (
            <div className="board" key={board._id}>
              <Link to={`/boards/${board._id}`} className="custom-link">
                <h3>{board.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="create-board" onClick={handleShow}>
            Create your first BunnySpace
          </p>
        </div>
      )}

      <div className="boards-button">
        <Button
          variant="primary"
          className="custom-button"
          onClick={handleShow}
        >
          Create a workspace
        </Button>
      </div>

      <BoardForm
        fetchBoards={fetchBoards}
        showModal={showModal}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Boards;
