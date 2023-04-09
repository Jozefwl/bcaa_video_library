import React, { useState } from "react";
import Card from "react-bootstrap/Card"; // import of Card component
import Icon from '@mdi/react' // component we will use to display the icon
import { mdiAccountSchoolOutline, mdiIdentifier, mdiTrashCanOutline } from '@mdi/js' // icons we want to use
import Col from 'react-bootstrap/Col';
import OkCancelModal from "./Modal";


function removeVideo(id, successF, errorF) {
  fetch("/api/videos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  }).then(res => res.ok ? successF() : errorF(res))
}

function Video({genre, name, link, id, callBackDelete}) {
  const [show, setShow] = useState(false)

  return (
    <Col>
      <Card>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
              <Card.Title>
                <Icon path={mdiAccountSchoolOutline} size={1.3} color="darkBlue"/>{" "}
                {name} {genre}
              </Card.Title>
              <Card.Text>
                <Icon path={mdiIdentifier} size={1.3} color="gray"/>{" "}
                {link}
              </Card.Text>
              <Card.Text 
                className="text-end" 
                onClick={() => setShow(true)}>
                <Icon path={mdiTrashCanOutline} size={1.3} color="red"/>{" "}
              </Card.Text>
            </Card.Body>
      </Card>
      <OkCancelModal 
        messageTitle="Delete" 
        message="Are you sure to delete item"
        show={show} 
        onOk={() => removeVideo(id,
          // succesF 
          () => {callBackDelete()},
          // errorF
          (res) => console.error(res))}
        onCancle={() => setShow(false)} />
    </Col>



  );
}

export default Video;
