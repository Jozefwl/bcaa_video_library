import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function newVideo(name, genre, link, language, successF, errorF) {
  fetch("/api/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, genre, link, language})
  }).then(res => res.ok ? successF() : errorF(res))
  
}

function UploadVideo({callBackUpload}) {
  const [hidden, setVisible] = useState(true)

  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [link, setLink] = useState("")
  const [language, setLanguage] = useState("")
  return (
    <div>
      <Button variant="outline-success" onClick={() => setVisible(!hidden)}>{hidden ? "Upload" : "Cancel"}</Button>
      <Form hidden={hidden}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Genre" 
          value={genre}
          onChange={(e) =>setGenre(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label>Link</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Link" 
          value={link}
          onChange={(e) =>setLink(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Language"
          value={language} 
          onChange={(e) =>setLanguage(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="button" 
          disabled={
            name === "" ||
            genre === "" ||
            link === "" ||
            language === "" 
            }
            onClick={() => {
              newVideo(name, genre, link, language,
                // succesF
                () =>  {
                  setName("")
                  setGenre("")
                  setLink("")
                  setLanguage("")
                  callBackUpload()
              },
              // errorF
              (res) => { 
                console.error(res)
              })
            }}
            >
          Submit
        </Button>
      </Form>


    </div>
  )
}

export default UploadVideo