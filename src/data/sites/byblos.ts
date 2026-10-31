import type { Site } from '../types'
import { PHOTOS } from './byblos.photos'

export const BYBLOS: Site = {
  id: 'byblos',
  name: { en: 'Byblos', ar: 'جبيل' },
  tagline: { en: 'Where the alphabet set sail', ar: 'من هنا أبحرت الأبجدية' },
  summary: {
    en: 'On a promontory north of Beirut, Byblos has been inhabited since the Neolithic and grew rich shipping cedar to the pharaohs. Its royal tombs yielded the sarcophagus of Ahiram, carved with the earliest fully developed Phoenician alphabet, and a Crusader castle still rises above the Bronze Age temples and the old harbour.',
    ar: 'على رأس صخري شمال بيروت، سُكنت جبيل منذ العصر الحجري الحديث وازدهرت بتصدير خشب الأرز إلى الفراعنة. وقد كشفت مقابرها الملكية عن ناووس أحيرام المنقوش بأقدم نماذج الأبجدية الفينيقية المكتملة، ولا تزال قلعة صليبية تعلو معابد العصر البرونزي والميناء القديم.',
  },
  category: 'ancient',
  region: 'mount-lebanon',
  coords: [34.12, 35.648],
  unesco: 1984,
  facts: [
    { en: 'Settled since about 7000 BC', ar: 'مأهولة منذ نحو 7000 ق.م' },
    { en: 'The word "Bible" comes from its Greek name', ar: 'كلمة Bible مشتقة من اسمها اليوناني' },
    { en: '22-letter Phoenician alphabet, c. 1000 BC', ar: 'أبجدية فينيقية من 22 حرفاً، نحو 1000 ق.م' },
    { en: 'UNESCO World Heritage since 1984', ar: 'تراث عالمي منذ 1984' },
  ],
  events: [
    {
      year: -7000,
      approx: true,
      title: { en: 'A Neolithic fishing village', ar: 'قرية صيد من العصر الحجري الحديث' },
      text: {
        en: 'Farmers and fishermen settle the promontory in the Neolithic, with the earliest traces going back to around 8800 BC. Byblos has been inhabited ever since.',
        ar: 'يستوطن مزارعون وصيادون الرأس الصخري في العصر الحجري الحديث، وتعود أقدم الآثار إلى نحو 8800 قبل الميلاد. ومنذ ذلك الحين لم تنقطع الحياة في جبيل.',
      },
    },
    {
      year: -2600,
      approx: true,
      title: { en: 'Cedar for the pharaohs', ar: 'أرز للفراعنة' },
      text: {
        en: 'Byblos ships cedar timber to Egypt, and its name appears in Egyptian records from the reign of Sneferu. For centuries it is almost an Egyptian outpost on the coast.',
        ar: 'تصدّر جبيل خشب الأرز إلى مصر، ويرد اسمها في السجلات المصرية منذ عهد الملك سنفرو. وتبقى لقرون أشبه بمحطة مصرية على الساحل.',
      },
    },
    {
      year: -1600,
      approx: true,
      title: { en: 'Temple of the Obelisks', ar: 'معبد المسلات' },
      text: {
        en: 'A sanctuary crowded with stone obelisks is built over the older L-shaped temple. Dunand later finds more than 1,300 votive figurines here, many of gilded bronze.',
        ar: 'يُشيَّد فوق المعبد الأقدم المعروف بشكل حرف L معبد تزدحم فيه المسلات الحجرية. ويعثر فيه دينان لاحقاً على أكثر من 1300 تمثال نذري، كثير منها من البرونز المذهّب.',
      },
    },
    {
      year: -1000,
      approx: true,
      title: { en: 'The sarcophagus of Ahiram', ar: 'ناووس أحيرام' },
      text: {
        en: 'King Ahiram is laid in a carved stone sarcophagus. Its inscription is the earliest known example of the fully developed Phoenician alphabet, ancestor of Greek, Latin and Arabic script.',
        ar: 'يُدفن الملك أحيرام في ناووس حجري منحوت. وتُعدّ كتابته أقدم نموذج معروف للأبجدية الفينيقية المكتملة، التي تتحدّر منها الحروف اليونانية واللاتينية والعربية.',
      },
    },
    {
      year: 218,
      approx: true,
      title: { en: 'A Roman theatre by the sea', ar: 'مسرح روماني على البحر' },
      text: {
        en: 'Under Rome the city is a centre of the cult of Adonis. Herod gives it a new wall, and a small theatre is built around AD 218; its lower tiers still stand at the edge of the site.',
        ar: 'في العهد الروماني تكون المدينة مركزاً لعبادة أدونيس. يمنحها هيرودس سوراً جديداً، ويُبنى مسرح صغير نحو سنة 218 ميلادية لا تزال مدرجاته السفلى قائمة عند طرف الموقع.',
      },
    },
    {
      year: 1104,
      title: { en: 'Crusader Gibelet', ar: 'جيبليه الصليبية' },
      text: {
        en: 'The Crusaders take the town, which they call Gibelet, and the Genoese Embriaco family builds a castle from local limestone and reused Roman columns. Saladin seizes it in 1188.',
        ar: 'يستولي الصليبيون على المدينة ويسمّونها جيبليه، وتشيّد عائلة إمبرياكو الجنوية قلعة من الحجر الكلسي المحلي وأعمدة رومانية معاد استخدامها. ويأخذها صلاح الدين سنة 1188.',
      },
    },
    {
      year: 1923,
      title: { en: 'Montet finds the royal tombs', ar: 'مونتيه يكتشف المقابر الملكية' },
      text: {
        en: 'After a landslide exposes the royal necropolis, Pierre Montet excavates the tombs between 1921 and 1924 and lifts the sarcophagus of Ahiram from tomb V in 1923.',
        ar: 'بعد أن يكشف انهيار أرضي المقبرة الملكية، ينقّب بيار مونتيه في المدافن بين عامي 1921 و1924 ويستخرج ناووس أحيرام من المدفن الخامس سنة 1923.',
      },
    },
    {
      year: 1925,
      title: { en: "Dunand's forty years", ar: 'أربعون عاماً مع دينان' },
      text: {
        en: 'Maurice Dunand takes over the excavations and works at Byblos for about forty years, uncovering the temples and moving the Temple of the Obelisks to reach the one beneath it.',
        ar: 'يتولى موريس دينان الحفريات ويعمل في جبيل نحو أربعين عاماً، فيكشف المعابد وينقل معبد المسلات بأكمله للوصول إلى المعبد الذي تحته.',
      },
    },
    {
      year: 1984,
      title: { en: 'World Heritage Site', ar: 'موقع تراث عالمي' },
      text: {
        en: 'UNESCO inscribes Byblos on the World Heritage List, citing its direct link to the history of the Phoenician alphabet and its thousands of years of unbroken settlement.',
        ar: 'تدرج اليونسكو جبيل على قائمة التراث العالمي لارتباطها المباشر بتاريخ الأبجدية الفينيقية ولآلاف السنين من الاستيطان المتواصل.',
      },
    },
    {
      year: 2003,
      title: { en: 'Byblos International Festival', ar: 'مهرجانات بيبلوس الدولية' },
      text: {
        en: 'A summer music festival is launched on the waterfront below the castle. Since 2003 it has drawn international names from Bryan Ferry to Massive Attack.',
        ar: 'يُطلق مهرجان موسيقي صيفي على الواجهة البحرية أسفل القلعة. ومنذ 2003 يستقطب أسماء عالمية من براين فيري إلى ماسيف أتاك.',
      },
    },
  ],
  photos: PHOTOS,
}
