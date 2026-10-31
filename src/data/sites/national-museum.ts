import type { Site } from '../types'
import { PHOTOS } from './national-museum.photos'

export const NATIONAL_MUSEUM: Site = {
  id: 'national-museum',
  name: { en: 'National Museum of Beirut', ar: 'متحف بيروت الوطني' },
  tagline: { en: 'Lebanon\'s treasures, saved from the war', ar: 'كنوز لبنان التي نجت من الحرب' },
  summary: {
    en: 'Lebanon\'s principal archaeological museum holds about 100,000 objects, from Phoenician sarcophagi to Roman mosaics. Opened in 1942 on what became the civil war front line, it survived only because its curator sealed the collection in concrete. Restored and reopened in 1999, it is the country\'s memory in stone.',
    ar: 'يضم المتحف الأثري الأول في لبنان نحو 100 ألف قطعة، من النواويس الفينيقية إلى الفسيفساء الرومانية. افتُتح عام 1942 على ما صار لاحقاً خط الجبهة في الحرب الأهلية، ولم ينجُ إلا لأن القيّم عليه حبس المجموعة في الخرسانة. وبعد ترميمه وإعادة افتتاحه عام 1999 بات ذاكرة البلاد المحفورة في الحجر.',
  },
  category: 'museum',
  region: 'beirut',
  coords: [33.878, 35.515],
  facts: [
    { en: 'About 100,000 objects, 1,300 on display', ar: 'نحو 100 ألف قطعة، 1300 منها معروضة' },
    { en: 'Ahiram sarcophagus: oldest Phoenician alphabet text', ar: 'ناووس أحيرام: أقدم نص بالأبجدية الفينيقية' },
    { en: 'Opened 27 May 1942', ar: 'افتُتح في 27 أيار 1942' },
    { en: 'Reopened in 1999 after the civil war', ar: 'أُعيد افتتاحه عام 1999 بعد الحرب الأهلية' },
  ],
  events: [
    {
      year: -1000,
      approx: true,
      title: { en: 'The sarcophagus of Ahiram', ar: 'ناووس أحيرام' },
      text: {
        en: 'A king of Byblos is laid in a carved stone sarcophagus. Its 38-word inscription is the oldest known text in the fully developed Phoenician alphabet.',
        ar: 'يُدفن ملك جبيل في ناووس حجري منحوت، يحمل نقشاً من 38 كلمة هو أقدم نص معروف بالأبجدية الفينيقية المكتملة.',
      },
    },
    {
      year: 1919,
      title: { en: 'A first collection', ar: 'مجموعة أولى' },
      text: {
        en: 'Raymond Weill, a French officer and archaeologist stationed in Lebanon, shows his small collection of antiquities in a provisional museum in Beirut.',
        ar: 'يعرض ريمون ويل، الضابط وعالم الآثار الفرنسي المقيم في لبنان، مجموعته الصغيرة من الآثار في متحف مؤقت في بيروت.',
      },
    },
    {
      year: 1923,
      title: { en: 'Friends of the Museum', ar: 'لجنة أصدقاء المتحف' },
      text: {
        en: 'A committee led by Bechara El Khoury is formed to raise funds for a national museum. The same year Pierre Montet unearths the Ahiram sarcophagus at Byblos.',
        ar: 'تتشكل لجنة برئاسة بشارة الخوري لجمع التمويل لمتحف وطني، وفي العام نفسه يكتشف بيير مونتيه ناووس أحيرام في جبيل.',
      },
    },
    {
      year: 1930,
      title: { en: 'Building the museum', ar: 'بناء المتحف' },
      text: {
        en: 'Construction begins to the design of Antoine Nahas and Pierre Leprince-Ringuet. The ochre stone building with its columned portico is completed in 1937.',
        ar: 'يبدأ البناء وفق تصميم أنطوان نحاس وبيير لوبرانس رينغيه، ويكتمل المبنى بحجره الأصفر ورواقه ذي الأعمدة عام 1937.',
      },
    },
    {
      year: 1942,
      title: { en: 'The museum opens', ar: 'افتتاح المتحف' },
      text: {
        en: 'On 27 May the National Museum is inaugurated by President Alfred Naqqache. Maurice Chéhab, who has run it since the 1930s, arranges the galleries.',
        ar: 'في 27 أيار يفتتح الرئيس ألفرد نقاش المتحف الوطني، ويرتّب الأمير موريس شهاب، القيّم عليه منذ الثلاثينيات، قاعاته.',
      },
    },
    {
      year: 1975,
      title: { en: 'Sealed in concrete', ar: 'محبوسة في الخرسانة' },
      text: {
        en: 'War puts the museum on the Green Line. Chéhab hides small objects in the basement, covers the mosaics and encases the great sarcophagi in concrete.',
        ar: 'تضع الحرب المتحف على الخط الأخضر، فيخبّئ شهاب القطع الصغيرة في الطابق السفلي، ويغطي الفسيفساء، ويغلّف النواويس الكبرى بالخرسانة.',
      },
    },
    {
      year: 1999,
      title: { en: 'Reborn after the war', ar: 'ولادة جديدة بعد الحرب' },
      text: {
        en: 'After restoration work begun in 1995, the concrete casings are broken open and the museum fully reopens to the public on 8 October.',
        ar: 'بعد أعمال ترميم بدأت عام 1995، تُكسر الأغلفة الخرسانية ويُعاد افتتاح المتحف بالكامل للجمهور في 8 تشرين الأول.',
      },
    },
    {
      year: 2016,
      title: { en: 'The basement reopens', ar: 'إعادة افتتاح الطابق السفلي' },
      text: {
        en: 'The underground floor, closed since the war began, reopens on 7 October after two years of restoration, with its displays devoted to funerary art.',
        ar: 'يُعاد افتتاح الطابق تحت الأرضي، المغلق منذ بداية الحرب، في 7 تشرين الأول بعد سنتين من الترميم، وتُخصَّص معروضاته للفن الجنائزي.',
      },
    },
    {
      year: 2020,
      title: { en: 'The port explosion', ar: 'انفجار المرفأ' },
      text: {
        en: 'The 4 August blast at Beirut port blows out the museum\'s windows and doors and wrecks its security systems. The museum reopens in August 2021.',
        ar: 'يحطّم انفجار 4 آب في مرفأ بيروت نوافذ المتحف وأبوابه ويعطّل أنظمته الأمنية، ويُعاد افتتاحه في آب 2021.',
      },
    },
  ],
  photos: PHOTOS,
}
