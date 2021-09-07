const express = require("express");
const ytch = require("yt-channel-info");
const PORT = 5000;

const app = express();
const sortBy = "popular";

app.get("/", (req, res) => {
  res.send("Youtube Channel Information API..");
});

app.get("/channelinfo/:id", (req, res) => {
  ytch
    .getChannelInfo(req.params.id)
    .then((response) => {
      res.json({ channelInfo: response });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/channelvideos/:id", (req, res) => {
  ytch
    .getChannelVideos(req.params.id, sortBy, 3)
    .then((response) => {
      res.json({ channelVideos: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
