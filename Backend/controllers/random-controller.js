const fs = require("fs");
const { getVideoMP3Base64 } = require("yt-get");

const downloader = async (req, res) => {
  try {
    console.log(req.body);
    const { videoID } = req.body;

    if (!videoID) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;

    const result = await getVideoMP3Base64(videoURL);
    const { base64, title } = result;

    console.log("Video Title:", title);

    // Convert Base64 to binary data
    const binaryData = Buffer.from(base64, "base64");

    // Write binary data to a .mp3 file in the music folder
    const fileName = `music/${title}.mp3`; // using video title as file name in the music folder
    fs.writeFile(fileName, binaryData, "binary", (err) => {
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
