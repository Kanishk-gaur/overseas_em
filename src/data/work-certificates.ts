// These are unissued design templates. Replace placeholders only with confirmed
// project records; a client certificate must be approved by the named issuer.
export const workCertificates = [
  {
    id: "work-completion",
    title: { en: "Work completion certificate", hi: "कार्य पूर्णता प्रमाणपत्र" },
    description: {
      en: "A record of a completed assignment, with the project location, agreed work and completion date.",
      hi: "पूरा किए गए काम का रिकॉर्ड, जिसमें परियोजना का स्थान, तय कार्य और पूर्णता की तारीख दर्ज हो।",
    },
    fields: {
      en: ["Client & issuing company", "Project, city & state", "Scope & completion date"],
      hi: ["ग्राहक और जारी करने वाली कंपनी", "परियोजना, शहर और राज्य", "कार्य विवरण और पूर्णता की तारीख"],
    },
  },
  {
    id: "service-experience",
    title: { en: "Service experience certificate", hi: "सेवा अनुभव प्रमाणपत्र" },
    description: {
      en: "A record of services provided over an agreed period, with the responsibilities and work locations confirmed by the issuer.",
      hi: "एक तय अवधि में दी गई सेवाओं का रिकॉर्ड, जिसमें ज़िम्मेदारियों और कार्यस्थलों की पुष्टि जारी करने वाली कंपनी करे।",
    },
    fields: {
      en: ["Client & issuing company", "Service period & locations", "Responsibilities & authorised signatory"],
      hi: ["ग्राहक और जारी करने वाली कंपनी", "सेवा अवधि और कार्यस्थल", "ज़िम्मेदारियाँ और अधिकृत हस्ताक्षरकर्ता"],
    },
  },
] as const;
