import Layout from './components/Layout';
import Home from './pages/Home';
import VenuePage from './pages/VenuePage';
import Kontakt from './pages/Kontakt';
import NotFound from './pages/NotFound';
import { VENUE_LIST } from './lib/venues';

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'kontakt', Component: Kontakt },
      {
        path: ':slug',
        Component: VenuePage,
        getStaticPaths: () => VENUE_LIST.map((v) => v.slug),
      },
      { path: '*', Component: NotFound },
    ],
  },
];

export default routes;
