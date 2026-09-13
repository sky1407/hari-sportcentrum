// Opening hours per resource, derived from the real hari.sk pricing/hours pages.
// Hours are simplified to whole-hour slots (the tenisový kurt's real 21:30
// close becomes a last bookable slot of 20:00-21:00, so no slot ever runs
// past the real closing time).
export const RESOURCES = {
  bowling: {
    label: "Bowling",
    priceInfo: "12 € / hod (dráha)",
    hoursText: "Po–Št 10:00–22:00 · Pi 10:00–24:00 · So 12:00–24:00 · Ne a sviatky 12:00–22:00",
    hours(date) {
      const day = new Date(`${date}T12:00:00`).getDay(); // 0 = Sun ... 6 = Sat
      if (day === 0) return { open: 12, close: 22 };
      if (day === 6) return { open: 12, close: 24 };
      if (day === 5) return { open: 10, close: 24 };
      return { open: 10, close: 22 };
    },
  },
  "tenisova-hala": {
    label: "Tenisová hala",
    priceInfo: "10 € / hod (letná sezóna) · 12 € / hod (zimná sezóna)",
    hoursText: "Po–Ne 08:00–22:00",
    hours: () => ({ open: 8, close: 22 }),
  },
  "tenisovy-kurt": {
    label: "Tenisový kurt",
    priceInfo: "8 € / hod · 6 € / hod pre členov ŠK M-R Tenis club",
    hoursText: "Po–Ne 08:00–21:30",
    hours: () => ({ open: 8, close: 21 }),
  },
  badminton: {
    label: "Badminton",
    priceInfo: "10 € / hod (letná sezóna) · 12 € / hod (zimná sezóna)",
    hoursText: "Po–Ne 08:00–22:00",
    hours: () => ({ open: 8, close: 22 }),
  },
};

export function isValidResource(resource) {
  return Object.prototype.hasOwnProperty.call(RESOURCES, resource);
}

export function generateSlots(resource, date) {
  const { open, close } = RESOURCES[resource].hours(date);
  const slots = [];
  for (let h = open; h < close; h += 1) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}
