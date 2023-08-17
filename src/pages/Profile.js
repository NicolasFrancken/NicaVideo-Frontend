import "../styles/Profile.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";

import getCreatorVideos from "../libs/getCreatorVideos";
import publishSwitch from "../libs/publishSwitch";

import UploadModal from "../components/UploadModal";
import Header from "../components/Header";

function Profile() {
  const [creatorVideos, setCreatorVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const fetch = async () => {
    const res = await getCreatorVideos(auth().creatorId);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    setCreatorVideos(res.videos);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handlePublishClick = async (id) => {
    const res = await publishSwitch(id);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    fetch();
  };

  const handleSignoutClick = () => {
    signOut();
    navigate("/signin");
  };

  let renderedVideos;
  if (creatorVideos.length === 0) {
    renderedVideos = (
      <div className="Profile-NoVideosContainer">
        <p>No videos uploaded yet...</p>
      </div>
    );
  } else {
    renderedVideos = creatorVideos.map((v) => {
      return (
        <div key={v.id_video} className="Profile-VideoContainer">
          <iframe
            width="300"
            height="169"
            src={v.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="Profile-FrameContainer"
          ></iframe>
          <h3 className="Profile-VideoTitle">{v.title}</h3>
          <label className="Profile-VideoDate">
            Date Uploaded: {v.date.slice(0, 10)}
          </label>
          <div className="Profile-VideoButtonsContainer">
            <button
              onClick={() => handlePublishClick(v.id_video)}
              className="Profile-VideoButton"
            >
              {v.published === true ? "Unpublish" : "Publish"}
            </button>
            <button
              onClick={() => navigate(`/videos/${v.id_video}`)}
              className="Profile-VideoButton"
            >
              Details
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="Profile-Container">
        <div className="Profile-Top">
          <h2 className="Profile-Title">My Videos</h2>
          <button
            onClick={handleSignoutClick}
            className="Profile-SignoutButton"
          >
            Sign out
          </button>
        </div>
        <div className="Profile-Bottom">
          {errorMessage ? (
            <div className="Profile-Error">{errorMessage}</div>
          ) : (
            renderedVideos
          )}
          <UploadModal fetch={fetch} />
        </div>
      </div>
    </>
  );
}

export default Profile;
