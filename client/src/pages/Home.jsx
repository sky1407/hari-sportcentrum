import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Sparkles, Clock, CreditCard } from 'lucide-react';
import { VENUE_LIST } from '../lib/venues';

export default function Home() {
  return (
    <div>
      <section
        className="relative flex min-h-[70vh] items-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(11,15,20,0.55), rgba(11,15,20,0.97)), url(/photos/hari-komplex.png)',
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500">Bánovce nad Bebravou</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
            Šport, zábava a dobré jedlo
            <br className="hidden sm:block" />
            pod jednou strechou
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Fitness, bowling, tenis, badminton aj reštaurácia s pizzou - rezervujte si termín online, alebo príďte osobne.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-500" /> Svätoplukova 1548, Bánovce nad Bebravou
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-amber-500" /> 038 / 760 74 44
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4 pt-10">
        <img
          src="/photos/aktualna-akcia.jpg"
          alt="Aktuálna akcia"
          className="w-full max-w-[280px] rounded-2xl border border-white/10"
        />
        <div className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-transparent">
          <img src="/photos/pizza-rozvoz.jpg" alt="Rozvoz pizze" className="h-36 w-full object-cover" />
          <div className="p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#0b0f14]">
              <Sparkles className="h-3.5 w-3.5" /> Novinka
            </span>
            <h2 className="mt-3 text-lg font-black text-white">Rozvoz pizze</h2>
            <div className="mt-3 space-y-1.5 text-sm text-white/60">
              <p className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-amber-500" /> Každý deň 14:30 – 20:00
              </p>
              <p className="flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 shrink-0 text-amber-500" /> Platba kartou možná
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" /> 038 / 760 74 44
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-black text-white">Naše prevádzky</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VENUE_LIST.map((v) => (
            <Link key={v.slug} to={`/${v.slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10">
              <img src={v.heroImage} alt={v.label} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-bold text-white">{v.label}</h3>
                <p className="mt-1 text-sm text-white/70">{v.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-400">
                  Zobraziť <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
