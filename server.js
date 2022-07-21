//Import dependencies & files
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require("./db/db.json")

//Create local host port
const PORT = process.env.PORT || 3001;

//Create express app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//HTML Route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text
    };

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    // Write the string to a file
    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);