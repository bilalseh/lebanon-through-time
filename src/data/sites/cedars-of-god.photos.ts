import type { Photo } from '../types'

export const PHOTOS: Photo[] = [
  {
    src: '/photos/cedars-of-god/grove.jpg',
    thumb: '/photos/cedars-of-god/grove-sm.jpg',
    caption: {
      en: 'The old grove of the Cedars of God below the snows of Mount Lebanon',
      ar: 'غابة أرز الرب القديمة تحت ثلوج جبل لبنان',
    },
    author: 'Jerzy Strzelecki',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cedars01(js).jpg',
  },
  {
    src: '/photos/cedars-of-god/valley.jpg',
    thumb: '/photos/cedars-of-god/valley-sm.jpg',
    caption: {
      en: 'The Qadisha Valley seen from above the Qannubin monastery',
      ar: 'وادي قاديشا من فوق دير قنوبين',
    },
    author: 'Evan Williams',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Qadisha_Valley,_Aerial_View_From_Qannoubine_Monastery.jpg',
  },
  {
    src: '/photos/cedars-of-god/cedar.jpg',
    thumb: '/photos/cedars-of-god/cedar-sm.jpg',
    caption: {
      en: 'An ancient cedar spreading its branches above the grove',
      ar: 'أرزة معمّرة تمدّ أغصانها فوق الغابة',
    },
    author: 'Vyacheslav Argenberg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cedars_of_God_(Lebanon_cedar_forest),_Lebanon.jpg',
  },
  {
    src: '/photos/cedars-of-god/old-1870.jpg',
    thumb: '/photos/cedars-of-god/old-1870-sm.jpg',
    caption: {
      en: 'The Qadisha river photographed by Félix Bonfils, about 1870',
      ar: 'نهر قاديشا في صورة لفيليكس بونفيس، نحو 1870',
    },
    author: 'Félix Bonfils',
    license: 'CC0',
    licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    source: 'https://commons.wikimedia.org/wiki/File:Cous_du_Kadisha,_Monte_Libon_MET_DP113878.jpg',
    year: 1870,
  },
]
