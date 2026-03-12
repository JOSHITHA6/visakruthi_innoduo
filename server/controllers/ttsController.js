const getGoogleClient = async () => {
  const module = await import("@google-cloud/text-to-speech");
  const TextToSpeechClient = module.TextToSpeechClient || module.default?.TextToSpeechClient;

  if (!TextToSpeechClient) {
    throw new Error("Google Cloud Text-to-Speech client is unavailable.");
  }

  return new TextToSpeechClient();
};

const languageConfig = {
  en: {
    languageCode: "en-IN",
    voiceName: process.env.GOOGLE_TTS_EN_VOICE || "en-IN-Standard-E"
  },
  te: {
    languageCode: "te-IN",
    voiceName: process.env.GOOGLE_TTS_TE_VOICE || "te-IN-Standard-A"
  }
};

export const synthesizeSpeech = async (req, res, next) => {
  try {
    const { text, language = "en" } = req.body || {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Text is required." });
    }

    if (!process.env.GOOGLE_CLOUD_PROJECT && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return res.status(503).json({
        message: "Google Cloud TTS is not configured.",
        fallback: true
      });
    }

    const config = language === "te" ? languageConfig.te : languageConfig.en;
    const client = await getGoogleClient();

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: config.languageCode,
        name: config.voiceName
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: language === "te" ? 0.94 : 1,
        pitch: language === "te" ? -1.5 : 0
      }
    });

    return res.json({
      audioContent: response.audioContent?.toString("base64"),
      audioMimeType: "audio/mpeg",
      provider: "google-cloud-tts"
    });
  } catch (error) {
    if (error.code === 5 || error.message?.includes("Could not load the default credentials")) {
      return res.status(503).json({
        message: "Google Cloud credentials are not available.",
        fallback: true
      });
    }

    return next(error);
  }
};
