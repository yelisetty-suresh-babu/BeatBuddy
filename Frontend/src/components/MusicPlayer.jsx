import React, { useEffect } from "react";

function MusicPlayer() {
  useEffect(() => {
    localStorage.removeItem("savedLink");
    localStorage.removeItem("cachedData");
  }, []);
  return <div>MusicPlayer</div>;
}

export default MusicPlayer;
