/**
 * Layouts
 * ---
 */
import LayoutDefault from '@/layouts/LayoutDefault.vue'


/**
 * Pages
 * ---
 */
import Home from '@/pages/Home.vue'
import Sport from '@/pages/Sport.vue'
import Contact from '@/pages/Contact.vue'
import Planning from '@/pages/Planning.vue'
import NotFound404 from '@/pages/NotFound404.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  // Root
  {
    path: '/',
    component: LayoutDefault,
    meta: { title: 'Home' },
    children: [
      { path: '', component: Home, name: 'home', meta: { title: 'Home' } },
    ]
  }, {
    path: '/sport',
    component: LayoutDefault,
    meta: { title: 'Sport' },
    children: [
      { path: '', component: Sport, name: 'sport', meta: { title: 'Spot' } },
    ]
  }, {
    path: '/contact',
    component: LayoutDefault,
    meta: { title: 'Contact' },
    children: [
      { path: '', component: Contact, name: 'contact', meta: { title: 'Contact' } },
    ]
  }, {
    path: '/contact/:bookingDate',
    component: LayoutDefault,
    meta: { title: 'ContactBooking' },
    children: [
      { path: '', component: Contact, name: 'contactbooking', meta: { title: 'Contact' }, props: true },
    ]
  }, {
    path: '/planning',
    component: LayoutDefault,
    meta: { title: 'Planning' },
    children: [
      { path: '', component: Planning, name: 'planning', meta: { title: 'Planning' } },
    ]
  }, {
    path: '/planning/:selectedDisciplineKey',
    component: LayoutDefault,
    meta: { title: 'PlanningDiscipline' },
    children: [
      { path: '', component: Planning, name: 'planningdiscipline', meta: { title: 'PlanningDiscipline' }, props: true },
    ]
  },
  { path: '/:path(.*)', component: NotFound404 },
]
