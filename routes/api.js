const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  // writeToFile
} = require('../utils');

// GET request for notes
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST request to add a note
router.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json')
    res.json('note added')
  } else {
    res.error("error adding new note")
  }
});

// DELETE request for note

// router.delete("/notes/:id", (req, res) => {
//   const noteId = req.params.id;
//   readFromFile("./db/db.json")
//   .then((data) => JSON.parse(data))
//   .then((json) => {
//     console.log(data)
//     // // Make a new array of all tips except the one with the ID provided in the URL
//     // // const result = json.filter((note) => note.id !== noteId);
//     // const result = json.filter((note) => console.log(note));
//     // // Save that array to the filesystem
//     // writeToFile('./db/db.json', result);
//     // // Respond to the DELETE request
//     // res.json(`Item has been deleted 🗑️`);
//   });
// });

module.exports = router