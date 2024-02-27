interface Recommendation {
  url: string;
  title: string;
  imageurls: string[];
  description: string;
}

export async function getRecommendation(
  accountId: string,
  uid: string,
  collection: string
): Promise<Recommendation[]> {
  const response = await fetch(
    `https://api.lytics.io/api/content/recommend/${accountId}/user/_uids/${uid}?shuffle=true&limit=5&contentsegment=${collection}`
  );
  const data = await response.json();
  return data.data;
}
