import "../styles/Creators.css";

import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import switchFollow from "../libs/switchFollow";
import getCreator from "../libs/getCreator";
import getCreators from "../libs/getCreators";

import Header from "../components/Header";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [myFollows, setMyFollows] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useAuthUser();

  const fetch = async () => {
    const res = await getCreators(auth().creatorId);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    setCreators(res.creators);

    const ress = await getCreator(auth().creatorId);

    if (ress.message) {
      setErrorMessage(ress.message);
      return;
    }

    setMyFollows(ress.creator.follows);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFollowClick = async (followCreatorId) => {
    const res = await switchFollow(followCreatorId, auth().creatorId);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    fetch();
  };

  let renderedCreators;
  if (creators.length === 0) {
    renderedCreators = (
      <div>
        <p>No other creators available...</p>
      </div>
    );
  } else {
    renderedCreators = creators.map((c) => {
      let followButton;
      if (typeof myFollows === "undefined") {
        followButton = "Follow";
      } else if (myFollows.includes(c.id_creator)) {
        followButton = "Unfollow";
      } else {
        followButton = "Follow";
      }

      return (
        <div key={c.id_creator} className="Creators-CreatorContainer">
          <div className="Creators-Left">
            <img src={c.image} alt="Profile" className="Creators-Image" />
            <h3 className="Creators-Name">{c.name}</h3>
          </div>
          <button
            onClick={() => handleFollowClick(c.id_creator)}
            className="Creators-FollowButton"
          >
            {followButton}
          </button>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="Creators-Container">
        <div className="Creators-Top">
          <h2 className="Creators-Title">All creators</h2>
        </div>
        {errorMessage ? (
          <div className="Creators-Error">{errorMessage}</div>
        ) : (
          renderedCreators
        )}
      </div>
    </>
  );
}

export default Creators;
