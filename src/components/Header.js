import "../styles/Header.css";

import { IoIosPerson } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="Header-Container">
      <h1
        className="Header-Title"
        onClick={() => {
          navigate("/videos");
        }}
      >
        NicaVideo
      </h1>
      <button
        variant="outlined"
        className="Header-Button"
        onClick={() => {
          navigate("/profile/1");
        }}
      >
        <IoIosPerson className="Header-Icon" />
      </button>
    </header>
  );
}
