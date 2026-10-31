import type { Site } from '../types'
import { PHOTOS } from './jeita-grotto.photos'

export const JEITA_GROTTO: Site = {
  id: 'jeita-grotto',
  name: { en: 'Jeita Grotto', ar: 'مغارة جعيتا' },
  tagline: { en: 'Nine kilometres of cathedral-like caverns', ar: 'تسعة كيلومترات من الكهوف الشاهقة' },
  summary: {
    en: 'In the Nahr al-Kalb valley north of Beirut, an underground river has carved nearly nine kilometres of galleries through Jurassic limestone. Visitors cross the lower cave by boat and walk the dry upper galleries beneath some of the longest stalactites ever measured. The river still supplies Beirut with drinking water.',
    ar: 'في وادي نهر الكلب شمال بيروت، نحت نهر جوفي قرابة تسعة كيلومترات من الأروقة في الحجر الكلسي الجوراسي. يعبر الزوار المغارة السفلى بالقارب ويمشون في الأروقة العليا الجافة تحت بعض من أطول الهوابط التي قيست على الإطلاق. ولا يزال النهر يزوّد بيروت بمياه الشرب.',
  },
  category: 'nature',
  region: 'mount-lebanon',
  coords: [33.944, 35.641],
  facts: [
    { en: 'Nearly 9 km of galleries', ar: 'قرابة 9 كيلومترات من الأروقة' },
    { en: 'Stalactite of about 8.2 m, among the world\'s longest', ar: 'هابطة بطول نحو 8.2 متر، من الأطول في العالم' },
    { en: 'Drinking water for about 1.5 million people', ar: 'مياه شرب لنحو 1.5 مليون شخص' },
    { en: 'New7Wonders of Nature finalist in 2011', ar: 'من المرشحين النهائيين لعجائب الطبيعة السبع عام 2011' },
  ],
  events: [
    {
      year: 1836,
      title: { en: 'A gunshot in the dark', ar: 'طلقة في الظلام' },
      text: {
        en: 'The American missionary William Thomson reaches the underground river. He fires a shot into the void, and the echoes convince him the cave is immense.',
        ar: 'يصل المبشّر الأميركي وليام طومسون إلى النهر الجوفي، ويطلق النار في الفراغ، فيقنعه الصدى بأن المغارة هائلة الحجم.',
      },
    },
    {
      year: 1864,
      title: { en: 'Stone Age hunters at the entrance', ar: 'صيادو العصر الحجري عند المدخل' },
      text: {
        en: 'The Duc de Luynes and Louis Lartet dig at a cave by the source and find flint tools, evidence that people sheltered here in the Upper Palaeolithic.',
        ar: 'ينقّب دوق دو لوين ولويس لارتيه في كهف قرب النبع ويعثران على أدوات صوانية تدل على أن البشر لجؤوا إلى هنا في العصر الحجري القديم الأعلى.',
      },
    },
    {
      year: 1873,
      title: { en: 'Engineers against Hell\'s Rapids', ar: 'المهندسون في مواجهة "مسالك الجحيم"' },
      text: {
        en: 'Maxwell and Huxley of the Beirut Water Company, with Daniel Bliss of the Syrian Protestant College, push 1,060 metres upstream until a waterfall stops them.',
        ar: 'يتوغل ماكسويل وهكسلي من شركة مياه بيروت، ومعهما دانيال بليس رئيس الكلية السورية الإنجيلية، 1060 متراً عكس التيار حتى يوقفهم شلال جوفي.',
      },
    },
    {
      year: 1958,
      title: { en: 'The upper galleries', ar: 'الأروقة العليا' },
      text: {
        en: 'Lebanese cavers Georges Farra and Sami Karkabi discover dry galleries some 60 metres above the river. The same year the lower cave opens to visitors.',
        ar: 'يكتشف مستكشفا المغاور اللبنانيان جورج فرّا وسامي كركبي أروقة جافة على ارتفاع نحو 60 متراً فوق النهر، وفي العام نفسه تُفتح المغارة السفلى للزوار.',
      },
    },
    {
      year: 1969,
      title: { en: 'Concerts underground', ar: 'حفلات موسيقية تحت الأرض' },
      text: {
        en: 'A new tunnel opens the upper galleries to the public. A concert by François Bayle marks the opening, and Karlheinz Stockhausen performs in November.',
        ar: 'يفتح نفق جديد الأروقة العليا أمام الجمهور، ويُحيي فرانسوا بايل حفلاً بمناسبة الافتتاح، ثم يقدّم كارلهاينز شتوكهاوزن عرضاً في تشرين الثاني.',
      },
    },
    {
      year: 1978,
      title: { en: 'Closed by war', ar: 'الإغلاق بسبب الحرب' },
      text: {
        en: 'The civil war shuts the grotto. Its access tunnels are used to store munitions, and the caves stay closed to the public for seventeen years.',
        ar: 'تُغلق الحرب الأهلية المغارة، وتُستخدم أنفاقها لتخزين الذخائر، وتبقى الكهوف مقفلة أمام الجمهور سبعة عشر عاماً.',
      },
    },
    {
      year: 1995,
      title: { en: 'Jeita reopens', ar: 'إعادة افتتاح جعيتا' },
      text: {
        en: 'After restoration the lower and upper caves reopen to the public, and Jeita soon draws around 280,000 visitors a year from Lebanon and abroad.',
        ar: 'بعد الترميم تُعاد المغارتان السفلى والعليا إلى الجمهور، وسرعان ما تستقطب جعيتا نحو 280 ألف زائر سنوياً من لبنان والخارج.',
      },
    },
    {
      year: 2011,
      title: { en: 'Among the world\'s wonders', ar: 'بين عجائب العالم' },
      text: {
        en: 'Jeita reaches the final round of the New7Wonders of Nature vote. It misses the final seven, but the campaign makes it Lebanon\'s best-known natural landmark.',
        ar: 'تبلغ جعيتا المرحلة النهائية في تصويت عجائب الطبيعة السبع الجديدة. ولا تدخل السبع الأخيرة، لكن الحملة تجعلها أشهر معلم طبيعي في لبنان.',
      },
    },
  ],
  photos: PHOTOS,
}
