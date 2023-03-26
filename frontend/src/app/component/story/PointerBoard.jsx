import React, {useEffect} from "react";
import {Button, Container, Form} from "react-bootstrap";

const PointerBoard = (props) => {
  const {stompClient} = props;
  const [series, setSeries] = React.useState([]);
  const [message, setMessage] = React.useState('');

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

  useEffect(() => {
    console.log("from description"+message);
    if(stompClient) {
      let chatMessage = {
        sender: "hari",
        content: message,
        type: 'DESCRIPTION'
      };

      stompClient.send("/app/sendDescription", JSON.stringify(chatMessage), JSON.stringify(chatMessage));
      //messageInput.value = '';
    }
  }, [message]);

  return(
    <>
      <h1>Pointer Board</h1>
      <h2>Hostname</h2>
      <div>
        <Form.Label htmlFor="inputPassword5">Story Description</Form.Label>
        <Form.Control
          type="textarea"
          id="inputDescription"
          aria-describedby="descriptionHelpBlock"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
    </>
  )
}

export default PointerBoard;
