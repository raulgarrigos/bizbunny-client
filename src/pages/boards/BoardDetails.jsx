import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import service from "../../services/config";
import BoardEdit from "../../components/BoardEdit";
import Lists from "../../components/Lists";

function BoardDetails() {
  const [boardDetails, setBoardDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const redirect = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchDetails();
  }, [params.boardId]);

  const fetchDetails = async () => {
    try {
      const response = await service.get(`/boards/${params.boardId}`);
      console.log(response.data);
      setBoardDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching details:", error);
      setIsLoading(false);
      redirect("/error");
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await service.delete(`/boards/${params.boardId}`);
      redirect("/");
    } catch (error) {
      redirect("/error");
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BeatLoader color="white" size={30} />
      </div>
    );
  }

  return (
    <div className="board-details">
      <div className="board-details-info">
        <h3>{boardDetails.title}</h3>
        <p> by {boardDetails.owner}</p>
      </div>
      <div className="board-details-lists">
        <Lists />
      </div>
      <div className="board-details-buttons">
        <Button
          variant="primary"
          className="custom-button"
          onClick={handleShow}
        >
          Edit board
        </Button>
        <BoardEdit
          fetchDetails={fetchDetails}
          showModal={showModal}
          handleClose={handleClose}
          initialTitle={boardDetails.title}
          initialDescription={boardDetails.description}
        />
        <Button
          variant="danger"
          className="custom-button-details"
          onClick={handleDelete}
        >
          Delete board
        </Button>
        <Button variant="warning" className="custom-button-details">
          <Link to="/">Return</Link>
        </Button>
      </div>
    </div>
  );
}

export default BoardDetails;
