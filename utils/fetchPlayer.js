import axios from "axios";

export const fetchPlaylist = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    // Split the data into lines and filter empty lines
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    // Parse the lines to create a playlist
    let playlist = [];
    let currentName = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("#EXTINF:")) {
        // Find the position of the last comma
        const lastCommaIndex = line.lastIndexOf(",");

        if (lastCommaIndex !== -1 && lastCommaIndex < line.length - 1) {
          // Extract everything after the last comma
          currentName = line.substring(lastCommaIndex + 1).trim();
        } else {
          currentName = "Unnamed Channel";
        }
      } else if (line.startsWith("http://") || line.startsWith("https://")) {
        // Add the channel to playlist
        playlist.push({
          name: currentName || "Unnamed Channel",
          url: line,
        });

        // Reset name for next channel
        currentName = "";
      }
    }

    return playlist;
  } catch (error) {
    console.error("Failed to fetch playlist:", error);
    return [];
  }
};
