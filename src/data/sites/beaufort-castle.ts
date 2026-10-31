import type { Site } from '../types'
import { PHOTOS } from './beaufort-castle.photos'

export const BEAUFORT_CASTLE: Site = {
  id: 'beaufort-castle',
  name: { en: 'Beaufort Castle', ar: 'قلعة الشقيف' },
  tagline: { en: 'A Crusader eyrie above the Litani', ar: 'قلعة صليبية فوق وادي الليطاني' },
  summary: {
    en: 'Perched on a cliff that drops some 300 metres to the Litani river, Beaufort watched the road from the coast to Damascus. Crusaders, Saladin, Templars, Mamluks and Ottoman emirs fought over it, and in the late 20th century it became a fortress once more, held by the PLO and then by the Israeli army until 2000.',
    ar: 'على جرف ينحدر نحو 300 متر إلى نهر الليطاني، أشرفت قلعة الشقيف على الطريق بين الساحل ودمشق. تنازع عليها الصليبيون وصلاح الدين والداوية والمماليك والأمراء العثمانيون، وفي أواخر القرن العشرين عادت حصناً من جديد بيد منظمة التحرير الفلسطينية ثم الجيش الإسرائيلي حتى عام 2000.',
  },
  category: 'castle',
  region: 'nabatieh',
  coords: [33.3264, 35.5339],
  facts: [
    { en: 'Cliff about 300 m above the Litani', ar: 'جرف بارتفاع نحو 300 متر فوق الليطاني' },
    { en: 'Crusader castle from 1139', ar: 'قلعة صليبية منذ 1139' },
    { en: 'Taken by Saladin in 1190', ar: 'استولى عليها صلاح الدين عام 1190' },
    { en: 'Occupied 1982-2000', ar: 'محتلة بين 1982 و2000' },
  ],
  events: [
    {
      year: 1139,
      title: { en: 'Fulk takes the high rock', ar: 'فولك يستولي على الصخرة العالية' },
      text: {
        en: 'King Fulk of Jerusalem captures a fortified site on the cliff and grants it to the lords of Sidon, who build the castle the Franks call Belfort.',
        ar: 'يستولي فولك ملك القدس على موقع محصّن فوق الجرف ويمنحه لأمراء صيدا، الذين يبنون القلعة التي سمّاها الفرنجة بوفور.',
      },
    },
    {
      year: 1190,
      title: { en: 'Saladin\'s long siege', ar: 'حصار صلاح الدين الطويل' },
      text: {
        en: 'After a siege of about a year, the garrison surrenders the castle to Saladin in April 1190 in exchange for the release of its lord, Reynald of Sidon.',
        ar: 'بعد حصار دام نحو عام، تسلّم الحامية القلعة لصلاح الدين في نيسان 1190 مقابل إطلاق سراح سيدها رينالد الصيداوي.',
      },
    },
    {
      year: 1260,
      title: { en: 'Sold to the Templars', ar: 'بيعها للداوية' },
      text: {
        en: 'Returned to the Franks by treaty in 1240, the castle is sold by Julian of Sidon to the Knights Templar, who hold it for only eight years.',
        ar: 'بعد عودتها إلى الفرنجة بمعاهدة عام 1240، يبيع جوليان الصيداوي القلعة لفرسان الهيكل (الداوية)، الذين لا يحتفظون بها سوى ثماني سنوات.',
      },
    },
    {
      year: 1268,
      title: { en: 'Baibars storms the castle', ar: 'بيبرس يقتحم القلعة' },
      text: {
        en: 'The Mamluk sultan Baibars captures Beaufort and ends its Crusader history. Under Islamic rule it is known as Qalaat al-Shaqif, the castle of the high rock.',
        ar: 'يستولي السلطان المملوكي الظاهر بيبرس على القلعة منهياً تاريخها الصليبي، وتُعرف في العهود الإسلامية باسم قلعة الشقيف، أي قلعة الصخرة العالية.',
      },
    },
    {
      year: 1633,
      approx: true,
      title: { en: 'Fakhr al-Din\'s stronghold', ar: 'معقل فخر الدين' },
      text: {
        en: 'Emir Fakhr al-Din II adds the castle to his network of fortresses. When the Ottomans defeat him in 1633, their troops tear down its upper storeys.',
        ar: 'يضم الأمير فخر الدين المعني الثاني القلعة إلى شبكة حصونه، وحين يهزمه العثمانيون عام 1633 تهدم قواتهم طوابقها العليا.',
      },
    },
    {
      year: 1782,
      title: { en: 'Jazzar Pasha\'s siege', ar: 'حصار الجزار باشا' },
      text: {
        en: 'Ahmad Pasha al-Jazzar, the governor of Acre, besieges and takes the castle from the local Shia lords and destroys many of its remaining fortifications.',
        ar: 'يحاصر أحمد باشا الجزار، والي عكا، القلعة وينتزعها من الأمراء الشيعة المحليين، ويهدم كثيراً من تحصيناتها المتبقية.',
      },
    },
    {
      year: 1837,
      title: { en: 'The Galilee earthquake', ar: 'زلزال الجليل' },
      text: {
        en: 'A great earthquake brings down more of the ruins. For a century the castle serves the villagers of Arnoun as a quarry and a shelter for their flocks.',
        ar: 'يُسقط زلزال كبير مزيداً من الأطلال، وتخدم القلعة أهالي أرنون قرناً كاملاً مقلعاً للحجارة ومأوى لقطعانهم.',
      },
    },
    {
      year: 1936,
      title: { en: 'French archaeologists clear the keep', ar: 'علماء الآثار الفرنسيون ينظفون البرج' },
      text: {
        en: 'Under the French Mandate, Paul Deschamps and Pierre Coupel bring in 65 soldiers to clear the rubble from the inner enclosure and the keep.',
        ar: 'في عهد الانتداب الفرنسي يستعين بول دوشان وبيير كوبيل بخمسة وستين جندياً لإزالة الأنقاض من الحرم الداخلي والبرج الرئيسي.',
      },
    },
    {
      year: 1982,
      title: { en: 'The Battle of Beaufort', ar: 'معركة الشقيف' },
      text: {
        en: 'Held by the PLO since 1976 and shelled for years, the castle is captured by Israeli forces in the opening days of the 1982 Lebanon War, after heavy bombardment on 6 June.',
        ar: 'بعد أن سيطرت عليها منظمة التحرير الفلسطينية منذ 1976 وتعرّضت للقصف سنوات، تستولي عليها القوات الإسرائيلية في الأيام الأولى من حرب 1982، إثر قصف عنيف في 6 حزيران.',
      },
    },
    {
      year: 2000,
      title: { en: 'Withdrawal and slow restoration', ar: 'الانسحاب وترميم بطيء' },
      text: {
        en: 'The Israeli army withdraws from southern Lebanon and blows up its base inside the castle. Restoration work begins afterwards, but progress is slow for lack of funds.',
        ar: 'ينسحب الجيش الإسرائيلي من جنوب لبنان ويفجّر قاعدته داخل القلعة، ثم تبدأ أعمال الترميم لكنها تتقدم ببطء لقلة التمويل.',
      },
    },
  ],
  photos: PHOTOS,
}
