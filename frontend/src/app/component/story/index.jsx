import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Config from "../../Config";


const StoryHome = () => {
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  const startSessionOnClicked = async () => {
    await axios.get(Config.POINTER_BASE_URL+'token')
      .then(function (response) {
        console.log(response.data)
        navigate("/session/"+response.data)
        // navigate("/session/" + response.data.session, {state: {name: response.data.name,ssid: response.data.session}});
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }

  const startSessionWithIDOnClicked = () => {
    navigate("/session/"+sessionId);
  }

  return(
    <Container>
      <h1>Story Pointer</h1>
      <p>Welcome to Story Pointer</p>
      <div>
        <Button variant="primary" onClick={() => startSessionOnClicked()}>Start Session</Button>
        <p>OR</p>
        <div>
          <Form.Control
            type="text"
            id="sessionId"
            placeholder={"Enter Session ID"}
            onChange={(e) => setSessionId(e.target.value)}
          />
        <Button variant="primary" onClick={() => startSessionWithIDOnClicked()}>Join a Session</Button>

        </div>
      </div>

    </Container>
  )
}


export default StoryHome;
