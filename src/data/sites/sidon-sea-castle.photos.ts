import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/sidon-sea-castle/castle.jpg',
    thumb: '/photos/sidon-sea-castle/castle-sm.jpg',
    caption: {
      en: "The Sea Castle on its islet off Sidon's harbour",
      ar: 'القلعة البحرية على جزيرتها قبالة ميناء صيدا',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sidon_Sea_Castle,_Mediterranean_Sea,_Sidon,_Lebanon.jpg',
  },
  {
    src: '/photos/sidon-sea-castle/tower.jpg',
    thumb: '/photos/sidon-sea-castle/tower-sm.jpg',
    caption: {
      en: 'The west tower, the best-preserved part of the castle',
      ar: 'البرج الغربي، الجزء الأفضل حفظاً من القلعة',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sidon_Sea_Castle,_Sidon,_Lebanon.jpg',
  },
  {
    src: '/photos/sidon-sea-castle/view.jpg',
    thumb: '/photos/sidon-sea-castle/view-sm.jpg',
    caption: {
      en: 'The domed mosque on the tower, with the city behind',
      ar: 'المسجد ذو القبة فوق البرج والمدينة من خلفه',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:View_from_Sidon%27s_Sea_Castle,_Sidon,_Lebanon.jpg',
  },
  {
    src: '/photos/sidon-sea-castle/old-1920.jpg',
    thumb: '/photos/sidon-sea-castle/old-1920-sm.jpg',
    caption: {
      en: 'The castle and its causeway, photographed around 1920',
      ar: 'القلعة وجسرها في صورة من نحو عام 1920',
    },
    author: 'Matson Collection',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Syria._Tyre_to_Tripoli_and_Krak_de_Chevalier._Sidon._The_Crusader_castle,_Kalaat_el-Bahr_LOC_matpc.15418.jpg',
    year: 1920,
  },
]
