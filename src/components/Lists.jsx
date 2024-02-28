import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import ListForm from "./ListForm";
import Tasks from "./Tasks";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import { ListThemeContext } from "../context/listTheme.context";

const themes = [
  "default-list",
  "cotton-list",
  "astra-list",
  "heliotrope-list",
  "tropical-list",
  "moonraker-list",
  "spray-list",
  "pastel-list",
  "reef-list",
  "magic-list",
];

function Lists() {
  const [listDetails, setListDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const redirect = useNavigate();

  const { toggleListTheme, getListTheme } = useContext(ListThemeContext);

  useEffect(() => {
    fetchLists();
  }, [params.boardId]);

  const fetchLists = async () => {
    try {
      const response = await service.get(`/boards/${params.boardId}/lists`);
      setListDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching lists", error);
      setIsLoading(false);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async (listId) => {
    try {
      await service.delete(`/boards/${params.boardId}/lists/${listId}`);

      const updatedLists = listDetails.filter((list) => list._id !== listId);
      setListDetails(updatedLists);
      console.log("Deleted");

      if (updatedLists.length === 0) {
        fetchLists();
      } else {
        fetchLists();
      }
    } catch (error) {
      console.error("Error deleting list:", error);
      redirect("/error");
    }
  };

  const handleThemeChange = (listId, theme) => {
    toggleListTheme(listId, theme);
  };

  const themeColors = {
    "default-list": "#f4f5f7",
    "cotton-list": "#FFBBDA",
    "astra-list": "#FDFFB6",
    "heliotrope-list": "#9381FF",
    "tropical-list": "#C0E4F6",
    "moonraker-list": "#E8CFF8",
    "spray-list": "#90F1EF",
    "pastel-list": "#FFD6E0",
    "reef-list": "#C1FBA4",
    "magic-list": "#7BF1A8",
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
        <SyncLoader color="white" size={30} />
      </div>
    );
  }

  return (
    <div className="lists-all">
      {listDetails && listDetails.length > 0 ? (
        listDetails.map((list) => (
          <div
            key={list._id}
            className={`list-details ${getListTheme(list._id)}`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
              }}
            >
              <p className="list-details-title">{list.title}</p>
              <DropdownButton id="dropdown-basic-button" title="">
                {/* Primer fila */}
                <div style={{ display: "flex" }}>
                  {themes.slice(0, 5).map((theme, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleThemeChange(list._id, theme)}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: themeColors[theme],
                        }}
                      ></div>
                    </Dropdown.Item>
                  ))}
                </div>
                {/* Segunda fila */}
                <div style={{ display: "flex" }}>
                  {themes.slice(5).map((theme, index) => (
                    <Dropdown.Item
                      key={index + 5}
                      onClick={() => handleThemeChange(list._id, theme)}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: themeColors[theme],
                        }}
                      ></div>
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            </div>
            <Tasks listId={list._id} />
            <Button
              variant="danger"
              className="list-details-delete-button"
              onClick={() => handleDelete(list._id)}
            >
              Delete list
            </Button>
          </div>
        ))
      ) : (
        <p className="no-lists">No lists found.</p>
      )}
      <div className="list-button">
        <Button
          variant="primary"
          className="custom-button-list"
          onClick={handleShow}
        >
          Create list
        </Button>
        <ListForm
          fetchLists={fetchLists}
          showModal={showModal}
          handleClose={handleClose}
          boardId={params}
        />
      </div>
    </div>
  );
}

export default Lists;
