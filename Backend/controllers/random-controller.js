const fs = require("fs");
const { getVideoMP3Base64, getVideoMP3Binary } = require("yt-get");

// const downloader = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { videoID } = req.body;

//     if (!videoID) {
//       return res.status(400).json({ error: "Video ID is required" });
//     }

//     const videoURL = `https://www.youtube.com/watch?v=${videoID}`;

//     const result = await getVideoMP3Base64(videoURL);
//     const { base64, title } = result;

//     console.log("Video Title:", title);

//     const binaryData = Buffer.from(base64, "base64");

//     const fileName = `music/${title}.mp3`;
//     fs.writeFile(fileName, binaryData, "binary", (err) => {
//       if (err) {
//         console.error("Error writing MP3 file:", err);
//         return res.status(500).json({ error: "Error writing MP3 file" });
//       }
//       console.log(`MP3 file saved as ${fileName}`);
//       res.json({ message: `MP3 file saved as ${fileName}` });
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const downloader = async (req, res) => {
  try {
    console.log(req.body);
    const { videoID } = req.body;

    if (!videoID) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;

    const result = await getVideoMP3Binary(videoURL);
    const { mp3, title } = result;

    console.log("Video Title:", title);

    const fileName = `music/${title}.mp3`;
    fs.writeFile(fileName, mp3, "binary", (err) => {
      if (err) {
        console.error("Error writing MP3 file:", err);
        return res.status(500).json({ error: "Error writing MP3 file" });
      }
      console.log(`MP3 file saved as ${fileName}`);
      res.json({ message: `MP3 file saved as ${fileName}` });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { downloader };
