const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"]);

export const getYouTubeVideoId = (url = "") => {
  try {
    const parsed = new URL(url);
    if (!YOUTUBE_HOSTS.has(parsed.hostname)) return "";

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "").trim();
    }

    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.replace("/embed/", "").trim();
    }

    return parsed.searchParams.get("v") || "";
  } catch {
    return "";
  }
};

export const getYouTubeWatchUrl = (url = "") => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://www.youtube.com/";
};

export const getYouTubeThumbnail = (url = "") => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
};
