import { demoArtisans } from "../data/demoData";

const craftList = ["Etikoppaka Toys", "Cheepuru Craft", "Bamboo Craft", "Tribal Art", "Eco Souvenirs", "Story-led Workshops"];

export const isTeluguQuery = (message) => /[\u0C00-\u0C7F]/.test(message);
export const normalize = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();

const includesAny = (value, terms) => terms.some((term) => value.includes(term));
const isGreetingOnly = (value) =>
  /^(hi|hii|hello|hey|namaste|good morning|good afternoon|good evening|హాయ్|నమస్తే)\b[\s!?]*$/i.test(value.trim());

export const replySets = {
  en: {
    greeting:
      "Namaste. I am KalaSaathi, your VISAKRUTHI guide. Ask about crafts, artisans, workshops, pricing, volunteering, founders, or locations.",
    about:
      "VISAKRUTHI is a cultural platform that connects artisans from the Visakhapatnam region with tourists, students, and craft enthusiasts. It helps visitors discover local crafts, explore artisan stories, and book hands-on experiences.",
    mission:
      "VISAKRUTHI is built to preserve traditional craftsmanship while improving digital visibility, cultural storytelling, and visitor access for artisan communities.",
    categories: `VISAKRUTHI currently highlights ${craftList.join(", ")}.`,
    workshops:
      "The Workshops page is category-led. Choose a craft category, review the people involved, availability, and video, then select a visitor package and submit the booking form.",
    artisans:
      "You can explore Lalitha Devi for Etikoppaka Toys, Satyam Apparao for Cheepuru Craft, Jagannadha Rao for Bamboo Craft, and Sirisha Korra for Tribal Art experiences.",
    localCrafts:
      "Featured local crafts include Etikoppaka lacquer toys, cheepuru broom making, bamboo weaving, tribal craft storytelling, eco souvenirs, and story-led learning sessions.",
    volunteer:
      "Students can register as volunteers for documentation, outreach, workshop coordination, storytelling support, and community engagement.",
    map: "Each artisan profile includes a Google Maps section so visitors can identify locations and plan regional visits.",
    founders:
      "VISAKRUTHI is founded by Sai Joshitha Palavalasa, with Vasupriya Patnaik Balivada as Co-Founder. Their focus is cultural visibility, storytelling, and tourism-led artisan support.",
    pricing:
      "Workshop booking options are available for 1-2 persons at Rs. 499, 3-5 groups at Rs. 899, and 6-10 groups at Rs. 1999.",
    contact:
      "Each artisan profile includes contact details, location information, and a direct path to book a workshop.",
    features:
      "Public features on VISAKRUTHI include artisan discovery, craft profiles, workshop categories, booking forms, Google Maps, volunteer registration, founder information, KalaSaathi guidance, and English or Telugu viewing.",
    privacy:
      "I can help with public information about VISAKRUTHI, but I do not provide internal dashboard access, admin details, private records, or operational information.",
    fallback:
      "I can help with public VISAKRUTHI information such as artisan profiles, local crafts, workshop categories, pricing, bookings, volunteering, founders, and locations."
  },
  te: {
    greeting:
      "నమస్తే. నేను కళాసాథి. VISAKRUTHI గురించి, కళాకారులు, వర్క్‌షాప్స్, ధరలు, వాలంటీరింగ్, స్థాపకులు లేదా ప్రదేశాల గురించి అడగండి.",
    about:
      "VISAKRUTHI అనేది విశాఖపట్నం ప్రాంతంలోని కళాకారులను సందర్శకులు, విద్యార్థులు, మరియు కళాభిమానులతో కలిపే సాంస్కృతిక వేదిక. దీనివల్ల స్థానిక కళలు, కళాకారుల కథలు, మరియు అనుభవాత్మక వర్క్‌షాప్స్ గురించి తెలుసుకోవచ్చు.",
    mission:
      "VISAKRUTHI లక్ష్యం సంప్రదాయ కళలను సంరక్షించడం, కళాకారులకు డిజిటల్ గుర్తింపును పెంచడం, మరియు సందర్శకులకు సులభమైన సాంస్కృతిక అనుభవాలను అందించడం.",
    categories:
      "VISAKRUTHI లో ప్రస్తుతం ఎటికొప్పాక బొమ్మలు, చీపురు కళ, బాంబూ కళ, గిరిజన కళ, పర్యావరణ హిత జ్ఞాపికలు, మరియు కథా ఆధారిత వర్క్‌షాప్స్ ఉన్నాయి.",
    workshops:
      "వర్క్‌షాప్స్ పేజీలో ముందు ఒక విభాగాన్ని ఎంచుకుని, అందులో పాల్గొనే వ్యక్తులు, అందుబాటు, వీడియో చూసి, తర్వాత మీకు సరిపోయే ప్యాకేజీని ఎంచుకుని బుకింగ్ చేయవచ్చు.",
    artisans:
      "ఎటికొప్పాక బొమ్మల కోసం లలితా దేవి, చీపురు కళ కోసం సత్యం అప్పారావు, బాంబూ కళ కోసం జగన్నాధరావు, గిరిజన కళ కోసం సిరిష కొర్రా వివరాలను చూడవచ్చు.",
    localCrafts:
      "ఇక్కడి స్థానిక కళల్లో ఎటికొప్పాక లాక్ బొమ్మలు, చీపురు తయారీ, బాంబూ నేసుట, గిరిజన కళ, పర్యావరణ హిత జ్ఞాపికలు, మరియు కథా ఆధారిత అభ్యాస సెషన్లు ఉన్నాయి.",
    volunteer:
      "విద్యార్థులు డాక్యుమెంటేషన్, ప్రచారం, వర్క్‌షాప్ సమన్వయం, కథనం సహాయం, మరియు కమ్యూనిటీ భాగస్వామ్యం కోసం వాలంటీర్‌గా నమోదు కావచ్చు.",
    map: "ప్రతి కళాకారుడి ప్రొఫైల్‌లో Google Maps భాగం ఉంటుంది. దాని ద్వారా ప్రదేశాన్ని గుర్తించి ప్రయాణాన్ని ప్లాన్ చేసుకోవచ్చు.",
    founders:
      "VISAKRUTHI స్థాపకురాలు సాయి జోషిత పలవలస, సహ స్థాపకురాలు వసుప్రియ పట్నాయక్ బలివాడ. వీరి దృష్టి సాంస్కృతిక గుర్తింపు, కథనం, మరియు కళాకారుల ఆధారిత పర్యాటక అభివృద్ధిపై ఉంది.",
    pricing:
      "వర్క్‌షాప్ బుకింగ్ ప్యాకేజీలు 1-2 మందికి రూ. 499, 3-5 మందికి రూ. 899, మరియు 6-10 మందికి రూ. 1999 గా ఉన్నాయి.",
    contact:
      "ప్రతి కళాకారుడి ప్రొఫైల్‌లో సంప్రదింపు వివరాలు, ప్రదేశ సమాచారం, మరియు వర్క్‌షాప్ బుకింగ్‌కు వెళ్లే మార్గం ఉంటుంది.",
    features:
      "VISAKRUTHI లో కళల అన్వేషణ, కళాకారుల ప్రొఫైల్స్, వర్క్‌షాప్ విభాగాలు, బుకింగ్ ఫార్మ్స్, Google Maps, వాలంటీర్ నమోదు, స్థాపకుల వివరాలు, కళాసాథి, మరియు తెలుగు లేదా ఇంగ్లీష్ వీక్షణ అందుబాటులో ఉన్నాయి.",
    privacy:
      "నేను VISAKRUTHI గురించి పబ్లిక్ సమాచారం మాత్రమే అందిస్తాను. ఆడ్మిన్, డాష్‌బోర్డ్, ప్రైవేట్ రికార్డ్స్, లేదా అంతర్గత కార్యకలాపాల వివరాలు ఇవ్వను.",
    fallback:
      "నేను VISAKRUTHI కి సంబంధించిన పబ్లిక్ సమాచారం, కళాకారులు, స్థానిక కళలు, వర్క్‌షాప్స్, ధరలు, వాలంటీరింగ్, స్థాపకులు, మరియు ప్రదేశాల గురించి సహాయం చేయగలను."
  }
};

const getSpecificCraftReply = (message, locale) => {
  const lowered = normalize(message);
  const match = demoArtisans.find(
    (artisan) => lowered.includes(artisan.name.toLowerCase()) || lowered.includes(artisan.craftType.toLowerCase())
  );

  if (!match) return null;

  if (locale === "te") {
    return `${match.location} ప్రాంతంలో ${match.craftType} అనుభవాన్ని ${match.name} అందిస్తున్నారు. వారి ప్రొఫైల్‌లో కథ, గ్యాలరీ, వీడియో, మరియు సంప్రదింపు వివరాలు చూడవచ్చు.`;
  }

  return `${match.name} leads the ${match.craftType} experience from ${match.location}. Open the artisan profile to view the story, gallery, video, and contact details.`;
};

const teluguTerms = {
  privacy: ["ఆడ్మిన్", "డాష్‌బోర్డ్", "అంతర్గత", "ప్రైవేట్", "గోప్యమైన", "డేటాబేస్", "బ్యాక్ ఎండ్", "రికార్డులు"],
  about: ["విసాకృతి", "విసాక్రుతి", "ఏమిటి", "ఏంటి", "గురించి చెప్పు", "ఇది ఏమిటి", "వేదిక", "ప్లాట్‌ఫామ్"],
  mission: ["లక్ష్యం", "విజన్", "దృష్టి", "ఉద్దేశ్యం", "ఎందుకు", "ఎందుకోసం"],
  features: ["ఫీచర్స్", "ఏమేం ఉన్నాయి", "వెబ్‌సైట్", "సైట్", "ఏం చేయవచ్చు", "సౌకర్యాలు"],
  categories: ["విభాగాలు", "కేటగిరీలు", "రకాలు"],
  workshops: ["వర్క్‌షాప్", "వర్క్‌షాప్స్", "బుకింగ్", "బుక్", "సెషన్", "అనుభవం"],
  pricing: ["ధర", "ఫీజు", "ఖర్చు", "ఎంత", "రేటు", "ప్యాకేజీ"],
  volunteer: ["వాలంటీర్", "విద్యార్థి", "సేవ", "నమోదు", "రిజిస్ట్రేషన్"],
  map: ["మ్యాప్", "ప్రదేశం", "ఎక్కడ", "లోకేషన్", "ఎలా వెళ్లాలి", "ఎక్కడ ఉంది"],
  founders: ["స్థాపకులు", "స్థాపకురాలు", "ఫౌండర్", "టీమ్", "ఎవరు ప్రారంభించారు"],
  contact: ["సంప్రదింపు", "ఫోన్", "ఈమెయిల్", "కాంటాక్ట్", "ఎలా సంప్రదించాలి"],
  localCrafts: ["స్థానిక కళలు", "సాంప్రదాయ కళలు", "ఇక్కడి కళలు", "వారసత్వ కళలు", "కళల గురించి"],
  artisans: ["కళాకారులు", "శిల్పులు", "కళ", "క్రాఫ్ట్"]
};

export const getReply = (message) => {
  const lowered = normalize(message);
  const locale = isTeluguQuery(message) ? "te" : "en";
  const replies = replySets[locale];

  const privateTerms = [
    "dashboard",
    "admin",
    "analytics",
    "internal",
    "private",
    "confidential",
    "database",
    "backend",
    "records",
    "company details"
  ];
  const aboutTerms = ["what is visakruthi", "about visakruthi", "tell me about visakruthi", "visakruthi", "platform"];
  const missionTerms = ["mission", "vision", "purpose", "goal", "aim", "why does visakruthi exist"];
  const featureTerms = ["features", "website", "site", "what can i do", "public details", "what is available"];
  const localCraftTerms = ["local crafts", "traditional crafts", "local art", "heritage crafts"];

  if (locale === "te") {
    if (includesAny(lowered, teluguTerms.privacy)) return replies.privacy;
    if (includesAny(lowered, teluguTerms.about)) return replies.about;
    if (includesAny(lowered, teluguTerms.mission)) return replies.mission;
    if (includesAny(lowered, teluguTerms.features)) return replies.features;

    const specificCraft = getSpecificCraftReply(message, locale);
    if (specificCraft) return specificCraft;

    if (includesAny(lowered, teluguTerms.categories)) return replies.categories;
    if (includesAny(lowered, teluguTerms.workshops)) return replies.workshops;
    if (includesAny(lowered, teluguTerms.pricing)) return replies.pricing;
    if (includesAny(lowered, teluguTerms.volunteer)) return replies.volunteer;
    if (includesAny(lowered, teluguTerms.map)) return replies.map;
    if (includesAny(lowered, teluguTerms.founders)) return replies.founders;
    if (includesAny(lowered, teluguTerms.contact)) return replies.contact;
    if (includesAny(lowered, teluguTerms.localCrafts)) return replies.localCrafts;
    if (includesAny(lowered, teluguTerms.artisans)) return replies.artisans;
    if (isGreetingOnly(message)) return replies.greeting;

    return replies.fallback;
  }

  if (includesAny(lowered, privateTerms)) return replies.privacy;
  if (includesAny(lowered, aboutTerms)) return replies.about;
  if (includesAny(lowered, missionTerms)) return replies.mission;
  if (includesAny(lowered, featureTerms)) return replies.features;

  const specificCraft = getSpecificCraftReply(message, locale);
  if (specificCraft) return specificCraft;

  if (lowered.includes("category") || lowered.includes("categories")) return replies.categories;
  if (lowered.includes("workshop") || lowered.includes("book") || lowered.includes("booking")) return replies.workshops;
  if (lowered.includes("price") || lowered.includes("pricing") || lowered.includes("cost") || lowered.includes("fee")) return replies.pricing;
  if (lowered.includes("volunteer") || lowered.includes("student")) return replies.volunteer;
  if (lowered.includes("map") || lowered.includes("location") || lowered.includes("where") || lowered.includes("visit")) return replies.map;
  if (lowered.includes("founder") || lowered.includes("team")) return replies.founders;
  if (lowered.includes("contact") || lowered.includes("phone") || lowered.includes("email")) return replies.contact;
  if (includesAny(lowered, localCraftTerms)) return replies.localCrafts;
  if (lowered.includes("artisan") || lowered.includes("craft")) return replies.artisans;
  if (isGreetingOnly(message)) return replies.greeting;

  return replies.fallback;
};
