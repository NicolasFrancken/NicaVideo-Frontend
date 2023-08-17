import "../styles/UploadModal.css";

import { createPortal } from "react-dom";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

import uploadVideo from "../libs/uploadVideo";

function UploadModal({ fetch }) {
  const [showModal, setShowModal] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useAuthUser();

  const handleTitleInputChange = (event) => {
    setErrorMessage("");
    setTitleValue(event.target.value);
  };

  const handleUrlInputChange = (event) => {
    setErrorMessage("");
    setUrlValue(event.target.value);
  };

  const handleUploadClick = () => {
    setShowModal(!showModal);
  };

  const handleErrorClick = () => {
    setShowModal(false);
    setErrorMessage("");
    setTitleValue("");
    setUrlValue("");
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();

    if (titleValue === "" || urlValue === "") {
      setErrorMessage("Fields should not be empty");
      return;
    }

    const res = await uploadVideo(auth().creatorId, urlValue, titleValue);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    setShowModal(!showModal);
    fetch();
  };

  const modal = createPortal(
    <>
      <div className="UploadModal-GreyContainer"></div>
      <div className="UploadModal-Container">
        <button onClick={handleErrorClick} className="UploadModal-CancelButton">
          X
        </button>
        <form className="UploadModal-Form" onSubmit={handleUploadSubmit}>
          <input
            placeholder="Title"
            onChange={handleTitleInputChange}
            value={titleValue}
            className="UploadModal-Input"
          />
          <input
            placeholder="URL"
            onChange={handleUrlInputChange}
            value={urlValue}
            className="UploadModal-Input"
          />
          {errorMessage ? (
            <div className="UploadModal-ErrorContainer">
              <label className="UploadModal-ErrorLabel">{errorMessage}</label>
            </div>
          ) : (
            ""
          )}
          <button type="submit" className="UploadModal-SubmitButton">
            Upload
          </button>
        </form>
      </div>
    </>,
    document.getElementById("modal-root")
  );

  return showModal === true ? (
    modal
  ) : (
    <button className="UploadModal-Button" onClick={handleUploadClick}>
      Upload Video
    </button>
  );
}

export default UploadModal;
