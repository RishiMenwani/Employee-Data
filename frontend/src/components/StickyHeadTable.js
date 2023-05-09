import * as React from "react";
import Paper from "@mui/material/Paper";

import "./StickyHeadTable.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/base";

import logo from "./../assessts/kick_out.gif";

import "@fortawesome/fontawesome-free/css/all.min.css";
import EditModal from "./EditModel";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mobileNo",
    label: "Mobile No.",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "post",
    label: "Post",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable(props) {
  const [showGif, setShowGif] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);
  const[editData , setEditData] = useState({})

  // let counter = 1;

  const {
    setPage,
    page,
    pageNotFound,
    setLimit,
    limit,
    handleDeleteApp,
    handleModalOpen,
    fetchData
  } = props;
  const { entries } = props;

  const setGifFalse =() => {
    setShowGif(false)
  }

  const fireUser = (firstName) => {
    // setShowGif(true)
    // setTimeout(setGifFalse , 2000)
    toast.success(`  ${firstName} Fired`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    

  };
  const handleLeft = () => {
    setPage((prepag) => --prepag);
  };

  const handleRight = () => {
    setPage((prepag) => ++prepag);
  };

  const handleDelete = (id) => {
    console.log(id);
    handleDeleteApp(id);
  };

  return (
    <div
      style={{
        height: 400,
        width: "55%",
        margin: "auto",
        marginTop: "1%",
        borderRadius: "20px",
      }}
    >
      {!pageNotFound && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "2px solid #C0C0C0",
          }}
        >
          {showGif && (
            <img src={require("./../assessts/kick_out.gif")} alt="out" />
          )}
          <div className="tableContainer">

          <table class="data-table">
            <thead>
              <tr>
                <th class="profile-header">Profile</th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    align={column.align}
                    className="firstname-header"
                  >
                    {column.label}
                  </th>
                ))}
                <th>Edit Emp</th>
                <th>Fire Emp</th>
              </tr>
            </thead>
          { openEditModal? <EditModal open={openEditModal} handleClose={handleEditModalClose} setOpen={setOpenEditModal} data ={editData} fetchData={fetchData} /> : <></>}
            <tbody>
              {entries.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="profile-cell">
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          row.profile
                            ? row.profile
                            : `/static/images/avatar/1.jpg`
                        }
                      >
                        {row.firstName[0]}
                      </Avatar>
                    </td>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <td
                          className="firstname-cell"
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </td>
                      );
                    })}
                    <td>
                      <button
                        className="edit-button"
                        onClick={(id) => {
                          
                          handleEditModalOpen();
                          setEditData(row)
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={(id) => {
                          fireUser(row.firstName);
                          setShowGif(false)
                          // handleDelete(row._id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </Paper>
      )}
      {pageNotFound && (
        <div
          style={{
            textDecorationStyle: "solid",
            fontSize: "50px",
            textAlign: "center",
            border: "2px solid #C0C0C0",
            padding: "100px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src="img/no_data.jpg"
            width="500"
            height="250"
            alt="No data"
          ></img>
          <div
            style={{
              fontFamily: "Lucidatypewriter",
              fontSize: "30px",
              color: "#708090",
            }}
          >
            Data Not Found
          </div>
          <Button
            className="green-button"
            onClick={handleModalOpen}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              width: "15%",

              marginLeft: "10%",
              marginTop: "8%",
            }}
          >
            Add Data
          </Button>
        </div>
      )}

      <div
        style={{
          alignItems: "right",
          display: "flex",
          justifyContent: "right",
          float: "right",
          border: "2px solid #C0C0C0",
          width: "100%",
          marginTop: "5px",
          borderRadius: "10px",
          marginBottom: "50px",
        }}
      >
        <div class="pagination">
          <input
            type="number"
            class="limit-input"
            placeholder="Limit"
            value={limit}
            min={1}
            onChange={(e) => setLimit(e.target.value)}
            disabled={pageNotFound ? true : false}
          />
          <button
            class="previous-page"
            onClick={handleLeft}
            disabled={page === 1 ? true : false}
          >
            Previous
          </button>
          <span class="page-number">{page}</span>
          <button
            class="next-page"
            onClick={handleRight}
            disabled={pageNotFound ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
