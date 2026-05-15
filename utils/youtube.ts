export const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export const getEmbedUrl = (videoId: string, autoplay: boolean): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? 1 : 0
  }&enablejsapi=1&origin=${
    typeof window !== "undefined" ? window.location.origin : ""
  }`;
};

export const fetchYouTubeTitle = async (url: string): Promise<string> => {
  try {
    const videoId = extractYouTubeId(url);
    if (!videoId) return "Unknown Title";

    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (response.ok) {
      const data = await response.json();
      return data.title || "Unknown Title";
    }
  } catch (error) {
    console.error("Error fetching YouTube title:", error);
  }
  return "Unknown Title";
};
