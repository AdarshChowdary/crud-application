import PropTypes from "prop-types";
import { useState, useEffect } from "react";
export default function TableList({ handleOpen, searchTerm }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.id - b.id);
      setUsers(sortedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      // Close modal and refresh table
      setUserToDelete(null);
      // Call the fetchUsers function passed as prop
      fetchUsers();
    } catch (error) {
      console.log("Error while deleting user", error);
    }
  };

  // Add confirmation dialog handler
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.job.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}</span>
        </div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="hover">
              {/* row 1 */}
              {filteredUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.name}</th>
                    <td>{user.email}</td>
                    <td>{user.job}</td>
                    <td>{user.rate}</td>
                    <td>
                      <button
                        className={`btn rounded-full w-20 ${
                          user.isactive ? `btn-primary` : `btn-outline`
                        }`}
                      >
                        {user.isactive ? `Active` : `In Active`}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary rounded-lg"
                        onClick={() => {
                          handleOpen("edit", user);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning rounded-lg"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <dialog
        id="delete_modal"
        className="modal modal-bottom sm:modal-middle"
        open={userToDelete !== null}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete user &quot;{userToDelete?.name}
            &quot;? This action cannot be undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => handleDelete(userToDelete?.id)}
            >
              Delete
            </button>
            <button className="btn" onClick={() => setUserToDelete(null)}>
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setUserToDelete(null)}>close</button>
        </form>
      </dialog>
    </>
  );
}

TableList.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
