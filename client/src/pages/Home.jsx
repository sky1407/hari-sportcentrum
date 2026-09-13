import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { VENUE_LIST } from '../lib/venues';

export default function Home() {
  return (
    <div>
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(11,15,20,0.55), rgba(11,15,20,0.97)), url(/photos/hari-komplex.png)',
        }}
      >
        <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-center">
          <div className="mx-auto w-full max-w-[200px] shrink-0 space-y-3 px-4 sm:px-6 lg:mx-0 lg:pl-6 lg:pr-0">
            <img src="/photos/aktualna-akcia.jpg" alt="Aktuálna akcia" className="w-full rounded-xl border border-white/10 shadow-lg" />
            <img src="/photos/pizza-rozvoz.jpg" alt="Rozvoz pizze - novinka" className="w-full rounded-xl border border-white/10 shadow-lg" />
          </div>

          <div className="flex-1 px-4 text-center lg:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500">Bánovce nad Bebravou</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
              Šport, zábava a dobré jedlo
              <br className="hidden sm:block" />
              pod jednou strechou
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70 lg:mx-0">
              Fitness, bowling, tenis, badminton aj reštaurácia s pizzou - rezervujte si termín online, alebo príďte
              osobne.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60 lg:justify-start">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-500" /> Svätoplukova 1548, Bánovce nad Bebravou
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-500" /> 038 / 760 74 44
              </span>
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
