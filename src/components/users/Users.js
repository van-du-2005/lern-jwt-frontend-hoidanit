import "./Users.scss";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "font-awesome/css/font-awesome.min.css";

import { getPaginatedUsers, deleteUser } from "../../services/userService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { useAuth } from "../../context/AuthContext";

const Users = (props) => {
  const [data, setData] = useState([]);
  const [limit, setlimit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // modal  delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [userDelete, setUserDelete] = useState({});

  // modal user/edit
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [titleModalUser, setTitleModalUser] = useState("");
  const [userDataEdit, setUserDataEdit] = useState({});
  const userContext = useAuth().user;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, totalPage, showToast]);

  useEffect(() => {
    fetchUsers();
  }, [isShowModalUser]);

  const fetchUsers = async () => {
    try {
      const user = await getPaginatedUsers(currentPage, limit);
      if (user && +user.EC === 0) {
        setData(user.DT.users);
        setTotalPage(user.DT.totalPage);
      } else {
        toast.error(user.EM);
      }
    } catch (error) {
      toast.error(error.EM);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handlerButtonDelete = async (user) => {
    setIsShowModalDelete(true);
    setUserDelete(user);
  };

  const handleButtonCreate = () => {
    setIsShowModalUser(true);
    setTitleModalUser("Create");
  };

  const handleButtonEdit = (user) => {
    setIsShowModalUser(true);
    setUserDataEdit(user);
    setTitleModalUser("Edit");
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
  };
  const handleCloseModalUser = () => {
    setIsShowModalUser(false);
  };

  const handleConfirmDelete = async () => {
    setIsShowModalDelete(false);
    setShowToast(false);
    const response = await deleteUser(userDelete.id);

    setShowToast(true);
    if (response && +response.EC === 0) {
      toast.success(response.EM);
      return;
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM);
      return;
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <>
      <div className="container">
        <div className="users-container">
          <div className="user-header">
            <div className="title">
              <h2>Manage users</h2>
            </div>
            <div className="actions my-2">
              <button
                className="btn btn-success refresh-btn"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh refresh-icon"></i>Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleButtonCreate();
                }}
              >
                <i className="fa fa-plus-circle add-user-icon"></i>
                Add new user
              </button>
            </div>
          </div>

          <div className="user-body pt-2">
            <div className="user-table">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col"> Phone number</th>
                    <th scope="col"> Username</th>
                    <th scope="col"> Group</th>
                    <th scope="col"> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((user, index) => {
                      return (
                        <tr key={`user-${user.id}`}>
                          <th scope="row">
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.username}</td>
                          <td>{user.Group ? user.Group.name : "no group"}</td>
                          <td>
                            <button
                              title="Edit"
                              className=" edit-btn actions-btn"
                              onClick={() => {
                                handleButtonEdit(user);
                              }}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              title="Delete"
                              className="delete-btn actions-btn"
                              onClick={() => {
                                handlerButtonDelete(user);
                              }}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="user-footer">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={totalPage}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>

      <ModalDelete
        handleShow={isShowModalDelete}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
      />

      <ModalUser
        handleShow={isShowModalUser}
        handleClose={handleCloseModalUser}
        title={titleModalUser}
        userDataEdit={userDataEdit}
      />
    </>
  );
};

export default Users;
