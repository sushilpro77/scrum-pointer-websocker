import React, {Suspense, lazy, useState, useEffect} from "react";
import {Button, Container, Form, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import PointerBoard from "./PointerBoard";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import Config from "../../Config";



const SessionLogin = () => {
  const {sessionId} = useParams();
  const [series, setSeries] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState('');
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = React.useState('');
  const [users, setUsers] = React.useState({});

  useEffect(() => {
    const fibonacciResult = number => {
      let n1 = 0, n2 = 1, nextTerm;
      //let seq = [n1,n2];
      let seq = [n1];
      nextTerm = n1 + n2;
      while (nextTerm <= number) {
        // print the next term
        seq.push(nextTerm)
        n1 = n2;
        n2 = nextTerm;
        nextTerm = n1 + n2;
      }
      return seq;
    };
    setSeries(fibonacciResult(100));
  }, [])
  const joinAsAPointerOnClicked = () => {
    if (name == null || name == "" || name.trim() == "") {
      setError(true);
      return;
    } else {
      connectWork();
    }
  }

  function connectWork() {
    const stompClient = Stomp.over(SockJS(Config.WS_URL))
    stompClient.connect({username: name, session:sessionId},
      () => {
        setStompClient(stompClient);
        stompClient.subscribe('/topic/public/'+sessionId, onMessageReceived);
        // Tell your username to the server

          stompClient.send("/app/addUser/"+sessionId,
            JSON.stringify({username: name, type:"JOIN"}),
            {username: name, session: sessionId ,type: "JOIN"}
          )
          setShow(true);

      }, onError)
  }

  function onMessageReceived(payload) {
    let message = JSON.parse(payload.body);
    console.log("+++++")
    console.log(message);
    console.log("-----")
    if(message.type == "DESCRIPTION"){
      setMessage(message.description)
    } else if(message.type == "JOIN"){
      setUsers(message.userPoint)
    }else if(message.type == "EXCEPTION"){
      console.log("EXCEPTION-Sushil")
    }
  }

  function onError(error) {
    //connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    //connectingElement.style.color = 'red';
    console.log("error");
    console.log(error);
  }

  const descriptionOnChange= (value) =>{
    //setMessage(value)
    //pass to WS
    if(stompClient) {
      let chatMessage = {
        description: value,
        type: 'DESCRIPTION'
      };

      stompClient.send("/app/sendDescription/"+sessionId, JSON.stringify(chatMessage), JSON.stringify(chatMessage));
      //messageInput.value = '';
    }
  }

  const joinAsAObserverOnClicked = () => {
    alert("not implemented")
  }

  return(
    <Container>
      {
        !show ? <>
            <h1>Session Login</h1>

            <h6 onClick={() => {navigator.clipboard.writeText(sessionId)}}>Session: {sessionId} <i>(Click to Copy)</i></h6>
            <div>
              <Form.Label htmlFor="name">Name:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder={"Enter Your Name"}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted hidden={!error}>
                Enter Your Name
              </Form.Text>
            </div>
            <div>
              <Button variant="primary" onClick={() => joinAsAPointerOnClicked()}>Join as a Pointer</Button>
              <Button variant="primary" onClick={() => joinAsAObserverOnClicked()}>Join as a Observer</Button>
            </div>
        </>
          :
          <>
            <h1>Pointer Board</h1>
            <h6 onClick={() => {navigator.clipboard.writeText(sessionId)}}>Session: {sessionId} <i>(Click to Copy)</i></h6>
            <h2>Hostname</h2>
            <div>
              <Form.Label htmlFor="inputPassword5">Story Description</Form.Label>
              <Form.Control
                type="textarea"
                id="inputDescription"
                aria-describedby="descriptionHelpBlock"
                value={message}
                onChange={(e) => descriptionOnChange(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Story
              </Form.Text>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Button variant="danger">Clear Vote</Button>
              <Button variant="primary">Show Vote</Button>
            </div>
            {/*point part*/}
            <div>
              {
                series.map((item, key) => {
                  return (
                    <Button variant="secondary" key={key}>{item}</Button>
                  )
                })
              }
            </div>
            {/*table*/}
            <Table responsive="sm">
              <thead>
              <tr>
                <th>Pointer</th>
                <th>Points</th>
              </tr>
              </thead>
              <tbody>
                { Object.entries(users).map(([key,value],k) =>
                  <tr key={k}>
                    <td>{key}</td>
                    <td>{value == -1 ? 'N/A' : value }</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
      }
    </Container>
  )
}

export default SessionLogin;
