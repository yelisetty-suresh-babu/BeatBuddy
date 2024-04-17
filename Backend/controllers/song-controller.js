const fs = require("fs");
const path = require("path");

const songsDirectory = path.join(__dirname, "music");

const allsongsfinder = (req, res) => {
  fs.readdir(songsDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // console.log(files);
    const songs = files.map((file) => ({ name: file }));
    res.json(songs);
  });
};

const singlesongfinder = (req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);
  const filePath = path.join(songsDirectory, fileName);
  console.log(filePath, "\n", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "File not found" });
    }

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
};

module.exports = { allsongsfinder, singlesongfinder };
