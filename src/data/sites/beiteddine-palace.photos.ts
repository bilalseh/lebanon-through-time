import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/beiteddine-palace/courtyard.jpg',
    thumb: '/photos/beiteddine-palace/courtyard-sm.jpg',
    caption: { en: 'The courtyard with its fountain and painted gateway', ar: 'الساحة بنافورتها وبوابتها المزخرفة' },
    author: 'Peripitus',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Courtyard_at_Beiteddine_Palace_-_2009.jpg',
  },
  {
    src: '/photos/beiteddine-palace/palace.jpg',
    thumb: '/photos/beiteddine-palace/palace-sm.jpg',
    caption: { en: 'The palace and the village of Beiteddine behind it', ar: 'القصر وبلدة بيت الدين خلفه' },
    author: "Freedom's Falcon",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Beiteddine_29.JPG',
  },
  {
    src: '/photos/beiteddine-palace/mosaic.jpg',
    thumb: '/photos/beiteddine-palace/mosaic-sm.jpg',
    caption: { en: 'Leopard mosaic in the palace museum', ar: 'فسيفساء الفهد في متحف القصر' },
    author: 'Eusebius',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Beiteddine_-_mosa%C3%AFque_l%C3%A9opard.jpg',
  },
  {
    src: '/photos/beiteddine-palace/old-1920.jpg',
    thumb: '/photos/beiteddine-palace/old-1920-sm.jpg',
    caption: {
      en: 'The inner court and fountain in 1920 (Matson Collection)',
      ar: 'الساحة الداخلية والنافورة عام 1920 (مجموعة ماتسون)',
    },
    author: 'Matson Collection',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Beit_Ed-Din._The_Shehab_Palace_(held_as_a_national_monument)._The_inner_court_and_fountain_LOC_matpc.02858.jpg',
    year: 1920,
  },
]
