import "../styles/Home.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { BiLike, BiSolidLike } from "react-icons/bi";

import switchLike from "../libs/switchLike";
import getCreator from "../libs/getCreator";

import Header from "../components/Header";
import getVideos from "../libs/getVideos";

function Home() {
  const [videos, setVideos] = useState([]);
  const [myLikedVideos, setMyLikedVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const auth = useAuthUser();

  const fetch = async () => {
    const res = await getVideos();

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    setVideos(res.videos);

    const ress = await getCreator(auth().creatorId);

    if (ress.message) {
      setErrorMessage(ress.message);
      return;
    }

    setMyLikedVideos(ress.creator.liked_videos);
  };

  useEffect(() => {
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeClick = async (id_video) => {
    const res = await switchLike(id_video, auth().creatorId);

    console.log(res);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    console.log(myLikedVideos);

    fetch();
  };

  let renderedVideos;
  if (videos.length === 0) {
    renderedVideos = (
      <div className="Home-NoVideosContainer">
        <p>No videos available...</p>
      </div>
    );
  } else {
    renderedVideos = videos.map((v) => {
      let likeButton;
      if (typeof myLikedVideos === "undefined") {
        likeButton = <BiLike />;
      } else if (myLikedVideos.includes(v.id_video)) {
        likeButton = <BiSolidLike />;
      } else {
        likeButton = <BiLike />;
      }
      return (
        <div key={v.id_video} className="Home-VideoContainer">
          <iframe
            width="300"
            height="169"
            src={v.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="Home-FrameContainer"
          ></iframe>
          <div className="Home-VideoSubContainer">
            <div className="Home-VideoLeft">
              <h3 className="Home-VideoTitle">{v.title}</h3>
              <label className="Home-VideoDate">
                Date Uploaded: {v.date.slice(0, 10)}
              </label>
            </div>
            <button
              onClick={() => handleLikeClick(v.id_video)}
              className="Home-LikeButton"
            >
              {likeButton}
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="Home-Container">
        <div className="Home-Top">
          <h2 className="Home-Title">All published videos</h2>
          <button
            onClick={() => navigate("/creators")}
            className="Home-CreatorsButton"
          >
            All Creators
          </button>
        </div>
        <div className="Home-Bottom">
          {errorMessage ? (
            <div className="Home-Error">{errorMessage}</div>
          ) : (
            renderedVideos
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
