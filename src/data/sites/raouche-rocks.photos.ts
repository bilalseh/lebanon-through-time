import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/raouche-rocks/rocks.jpg',
    thumb: '/photos/raouche-rocks/rocks-sm.jpg',
    caption: {
      en: 'The Pigeon Rocks below the Corniche at Raouche',
      ar: 'صخرة الروشة تحت الكورنيش',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Pigeon_Rocks_of_Beirut,_Rock_of_Raouche,_Beirut,_Lebanon.jpg',
  },
  {
    src: '/photos/raouche-rocks/sunset.jpg',
    thumb: '/photos/raouche-rocks/sunset-sm.jpg',
    caption: {
      en: 'Sunset behind the northern stack',
      ar: 'غروب الشمس خلف الصخرة الشمالية',
    },
    author: 'Eusebius',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Grotte_aux_pigeons_-_soleil_couchant_sur_le_piton_nord.jpg',
  },
  {
    src: '/photos/raouche-rocks/old-1920.jpg',
    thumb: '/photos/raouche-rocks/old-1920-sm.jpg',
    caption: {
      en: 'The Pigeon Rocks in 1920, from the Matson Collection',
      ar: 'صخرة الحمام عام 1920، من مجموعة ماتسون',
    },
    author: 'Matson Collection',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Beirut._The_pigeon_rocks_LOC_matpc.15422.jpg',
    year: 1920,
  },
  {
    src: '/photos/raouche-rocks/old-1950.jpg',
    thumb: '/photos/raouche-rocks/old-1950-sm.jpg',
    caption: {
      en: 'The rocks in 1950, photographed by Willem van de Poll',
      ar: 'الصخرة عام 1950 بعدسة فيليم فان دي بول',
    },
    author: 'Poll, Willem van de',
    license: 'CC BY-SA 3.0 nl',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en',
    source: 'https://commons.wikimedia.org/wiki/File:Pigeon_Rocks_1950.jpg',
    year: 1950,
  },
]
