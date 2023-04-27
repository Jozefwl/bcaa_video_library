import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Programming",
  "Romance",
  "Thriller",
  "Tech",
  "Coocking",
];

function newVideo(name, genre, link, language, image, successF, errorF) {
  fetch("/api/videos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, genre, link, language, image }),
  }).then((res) => (res.ok ? successF() : errorF(res)));
}

function UploadVideo({ callBackUpload }) {
  const [hidden, setVisible] = useState(true);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [language, setLanguage] = useState("");

  const [selectedGenres, setSelectedGenres] = useState("");

  const [image, setImage] = useState(null); // add a state for the image

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Button variant="outline-success" onClick={() => setVisible(!hidden)}>
            {hidden ? "Upload" : "Cancel"}
          </Button>
          <Form hidden={hidden}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                value={selectedGenres}
                onChange={(e) => setSelectedGenres(e.target.value)}
              >
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Image</Form.Label>
              <input
                class="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              disabled={
                name === "" ||
                selectedGenres === "" ||
                link === "" ||
                language === ""
              }
              onClick={() => {
                newVideo(
                  name,
                  selectedGenres,
                  link,
                  language,
                  // succesF
                  () => {
                    setName("");
                    setSelectedGenres("");
                    setLink("");
                    setLanguage("");
                    callBackUpload();
                  },
                  // errorF
                  (res) => {
                    console.error(res);
                  }
                );
              }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UploadVideo;
