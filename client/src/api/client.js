async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.error || 'Niečo sa pokazilo. Skús to prosím znova.');
  }
  return data;
}

export const api = {
  getResources: () => request('/reservations/resources'),
  getSlots: (resource, date) => request(`/reservations/slots?resource=${resource}&date=${date}`),
  createReservation: (payload) =>
    request('/reservations', { method: 'POST', body: JSON.stringify(payload) }),

  getReportCategories: () => request('/reports/categories'),
  getReports: () => request('/reports'),
  createReport: (payload) => request('/reports', { method: 'POST', body: JSON.stringify(payload) }),
};
