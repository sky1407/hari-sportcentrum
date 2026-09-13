import { useEffect, useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { api } from '../api/client';

const REPORT_EMAIL = 'hari@hari.sk';

function timeAgo(sqliteDatetime) {
  const diffMs = Date.now() - new Date(`${sqliteDatetime.replace(' ', 'T')}Z`).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'práve teraz';
  if (mins < 60) return `pred ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `pred ${hrs} h`;
  return `pred ${Math.floor(hrs / 24)} d`;
}

export default function DefectReportSection() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getReportCategories(), api.getReports()])
      .then(([catData, repData]) => {
        setCategories(catData.categories);
        setCategory(catData.categories[0]);
        setReports(repData.reports);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) {
      setError('Popíš prosím, o akú závadu ide.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { report } = await api.createReport({ category, description });
      setReports((prev) => [report, ...prev]);
      setDescription('');

      const subject = encodeURIComponent(`Hlásenie závady - Fitness (${category})`);
      const body = encodeURIComponent(`Kategória: ${category}\n\nPopis:\n${report.description}`);
      window.location.href = `mailto:${REPORT_EMAIL}?subject=${subject}&body=${body}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-2 text-white">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-bold">Nahlásiť závadu (anonymne)</h3>
        </div>
        <p className="text-sm text-white/60">
          Všimol si si pokazený stroj alebo iný problém vo fitku? Hlásenie sa zobrazí verejne nižšie a zároveň sa otvorí
          predvyplnený email na {REPORT_EMAIL}.
        </p>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-white">Kategória</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-white">Popis závady</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Napr. rozbitá lavička na bench press pri okne..."
            className="w-full rounded-lg border border-white/15 bg-[#0b0f14] px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm font-medium text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-[#0b0f14] hover:bg-amber-400 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {submitting ? 'Odosielam...' : 'Odoslať hlásenie'}
        </button>
      </form>

      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">Doterajšie hlásenia ({reports.length})</h4>
        {loading ? (
          <p className="text-sm text-white/50">Načítavam...</p>
        ) : reports.length === 0 ? (
          <p className="text-sm text-white/50">Zatiaľ žiadne hlásenia.</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => (
              <li key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-400">{r.category}</span>
                  <span className="text-xs text-white/40">{timeAgo(r.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-white/80">{r.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
