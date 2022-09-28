const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
} = require('../utils');

// GET request for notes
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// // GET request for single note
// router.get('/notes/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/db.json')
//   .then((data) => JSON.parse(data))
//   .then((json) => {
//     const result = json.filter((note) => note.note_id === noteId);
//     return result.length > 0
//       ? res.json(result)
//       : res.json('No note with that ID');  
//   });
// });

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
//   // console.log("req params", req.params.id)
//   const noteId = req.params.id;
//   const newNotes = res.json(JSON.parse(noteId))
//   readFromFile('./db/db.json').then((data) => res.json(newNotes));
//   writeToFile('./db/db.json')


// });

// DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

module.exports = router