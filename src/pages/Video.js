import "../styles/Video.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import getVideo from "../libs/getVideo";
import updateVideo from "../libs/updateVideo";
import Header from "../components/Header";
import deleteVideo from "../libs/deleteVideo";

function Video() {
  const [errorMessage, setErrorMessage] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const navigate = useNavigate();
  const { videoId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await getVideo(videoId);

      if (res.message) {
        setErrorMessage(res.message);
        return;
      }

      setTitleValue(res.video.title);
      setUrlValue(res.video.url);
    };
    fetch();
  }, [videoId]);

  const handleTitleInputChange = (event) => {
    setErrorMessage("");
    setTitleValue(event.target.value);
  };

  const handleUrlInputChange = (event) => {
    setErrorMessage("");
    setUrlValue(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    if (titleValue === "" || urlValue === "") {
      setErrorMessage("Fields should not be empty");
      return;
    }

    const res = await updateVideo(videoId, urlValue, titleValue);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    navigate("/profile/1");
  };

  const handleDeleteClick = async () => {
    const res = await deleteVideo(videoId);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    navigate(`/profile/1`);
  };

  return (
    <>
      <Header />
      <div className="Video-Container">
        <iframe
          width="560"
          height="315"
          src={urlValue}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="Video-VideoContainer"
        ></iframe>
        <form onSubmit={handleUpdateSubmit} className="Video-Form">
          <input
            value={titleValue}
            onChange={handleTitleInputChange}
            className="Video-Input"
          />
          <input
            value={urlValue}
            onChange={handleUrlInputChange}
            className="Video-Input"
          />
          {errorMessage ? (
            <div className="Video-ErrorContainer">
              <label className="Video-ErrorLabel">{errorMessage}</label>
            </div>
          ) : (
            ""
          )}
          <div className="Video-ButtonsContainer">
            <button onClick={handleDeleteClick} className="Video-Button">
              Delete
            </button>
            <button type="submit" className="Video-Button">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Video;
