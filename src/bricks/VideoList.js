import React, { useEffect } from "react";
import Video from "./Video";
import Row from 'react-bootstrap/Row';
import {useState} from "react"
import UploadVideo from "./UploadVideo";


// calling server to get DB_video.json
function getVideoList(callBack) {
  fetch("/api/videos")
    .then((res) => res.json())
    .then((data) => callBack(data))
}

function VideoList() {
  const [videoList, setVideoList] = useState([])
  const [refreshCount, setRefreshCount] = useState(0)
  useEffect(() => getVideoList(setVideoList), [refreshCount])

   
    return (
      <>
        <Row>
          <UploadVideo callBackUpload={() =>  setRefreshCount(refreshCount+1) }/>
        </Row>

        <Row xs={3} md={6} className="g-4">
          {videoList.map((video) => 
            <Video 
              key={video.id} 
              genre={video.genre} 
              link={video.link} 
              name={video.name} 
              id={video.id}
              callBackDelete={() => setRefreshCount(refreshCount+1)}
            />)}
        </Row>
      </>
    );

 
}
export default VideoList;

