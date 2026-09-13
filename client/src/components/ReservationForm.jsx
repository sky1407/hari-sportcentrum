import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock, CheckCircle2 } from 'lucide-react';
import { api } from '../api/client';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function maxDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

export default function ReservationForm({ resourceId, label }) {
  const min = useMemo(() => todayISO(), []);
  const max = useMemo(() => maxDateISO(), []);

  const [date, setDate] = useState(min);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getSlots(resourceId, date)
      .then((data) => {
        if (cancelled) return;
        setSlots(data.slots);
        setSelectedTime(null);
        setError('');
        setLoadingSlots(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoadingSlots(false);
      });
    return () => {
      // Runs synchronously the instant resourceId/date changes (before the
      // new effect's fetch starts), so this both cancels the stale request
      // and flips the UI back to "loading" for the new one.
      cancelled = true;
      setLoadingSlots(true);
    };
  }, [resourceId, date]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTime) {
      setError('Vyber si prosím voľný termín.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { reservation } = await api.createReservation({ resource: resourceId, date, time: selectedTime, name, phone, note });
      setSuccess(reservation);
      setName('');
      setPhone('');
      setNote('');
      setSelectedTime(null);
      const data = await api.getSlots(resourceId, date);
      setSlots(data.slots);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h3 className="mt-3 text-lg font-bold text-white">Rezervácia odoslaná!</h3>
        <p className="mt-1 text-sm text-white/70">
          {label} · {success.date} o {success.time}. Ozveme sa ti na {success.phone} pre potvrdenie.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-4 cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-amber-400"
        >
          Vytvoriť ďalšiu rezerváciu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white">
          <CalendarDays className="h-4 w-4 text-amber-500" /> Dátum
        </label>
        <input
          type="date"
          value={date}
          min={min}
          max={max}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none sm:w-auto"
        />
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white">
          <Clock className="h-4 w-4 text-amber-500" /> Čas
        </label>
        {loadingSlots ? (
          <p className="text-sm text-white/50">Načítavam voľné termíny...</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-white/50">Pre tento dátum nie sú dostupné žiadne termíny.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {slots.map((s) => (
              <button
                key={s.time}
                type="button"
                disabled={s.taken}
                onClick={() => setSelectedTime(s.time)}
                className={`cursor-pointer rounded-lg py-2 text-sm font-medium transition disabled:cursor-not-allowed ${
                  s.taken
                    ? 'bg-white/5 text-white/25 line-through'
                    : selectedTime === s.time
                      ? 'bg-amber-500 font-bold text-[#0b0f14]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-white">Meno a priezvisko</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            placeholder="Ján Novák"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-white">Telefón</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            placeholder="0900 123 456"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-white">Poznámka (nepovinné)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm font-medium text-rose-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full cursor-pointer rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-[#0b0f14] hover:bg-amber-400 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {submitting ? 'Odosielam...' : 'Rezervovať termín'}
      </button>
    </form>
  );
}
