import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/tripoli-citadel/citadel.jpg',
    thumb: '/photos/tripoli-citadel/citadel-sm.jpg',
    caption: { en: 'The citadel on its hill above the old city', ar: 'القلعة على تلتها فوق المدينة القديمة' },
    author: 'Amalmc',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Le_ch%C3%A2teau_Saint-Gilles_%C3%A0_Tripoli_-_Liban.jpg',
  },
  {
    src: '/photos/tripoli-citadel/skyline.jpg',
    thumb: '/photos/tripoli-citadel/skyline-sm.jpg',
    caption: { en: 'Tripoli and the sea from the ramparts', ar: 'طرابلس والبحر من أسوار القلعة' },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_Citadel_of_Raymond_de_Saint-Gilles,_skyline_of_Tripoli,_Lebanon.jpg',
  },
  {
    src: '/photos/tripoli-citadel/courtyard.jpg',
    thumb: '/photos/tripoli-citadel/courtyard-sm.jpg',
    caption: { en: 'Vaulted halls around the inner courtyard', ar: 'القاعات المقبّبة حول الساحة الداخلية' },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_Citadel_of_Raymond_de_Saint-Gilles,_Tripoli,_Lebanon.jpg',
  },
  {
    src: '/photos/tripoli-citadel/old-1900.jpg',
    thumb: '/photos/tripoli-citadel/old-1900-sm.jpg',
    caption: {
      en: 'The castle above the river, around 1900 (Matson Collection)',
      ar: 'القلعة فوق النهر نحو عام 1900 (مجموعة ماتسون)',
    },
    author: 'Matson Collection',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Tripoli._The_castle._LOC_matpc.07124.jpg',
    year: 1900,
  },
]
