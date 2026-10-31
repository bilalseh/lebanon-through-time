import type { Site } from '../types'
import { PHOTOS } from './tripoli-citadel.photos'

export const TRIPOLI_CITADEL: Site = {
  id: 'tripoli-citadel',
  name: { en: 'Tripoli Citadel', ar: 'قلعة طرابلس' },
  tagline: { en: 'The largest Crusader fortress in Lebanon', ar: 'أكبر قلعة صليبية في لبنان' },
  summary: {
    en: 'On a hill above the Abu Ali river, Raymond de Saint-Gilles built a fortress to besiege Tripoli, and it has watched over the city ever since. Burned by the Mamluks and rebuilt by them, then restored by Ottoman governors, the citadel still towers over a Mamluk old town of mosques, madrasas, khans and hammams.',
    ar: 'على تلة تشرف على نهر أبو علي، بنى ريمون دي سان جيل حصناً لمحاصرة طرابلس، وما زال يحرس المدينة منذ ذلك الحين. أحرقه المماليك ثم أعادوا بناءه، ورممه الولاة العثمانيون، ولا تزال القلعة تعلو مدينة قديمة مملوكية من المساجد والمدارس والخانات والحمامات.',
  },
  category: 'castle',
  region: 'north',
  coords: [34.433, 35.8442],
  facts: [
    { en: 'Founded 1102-1103 on Pilgrim\'s Mount', ar: 'أُسست بين 1102 و1103 على جبل الحجاج' },
    { en: 'About 136 m long and 70 m wide', ar: 'نحو 136 متراً طولاً و70 متراً عرضاً' },
    { en: 'Rebuilt by the Mamluks 1307-1308', ar: 'أعاد المماليك بناءها بين 1307 و1308' },
    { en: 'Some 35 Mamluk monuments in the town below', ar: 'نحو 35 أثراً مملوكياً في المدينة تحتها' },
  ],
  events: [
    {
      year: 1103,
      approx: true,
      title: { en: 'A siege castle on Pilgrim\'s Mount', ar: 'حصن الحصار على جبل الحجاج' },
      text: {
        en: 'Count Raymond de Saint-Gilles builds a fortress on the hill he names Mons Peregrinus to blockade Tripoli. He dies inside its walls in 1105.',
        ar: 'يبني الكونت ريمون دي سان جيل حصناً على التلة التي سمّاها جبل الحجاج لمحاصرة طرابلس، ويموت داخل أسواره عام 1105.',
      },
    },
    {
      year: 1109,
      title: { en: 'Tripoli falls to the Crusaders', ar: 'سقوط طرابلس بيد الصليبيين' },
      text: {
        en: 'After seven years of siege the city surrenders. It becomes the capital of the County of Tripoli, and the castle remains its stronghold for 180 years.',
        ar: 'بعد حصار دام سبع سنوات تستسلم المدينة، فتغدو عاصمة كونتية طرابلس، وتبقى القلعة معقلها طوال 180 عاماً.',
      },
    },
    {
      year: 1289,
      title: { en: 'Qalawun takes the city', ar: 'قلاوون يفتح المدينة' },
      text: {
        en: 'Mamluk sultan Qalawun captures Tripoli and razes the old port town. A new city is laid out inland, at the foot of the castle hill.',
        ar: 'يستولي السلطان المملوكي قلاوون على طرابلس ويهدم مدينة الميناء القديمة، وتُنشأ مدينة جديدة في الداخل عند سفح تلة القلعة.',
      },
    },
    {
      year: 1294,
      title: { en: 'The Great Mansouri Mosque', ar: 'الجامع المنصوري الكبير' },
      text: {
        en: 'Qalawun\'s son al-Ashraf Khalil begins the city\'s great mosque on the ruins of a Crusader church. Khans, hammams and madrasas follow over the next century.',
        ar: 'يبدأ الأشرف خليل بن قلاوون بناء الجامع الكبير للمدينة على أنقاض كنيسة صليبية، وتتبعه الخانات والحمامات والمدارس خلال القرن التالي.',
      },
    },
    {
      year: 1308,
      approx: true,
      title: { en: 'The Mamluks rebuild the citadel', ar: 'المماليك يعيدون بناء القلعة' },
      text: {
        en: 'Burned at the conquest and left empty for years, the castle is rebuilt in 1307-1308 under the Mamluk governor of the city, Asandamir Kurji.',
        ar: 'بعد أن أُحرقت القلعة عند الفتح وبقيت مهجورة سنوات، يعيد نائب المدينة المملوكي أسندمر الكرجي بناءها بين عامي 1307 و1308.',
      },
    },
    {
      year: 1521,
      title: { en: 'Ottoman restoration', ar: 'ترميم عثماني' },
      text: {
        en: 'Five years after the Ottoman conquest, Sultan Suleiman the Magnificent orders the citadel restored. Later governors cut gun ports through the medieval battlements.',
        ar: 'بعد خمس سنوات من الفتح العثماني يأمر السلطان سليمان القانوني بترميم القلعة، ويفتح الولاة اللاحقون فتحات للمدافع في شرفاتها الوسيطة.',
      },
    },
    {
      year: 1810,
      approx: true,
      title: { en: 'Mustafa Agha Barbar rebuilds', ar: 'مصطفى آغا بربر يجدد القلعة' },
      text: {
        en: 'The governor of Tripoli, Mustafa Agha Barbar, extensively restores and rebuilds the fortress in the early 19th century, giving it much of its present form.',
        ar: 'يرمم والي طرابلس مصطفى آغا بربر القلعة ويعيد بناء أجزاء واسعة منها في مطلع القرن التاسع عشر، فتأخذ معظم شكلها الحالي.',
      },
    },
    {
      year: 1900,
      approx: true,
      title: { en: 'From fortress to prison', ar: 'من حصن إلى سجن' },
      text: {
        en: 'In the last decades of Ottoman rule the fortress is turned into a prison. In 1910 more than 400 old cannons are reportedly found inside its walls.',
        ar: 'في العقود الأخيرة من الحكم العثماني يتحول الحصن إلى سجن، ويُروى أن أكثر من 400 مدفع قديم عُثر عليها داخل أسواره عام 1910.',
      },
    },
    {
      year: 2025,
      title: { en: 'Restored and reopened', ar: 'ترميم وإعادة افتتاح' },
      text: {
        en: 'A British-funded rehabilitation carried out with the Lebanese Army and young people from the city is completed. The citadel, home to a small regional museum, reopens.',
        ar: 'يكتمل مشروع ترميم بتمويل بريطاني نُفذ بمشاركة الجيش اللبناني وشباب المدينة، وتعود القلعة، التي تضم متحفاً صغيراً للمنطقة، لاستقبال الزوار.',
      },
    },
  ],
  photos: PHOTOS,
}
