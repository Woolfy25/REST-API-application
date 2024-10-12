const express = require("express");
const app = express();
const port = 3000;

const agenda = [
  {
    nume: "Ramon",
    age: "black",
  },
  {
    nume: "Ari",
    age: "18",
  },
];

//MIDDLEWARE

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Middleware!");
//   next();
// });

//GET

app.get("/info", (req, res) => {
  res.json(agenda);
});

//PARAMS 1

app.get("/info/:nume", (req, res) => {
  const name = req.params.nume;
  const contact = agenda.find((person) => person.nume === name);

  res.json(contact);
});

//PARAMS 2

app.get("/adunare/:nr1/:nr2", (req, res) => {
  const nr1 = req.params.nr1;
  const nr2 = req.params.nr2;
  const suma = +nr1 + +nr2;
  res.send(`suma este ${suma}`);
});

//POST

app.post("/contacts", (req, res) => {
  console.log(req.body);
  const contact = req.body;
  res.send(`Nume: ${contact.name}, mesaj: ${contact.mesaj}`);
});

// GET ORA

app.get("/ora", (req, res) => {
  const oraCurenta = new Date().toLocaleTimeString();
  res.send(oraCurenta);
});

//delete

app.delete("/info/:nameDelet", (req, res) => {
  const name = req.params.nameDelet;
  const showContacts = agenda.filter((element) => element.nume !== name);
  res.json(showContacts);
});

app.listen(port, () => {
  console.log(`Aplicatia ruleaza pe portul ${port}!`);
});
