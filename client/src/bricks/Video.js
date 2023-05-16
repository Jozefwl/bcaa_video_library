import React, { useState } from "react";
import Card from "react-bootstrap/Card"; // import of Card component
import Icon from '@mdi/react' // component we will use to display the icon
import { mdiBookOpenPageVariant, mdiVideoVintage,  mdiYoutube, mdiTrashCanOutline } from '@mdi/js' // icons we want to use
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
  let imagelink="http://img.youtube.com/vi/"+(link).substr(32)+"/0.jpg";

  return (
    <Col>
      <Card style={{ width: '12rem'}}>
      <Card.Img variant="top" src={imagelink} style={{height: '50%', objectFit: 'cover'}}/>
      <Card.Body>
              <Card.Title>
                <Icon path={mdiVideoVintage} size={1.2} color="#7AE6FC"/>{" "}
                {name}
                <br></br>
                <Icon path={mdiBookOpenPageVariant} size={1.2} color="#7AE6FC"/>{" "}
                {genre}
              </Card.Title>
              <Card.Text>
                <Icon path={mdiYoutube} size={1.2} color="red"/>{" "}
                <a href={link} target="_blank" rel="noreferrer">Link to video</a>
              </Card.Text>
              <Card.Text 
                className="text-end" 
                onClick={() => setShow(true)}>
                <Icon path={mdiTrashCanOutline} size={1.1} color="red"/>{" "}
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
        onCancel={() => setShow(false)} />
    </Col>



  );
}

export default Video;
