export const CATEGORIES = ['Posilňovacie stroje', 'Kardio zóna', 'Šatne a sprchy', 'Vybavenie', 'Iné'];

export default function handler(req, res) {
  res.status(200).json({ categories: CATEGORIES });
}
