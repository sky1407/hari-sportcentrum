import { useParams, Navigate } from 'react-router-dom';
import { Clock, Euro, Phone } from 'lucide-react';
import { VENUES } from '../lib/venues';
import PhotoGallery from '../components/PhotoGallery';
import ReservationForm from '../components/ReservationForm';
import DefectReportSection from '../components/DefectReportSection';

export default function VenuePage() {
  const { slug } = useParams();
  const venue = VENUES[slug];

  if (!venue) return <Navigate to="/" replace />;

  return (
    <div>
      <div
        className="relative flex h-64 items-end bg-cover bg-center sm:h-80"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(11,15,20,0.3), rgba(11,15,20,0.95)), url(${venue.heroImage})` }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 pb-8">
          <h1 className="text-3xl font-black text-white sm:text-5xl">{venue.label}</h1>
          <p className="mt-2 text-white/70">{venue.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <div className="text-sm font-semibold text-white">Otváracie hodiny</div>
              <div className="text-sm text-white/60">{venue.hoursText}</div>
            </div>
          </div>
          {venue.priceInfo && (
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Euro className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <div className="text-sm font-semibold text-white">Cenník</div>
                <div className="text-sm text-white/60">{venue.priceInfo}</div>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <div className="text-sm font-semibold text-white">Kontakt</div>
              <div className="text-sm text-white/60">{venue.contactNote}</div>
            </div>
          </div>
        </div>

        <p className="max-w-3xl leading-relaxed text-white/70">{venue.description}</p>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/50">Fotogaléria</h2>
          <PhotoGallery photos={venue.photos} alt={venue.label} />
        </div>

        {venue.hasReservation && (
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/50">Rezervácia termínu</h2>
            <ReservationForm resourceId={venue.resourceId} label={venue.label} />
          </div>
        )}

        {venue.hasDefectReport && (
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/50">Hlásenie závad</h2>
            <DefectReportSection />
          </div>
        )}

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-white/60">
          Radšej telefonicky? Zavolajte nám na <span className="font-semibold text-amber-400">038 / 760 74 44</span>.
        </div>
      </div>
    </div>
  );
}
