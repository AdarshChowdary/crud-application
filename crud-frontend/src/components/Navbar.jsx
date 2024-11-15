import PropTypes from "prop-types";

export default function Navbar({ onOpen, searchTerm, onSearch }) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          CRUD APP
        </a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by name"
            className="input input-bordered rounded-lg w-24 md:w-auto"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary rounded-lg" onClick={onOpen}>
          Add User
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
