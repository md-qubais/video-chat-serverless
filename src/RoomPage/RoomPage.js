import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import { connect } from "react-redux";
import { setTwilioAccessToken } from "../store/actions";
import { getTokenFromTwilio } from "../utils/twilioUtils";
import Overlay from "./Overlay";

import "./RoomPage.css";

const RoomPage = (props) => {
  const history = useHistory();
  const { identity, roomId, setTwilioAccessTokenAction, showOverlay } = props;

  useEffect(() => {
    if (!identity || !roomId) {
      history.push("/");
    } else getTokenFromTwilio(setTwilioAccessTokenAction, identity);
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setTwilioAccessTokenAction: (token) =>
      dispatch(setTwilioAccessToken(token)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomPage);
