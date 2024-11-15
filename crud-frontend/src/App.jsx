import { useState } from "react";
import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";

export default function App() {
  // This one is for modal dialog. It is used to open and close the modal.
  const [isOpen, setIsOpen] = useState(false);
  // This one is for Add User dialog (or) Edit User dialog.
  const [modalMode, setModalMode] = useState("add");

  const [searchTerm, setSearchTerm] = useState("");

  const [userData, setUserData] = useState(null);

  const handleOpen = (mode, userData) => {
    setUserData(userData);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newUserData) => {
    if (modalMode === "add") {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        });
        console.log("User added successfully", response.data);
        setIsOpen(false);
      } catch (error) {
        console.log("Error while adding user", error);
      }
      console.log("Add User");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserData),
          }
        );
        console.log("User updated successfully", response);
        setIsOpen(false);
      } catch (error) {
        console.log("Error while updating user", error);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Navbar
        // Here, we are passing handleOpen as a prop to Navbar component.
        onOpen={() => {
          // Here, we are calling handleOpen with "add" mode.
          handleOpen("add");
        }}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      {/* Here, we are passing handleOpen as a prop to TableList component. */}
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        mode={modalMode}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        // This is for closing the modal.
        onClose={() => {
          setIsOpen(false);
        }}
        userData={userData}
      />
    </>
  );
}
