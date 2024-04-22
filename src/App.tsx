import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { fetchFile } from "./services/apiCall";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url: string) => {
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?.*v=|embed\/|v\/)|youtu\.be\/)[\w-]{11}.*$/;
    return youtubeUrlPattern.test(url);
  };

  const download = async () => {
    setLoading(true);
    const id = url.split("=")[1].split("&")[0];

    const res = await fetchFile(id);
    if (res?.status === 200) window.location.href = res.data.link;
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
        <span>It might take a moment to convert the video</span>
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
      <ToastContainer />
    </div>
  );
};

export default App;
