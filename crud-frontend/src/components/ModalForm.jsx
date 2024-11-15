import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  onSubmit,
  userData,
}) {
  const [rate, setRate] = useState("");
  const [name, setName] = useState(""); // State for Name
  const [email, setEmail] = useState(""); // State for Email
  const [job, setJob] = useState(""); // State for Job
  const [status, setStatus] = useState(false); // State for Status

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active"); // Set status as boolean
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        job,
        rate: Number(rate),
        isactive: status,
      };
      await onSubmit(userData);
      onClose();
    } catch (error) {
      console.log("Error while adding user", error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && userData) {
      setName(userData.name);
      setEmail(userData.email);
      setJob(userData.job);
      setRate(userData.rate);
      setStatus(userData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [userData, mode]);

  return (
    <>
      {/* The "open" attribute is used to open the modal. */}
      <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
        <div className="modal-box">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            // This is for closing the modal.
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit User" : "User Details"}
          </h3>

          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex my-4 items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex my-4 items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="abc@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex my-4 items-center gap-2">
              Job
              <input
                type="text"
                className="grow"
                placeholder="Software Developer"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <div className="flex mb-4 justify-between">
              <label className="input input-bordered flex items-center mr-4 gap-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  placeholder="99"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>

              <select
                className="select select-bordered w-full max-w-xs"
                value={status === true ? "Active" : "In Active"}
                onChange={handleStatusChange}
              >
                <option>In Active</option>
                <option>Active</option>
              </select>
            </div>
            <button type="submit" className=" btn btn-success">
              {/* The mode value could be either "add" or "edit" */}
              {mode === "edit" ? "Save Changes" : "Add User"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

ModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  userData: PropTypes.object,
};
