const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON request bodies

app.post("/authorize", async (req, res) => {
  try {
    const httpPermission = req.body.permission;
    const token = req.header("Authorization").split(" ")[1];
    const inputDict = {
      input: {
        permission: httpPermission,
        token,
      },
    };
    console.log("🚀 ~ file: server.js:21 ~ app.post ~ inputDict:", inputDict);

    const opaResponse = await axios.post(
      "http://127.0.0.1:8181/v1/data/example/allow",
      inputDict
    );
    console.log(
      "🚀 ~ file: server.js:24 ~ app.post ~ opaResponse:",
      opaResponse.data
    );

    if (opaResponse.data) {
      // HTTP API allowed
      res.status(200).send(opaResponse.data);
    } else {
      // HTTP API denied
      res.status(403).send(opaResponse.data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
