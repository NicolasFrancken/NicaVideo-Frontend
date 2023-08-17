import "../styles/Error.css";

import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="Error-Container">
      <h2 className="Error-Title">PAGE NOT FOUND!</h2>
      <button
        onClick={() => {
          navigate("/signin");
        }}
        className="Error-Button"
      >
        Go back
      </button>
    </div>
  );
}

export default Error;
