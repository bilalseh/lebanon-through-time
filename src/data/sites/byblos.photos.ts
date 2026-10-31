import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/byblos/castle.jpg',
    thumb: '/photos/byblos/castle-sm.jpg',
    caption: {
      en: 'The 12th-century Crusader castle seen from the ruins',
      ar: 'القلعة الصليبية من القرن الثاني عشر كما تبدو من الأطلال',
    },
    author: 'Peripitus',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Byblos_Castle_2009.jpg',
  },
  {
    src: '/photos/byblos/temple.jpg',
    thumb: '/photos/byblos/temple-sm.jpg',
    caption: {
      en: 'The Temple of Baalat Gebal above the bay',
      ar: 'معبد بعلة جبيل مطلاً على الخليج',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Byblos_ancient_ruins,_Phoenician_city_of_Byblos,_Lebanon.jpg',
  },
  {
    src: '/photos/byblos/harbour.jpg',
    thumb: '/photos/byblos/harbour-sm.jpg',
    caption: {
      en: 'Fishing boats in the ancient harbour',
      ar: 'قوارب صيد في الميناء القديم',
    },
    author: 'Elias zaghrini',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Port_de_Jbeil.jpg',
  },
  {
    src: '/photos/byblos/ahiram-1936.jpg',
    thumb: '/photos/byblos/ahiram-1936-sm.jpg',
    caption: {
      en: 'The sarcophagus of Ahiram photographed in 1936',
      ar: 'ناووس أحيرام في صورة من عام 1936',
    },
    author: 'Matson Collection',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Byblos-_Jebeil._Byblos._Sarcophagus_of_Ahiram,_King_of_Byblos_LOC_matpc.03491.jpg',
    year: 1936,
  },
]
