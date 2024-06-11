const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = morgan("dev");
const data = require("./db.json");
const PORT = 8080;

app.use(logger);

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to the Lab Daniel just did!!",
  });
});

app.get("/people", (req, res) => {
  res.json(data);
});

app.get("/people/:personId", (req, res) => {
  const { personId } = req.params;
  const singlePerson = data.find((person) => person.id.toString() === personId);

  if (!singlePerson) {
    res.json({ message: "Try again with a different person" });
  }
  res.json(singlePerson);
});

app.get("/people/country/:country", (req, res) => {
    const { country } = req.params;
    const peopleByCountry =  data.filter((selectedCountry) => selectedCountry.country.replace(/\s+/g, '').toLowerCase() === country);

    res.json(peopleByCountry);
});

app.get("/people/profession/:profession", (req, res) => {
    const { profession } = req.params;
    const getProfessions = data.filter((selectedProfession) => selectedProfession.profession.replace(/\s+/g, '').toLowerCase() === profession);

    res.json(getProfessions);
})

app.get("/people/age/:age", (req, res) => {
  const { age } = req.params;
  const peopleByAge = data.filter((person) => person.age >= age);
res.json(peopleByAge);

})

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
