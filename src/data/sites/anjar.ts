import type { Site } from '../types'
import { PHOTOS } from './anjar.photos'

export const ANJAR: Site = {
  id: 'anjar',
  name: { en: 'Anjar', ar: 'عنجر' },
  tagline: { en: 'An Umayyad city that lived one generation', ar: 'مدينة أموية عاشت جيلاً واحداً' },
  summary: {
    en: 'Anjar is the only Umayyad city in Lebanon, laid out in the early 8th century by Caliph al-Walid I on a Roman plan: a walled rectangle, two colonnaded avenues meeting under a tetrapylon, palaces, a mosque and baths. Abandoned within decades, it lay buried in marshland until excavations began in the 1940s.',
    ar: 'عنجر هي المدينة الأموية الوحيدة في لبنان، خطّطها الخليفة الوليد بن عبد الملك في مطلع القرن الثامن على نمط روماني: مستطيل مسوّر، وشارعان معمّدان يلتقيان تحت تترابيلون، وقصور ومسجد وحمّامات. هُجرت بعد عقود قليلة، وبقيت مطمورة في المستنقعات حتى بدأت الحفريات في أربعينيات القرن العشرين.',
  },
  category: 'ancient',
  region: 'bekaa',
  coords: [33.7266, 35.9311],
  unesco: 1984,
  facts: [
    { en: 'Walled city of 370 by 310 m', ar: 'مدينة مسوّرة بأبعاد 370 × 310 م' },
    { en: 'About 600 shops along its avenues', ar: 'نحو 600 دكان على جانبي شارعيها' },
    { en: 'Great Palace of 59 by 70 m', ar: 'القصر الكبير بأبعاد 59 × 70 م' },
    { en: 'UNESCO World Heritage since 1984', ar: 'تراث عالمي منذ 1984' },
  ],
  events: [
    {
      year: 710,
      approx: true,
      title: { en: "A caliph's new city", ar: 'مدينة جديدة لخليفة' },
      text: {
        en: 'Under Caliph al-Walid I, a walled palace-city rises near the spring of Ayn al-Jarr, with a grid of streets, some 600 shops, two palaces, a mosque and baths.',
        ar: 'في عهد الخليفة الوليد بن عبد الملك تنهض مدينة قصور مسوّرة قرب نبع عين جرّا، بشوارع متعامدة ونحو 600 دكان وقصرين ومسجد وحمّامات.',
      },
    },
    {
      year: 714,
      title: { en: 'Graffiti from the quarry', ar: 'كتابات من المقلع' },
      text: {
        en: 'Syriac graffiti dated 714 is left in the quarry that supplied the finest stone. Columns and capitals from Roman and Byzantine buildings are reused in the arcades.',
        ar: 'تُترك في المقلع الذي زوّد المدينة بأجود حجارتها كتابات سريانية مؤرخة بسنة 714. وتُعاد في الأروقة استعمال أعمدة وتيجان من أبنية رومانية وبيزنطية.',
      },
    },
    {
      year: 744,
      title: { en: 'A battle at the gates', ar: 'معركة عند الأبواب' },
      text: {
        en: 'Marwan II defeats his rival Ibrahim ibn al-Walid near Anjar and ravages the town. The city, still unfinished, is soon deserted by its inhabitants.',
        ar: 'يهزم مروان الثاني منافسه إبراهيم بن الوليد قرب عنجر ويخرّب البلدة. وسرعان ما يهجر السكان المدينة التي لم يكتمل بناؤها.',
      },
    },
    {
      year: 750,
      title: { en: 'The Umayyads fall', ar: 'سقوط الأمويين' },
      text: {
        en: 'The Abbasid revolution ends Umayyad rule from Damascus. Anjar never recovers, and by the 14th century it is a mound of ruins surrounded by marshes.',
        ar: 'تُنهي الثورة العباسية حكم الأمويين من دمشق. ولا تنهض عنجر من جديد، وبحلول القرن الرابع عشر تغدو تلاً من الأطلال تحيط به المستنقعات.',
      },
    },
    {
      year: 1939,
      title: { en: 'Armenians from Musa Dagh', ar: 'أرمن من موسى داغ' },
      text: {
        en: 'Several thousand Armenian refugees from Musa Dagh are resettled beside the ruins, founding the modern town of Anjar, also known as Hawsh Musa.',
        ar: 'يُوطَّن عدة آلاف من اللاجئين الأرمن القادمين من موسى داغ إلى جانب الأطلال، فيؤسسون بلدة عنجر الحديثة المعروفة أيضاً بحوش موسى.',
      },
    },
    {
      year: 1943,
      title: { en: 'Excavations begin', ar: 'بداية الحفريات' },
      text: {
        en: "Lebanon's Directorate General of Antiquities begins excavating the site. The walls, the tetrapylon and the Great Palace gradually emerge from the marsh.",
        ar: 'تبدأ المديرية العامة للآثار اللبنانية التنقيب في الموقع. وتظهر الأسوار والتترابيلون والقصر الكبير تدريجياً من بين المستنقعات.',
      },
    },
    {
      year: 1984,
      title: { en: 'World Heritage Site', ar: 'موقع تراث عالمي' },
      text: {
        en: 'UNESCO inscribes Anjar on the World Heritage List as a unique example of Umayyad city planning, blending a Roman layout with early Islamic architecture.',
        ar: 'تدرج اليونسكو عنجر على قائمة التراث العالمي بوصفها نموذجاً فريداً للتخطيط المدني الأموي، يجمع بين المخطط الروماني والعمارة الإسلامية المبكرة.',
      },
    },
    {
      year: 2024,
      title: { en: 'Enhanced protection', ar: 'حماية معزّزة' },
      text: {
        en: 'In November 2024, as war returns to Lebanon, UNESCO places Anjar and 33 other heritage sites in the country under enhanced protection against attack.',
        ar: 'في تشرين الثاني 2024، مع عودة الحرب إلى لبنان، تضع اليونسكو عنجر و33 موقعاً تراثياً آخر في البلاد تحت الحماية المعزّزة من الاعتداءات.',
      },
    },
  ],
  photos: PHOTOS,
  experience: true,
}
