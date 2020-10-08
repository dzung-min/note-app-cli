const fs = require("fs");
const chalk = require("chalk");

function addNote(title, body) {
  const notes = loadNotes();
  // make sure there is no duplicate note
  if (notes.every((note) => note.title !== title)) {
    notes.push({
      title: title,
      body: body,
    });
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync("notes.json", notesJson);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title already exist!"));
  }
}

function removeNote(title) {
  const notes = loadNotes();
  if (notes.every((note) => note.title !== title)) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    const filteredNotes = notes.filter((note) => note.title !== title);
    fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));
    console.log(chalk.green("Note has been removed!"));
  }
}

function listNotes() {
  const notes = loadNotes();
  console.log(chalk.gray.inverse("Your notes:"));
  notes.forEach((note) => {
    console.log(chalk.green(note.title));
  });
}

function readNote(title) {
  const notes = loadNotes();
  if (notes.every((note) => note.title !== title)) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    const note = notes.filter((note) => note.title === title);
    console.log(chalk.green(note[0].body));
  }
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const data = JSON.parse(dataBuffer.toString());
    return data;
  } catch (error) {
    return [];
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
