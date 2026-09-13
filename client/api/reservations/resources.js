import { RESOURCES } from '../_resources.js';

export default function handler(req, res) {
  const resources = Object.entries(RESOURCES).map(([id, r]) => ({
    id,
    label: r.label,
    priceInfo: r.priceInfo,
    hoursText: r.hoursText,
  }));
  res.status(200).json({ resources });
}
