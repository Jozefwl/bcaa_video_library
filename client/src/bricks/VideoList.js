import React, { useEffect } from "react";
import Video from "./Video";
import Row from 'react-bootstrap/Row';
import {useState} from "react"
import UploadVideo from "./UploadVideo";


// calling server to get DB_video.json
function getVideoList(filterCriteria, page, pageSize, callBack) {
  fetch("/api/videos?" + new URLSearchParams({filterCriteria, page, pageSize}).toString(), {
    method: "GET"
  })
    .then((res) => res.json())
    .then((data) => callBack(data))
}

function VideoList({searchCriteria}) {
  const [videoList, setVideoList] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [refreshCount, setRefreshCount] = useState(0)
  useEffect(() => getVideoList(searchCriteria, page, pageSize, setVideoList), [searchCriteria, refreshCount, page, pageSize])

   
    return (
      <div>
      <div>
        <Row>
          <UploadVideo callBackUpload={() =>  setRefreshCount(refreshCount+1) }/>
        </Row>
        </div>
        <div >
        <Row xs={3} md={4} lg={5} className="g-4 flex-wrap justify-content-center ps-4 pe-3">
          {videoList
            .map((video) => 
            <Video 
              key={video.id} 
              genre={video.genre} 
              link={video.link} 
              name={video.name} 
              id={video.id}
              callBackDelete={() => setRefreshCount(refreshCount+1)}
            />)}
        </Row>
      </div>
      </div>
    );

 
}
export default VideoList;

