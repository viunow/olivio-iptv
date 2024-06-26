import axios from "axios";

export const fetchPlaylist = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    // Split the data into lines
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    // Parse the lines to create a playlist
    let playlist = [];
    let currentName = "";

    lines.forEach((line) => {
      if (line.startsWith("#EXTINF:")) {
        // Extract the name (metadata line)
        const nameMatch = line.match(/,(.*)$/);
        currentName = nameMatch ? nameMatch[1] : "Unnamed Channel";
      } else if (line.startsWith("http") || line.startsWith("https")) {
        // Use the current line as a URL
        playlist.push({
          name: currentName,
          url: line.trim(),
        });
      }
    });

    return playlist;
  } catch (error) {
    console.error("Failed to fetch playlist:", error);
    return [];
  }
};
