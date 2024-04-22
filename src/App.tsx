import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { fetchAudioFile, fetchVideoFile } from "./services/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState("mp3");

  const isValidUrl = (url: string) => {
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?.*v=|embed\/|v\/)|youtu\.be\/)[\w-]{11}.*$/;
    return youtubeUrlPattern.test(url);
  };

  const getVideoId = (url: string) => {
    let id = "";
    if (url.includes("?v=")) {
      id = url.split("?v=")[1];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1];
    }
    id = id?.split(/[?&]/)[0];
    return id;
  };

  const download = async () => {
    setLoading(true);
    const id = getVideoId(url);

    if (fileType === "mp3") {
      const res = await fetchAudioFile(id);
      if (res?.status === 200) window.location.href = res.data.link;
    }

    if (fileType === "mp4") {
      const res = await fetchVideoFile(id);
      if (res?.status === 200) {
        const link = res.data.formats[0].url;
        window.location.href = link;
      }
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="logo">
        <img src="note.png" alt="Note" />
        <h2>MP3 Converter</h2>
      </div>
      <div className="converter">
        <input
          type="text"
          placeholder="Enter youtube link"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <span>It might take a moment to convert the video.</span>
        {loading && (
          <>
            <ScaleLoader color={"#00c8ff"} loading={loading} />
          </>
        )}
      </div>
      <button
        className="downloadButton"
        disabled={!isValidUrl(url)}
        onClick={download}
      >
        Download
      </button>
      <div className="types">
        <button
          className="mp3Button"
          onClick={() => setFileType("mp3")}
          style={{
            backgroundColor: fileType === "mp3" ? "lightcoral" : undefined,
            color: fileType === "mp3" ? "black" : undefined,
          }}
        >
          MP3
        </button>
        <button
          className="mp4Button"
          onClick={() => setFileType("mp4")}
          style={{
            backgroundColor: fileType === "mp4" ? "lightcoral" : undefined,
            color: fileType === "mp4" ? "black" : undefined,
          }}
        >
          MP4
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
