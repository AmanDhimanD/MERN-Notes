const express = require("express");
const fd = require("fs");
const app = express();

app.use(express.json());

//get user
app.get("/", (req, res) => {
  fd.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(errr);
      req.send("Reading Error");
      return;
    }
    let jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

// Read a specific user
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  fd.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      req.send("Reading Error");
      return;
    }
    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send("Error parsing data file");
      return;
    }

    const entry = jsonData.find((item) => item.id === userId);

    if (!entry) {
      console.log("User not Found");
      return;
    }
    res.send(entry);
  });
  // Logic to fetch a specific user by ID
  //res.send(`User ${userId}`);
});

//add user
app.post("/add", (req, res) => {
  const date = Date.now();
  //const user = req.body;
  const user = {
    id: date,
    name: req.body.name,
  };

  //console.log(user);
  fd.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(errr);
      res.status(500).send("Error in Reading file");
      return;
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send("Error parsing data file");
      return;
    }

    jsonData.push(user);

    fd.writeFile("data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error in write the file");
        return;
      }
      res.send({ message: "Data Add Successfully" });
    });
  });
});

// Update a user
app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const UpdateName = req.body;

  fd.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send("Error parsing data file");
      return;
    }

    const index = jsonData.findIndex((item) => item.id === userId);

    if (index === -1) {
      res.status(404).send("User Not found");
      return;
    }

    jsonData[index] = { ...jsonData[index], ...UpdateName };

    fd.writeFile("data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing data file");
        return;
      }

      res.send({ message: "Data updated successfully" });
    });
    // // Logic to update a specific user by ID
    // res.send(`User ${userId} updated`);
  });
});

//delete user
app.delete("/delete/:id", (req, res) => {
  const userId = Number(req.params.id);

  fd.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      req.send("Reading Error");
      return;
    }
    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send("Error parsing data file");
      return;
    }

    const index = jsonData.findIndex((item) => item.id === userId);
    if (index === -1) {
      res.status(404).send("Entry not found");
      return;
    }

    jsonData.splice(index, 1);

    fd.writeFile("data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing data file");
        return;
      }

      res.send({ message: "Data remove successfully" });
    });
  });
});

app.listen(8000, () => {
  console.log("Server Running........");
});
