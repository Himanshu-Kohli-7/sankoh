export const companyImages = {
  manufacturing: [
    {
      url: "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?auto=format&fit=crop&q=80",
      alt: "Modern valve manufacturing facility",
      category: "manufacturing",
    },
    {
      url: "https://images.unsplash.com/photo-1581092160607-ee67df4fb4c5?auto=format&fit=crop&q=80",
      alt: "Industrial manufacturing precision",
      category: "manufacturing",
    },
  ],
  valves: [
    {
      url: "https://images.unsplash.com/photo-1581092334247-49d52f4d755f?auto=format&fit=crop&q=80",
      alt: "Industrial valve installation",
      category: "valves",
    },
    {
      url: "https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=80",
      alt: "Process control valves",
      category: "valves",
    },
  ],
  technical: [
    {
      url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80",
      alt: "Technical maintenance and repair",
      category: "technical",
    },
    {
      url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80",
      alt: "Industrial automation control",
      category: "technical",
    },
  ],
} as const;

export const getImagesByCategory = (category: string) => {
  return Object.values(companyImages)
    .flat()
    .filter((img) => img.category === category);
};

export const getAllImages = () => {
  return Object.values(companyImages).flat();
};
