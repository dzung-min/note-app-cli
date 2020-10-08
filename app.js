const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes");

yargs.command({
  command: "add",
  aliases: ["a"],
  desc: "Add note",
  builder: {
    title: {
      desc: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      desc: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  aliases: ["rm"],
  desc: "Remove note",
  handler(argv) {
    notes.removeNote(argv.title);
  },
  builder: {
    title: {
      desc: "Note title",
      demandOption: true,
      type: "string",
    },
  },
});

yargs.command({
  command: "list",
  aliases: ["ls"],
  desc: "List all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  aliases: ["r"],
  desc: "Read note",
  builder: {
    title: {
      desc: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
