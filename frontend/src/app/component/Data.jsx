import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Config from "../Config";

const Data = () => {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    await axios.get(Config.BASE_URL + 'posts')
      .then(function (response) {
        // handle success
        setData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Services</th>
            <th>Version</th>
            <th>Last Deployed</th>
            <th>Branch</th>
            <th>Author</th>
            <th>Health Status</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => {
              return (
                <tr key={item.id}>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              )
            })
          }


        </tbody>
      </Table>
    </Container>
  )
}



export default Data;