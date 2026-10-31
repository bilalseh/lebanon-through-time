import type { Era, Hotspot } from '../../data/types'
import { CAUSEWAY, EAST_TOWER, KHAN, ROMAN_COLUMNS, WEST_TOWER } from './layout'

const [wx, wz] = WEST_TOWER.center
const [ex, ez] = EAST_TOWER.center
const cx = CAUSEWAY.shoreX - CAUSEWAY.length / 2

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'west-tower',
    visibleFrom: 0.5,
    label: { en: 'West Tower', ar: 'البرج الغربي' },
    title: { en: 'The West Tower', ar: 'البرج الغربي' },
    body: {
      en: 'The best-preserved part of the castle: a rectangular Crusader keep of two storeys, with a vaulted hall below and a terrace above. A small domed mosque was added on top in the Ottoman period.',
      ar: 'الجزء الأفضل حفظاً من القلعة: برج صليبي مستطيل من طابقين، بقاعة معقودة في الأسفل وشرفة في الأعلى. وأُضيف فوقه مسجد صغير مقبّب في العهد العثماني.',
    },
    facts: [
      { en: 'Built 1228', ar: 'بُني عام 1228' },
      { en: 'Two storeys', ar: 'طابقان' },
      { en: 'Ottoman mosque on top', ar: 'مسجد عثماني في الأعلى' },
    ],
    position: [wx, WEST_TOWER.y + WEST_TOWER.size[1] + 9, wz],
    camera: { position: [wx - 55, 32, wz + 45], target: [wx, WEST_TOWER.y + 7, wz] },
  },
  {
    id: 'east-tower',
    visibleFrom: 0.55,
    label: { en: 'East Tower', ar: 'البرج الشرقي' },
    title: { en: 'The East Tower', ar: 'البرج الشرقي' },
    body: {
      en: 'Built in two phases, the east tower lost its upper storey when the Mamluks dismantled the castle after 1291 so the Crusaders could never return to it.',
      ar: 'بُني البرج الشرقي على مرحلتين، وفقد طابقه العلوي عندما هدم المماليك القلعة بعد عام 1291 كي لا يعود إليها الصليبيون.',
    },
    facts: [
      { en: 'Dismantled after 1291', ar: 'هُدم بعد 1291' },
      { en: 'Upper storey never rebuilt', ar: 'لم يُعد بناء الطابق العلوي' },
    ],
    position: [ex, EAST_TOWER.upperY + 10, ez],
    camera: { position: [ex + 48, 26, ez + 48], target: [ex, EAST_TOWER.y + 5, ez] },
  },
  {
    id: 'causeway',
    visibleFrom: 0.1,
    label: { en: 'The causeway', ar: 'الجسر الحجري' },
    title: { en: 'The causeway', ar: 'الجسر الحجري' },
    body: {
      en: 'An arcaded stone bridge about 80 metres long links the islet to the shore. It was the only way in: anyone approaching had to cross it under the walls.',
      ar: 'جسر حجري معقود بطول نحو 80 متراً يربط الجزيرة الصغيرة بالشاطئ. كان المدخل الوحيد: على كل قادم أن يعبره تحت الأسوار.',
    },
    facts: [
      { en: '≈ 80 m long', ar: 'نحو 80 م طولاً' },
      { en: 'Stone arches', ar: 'أقواس حجرية' },
    ],
    position: [cx, 12, CAUSEWAY.z],
    camera: { position: [cx + 10, 28, CAUSEWAY.z + 62], target: [cx, 3, CAUSEWAY.z] },
  },
  {
    id: 'roman-columns',
    visibleFrom: 0.8,
    label: { en: 'Roman columns', ar: 'الأعمدة الرومانية' },
    title: { en: 'Roman columns in the walls', ar: 'أعمدة رومانية في الجدران' },
    body: {
      en: 'The builders reused granite columns from Roman Sidon as horizontal ties, laying them through the walls. Their ends still stick out of the masonry like stone beams.',
      ar: 'أعاد البنّاؤون استخدام أعمدة من الغرانيت من صيدا الرومانية كروابط أفقية، فوضعوها عبر الجدران. ولا تزال أطرافها بارزة من البناء كعوارض حجرية.',
    },
    facts: [
      { en: 'Reused Roman granite', ar: 'غرانيت روماني معاد الاستخدام' },
      { en: 'Laid through the walls', ar: 'ممتدة عبر الجدران' },
    ],
    position: [ROMAN_COLUMNS[0][0] - 3, ROMAN_COLUMNS[1][1] + 5, ROMAN_COLUMNS[0][2]],
    camera: { position: [wx - 48, 12, wz + 10], target: [wx - 11, WEST_TOWER.y + 6, wz] },
  },
  {
    id: 'old-sidon',
    label: { en: 'Old Sidon', ar: 'صيدا القديمة' },
    title: { en: 'Old Sidon and Khan al-Franj', ar: 'صيدا القديمة وخان الإفرنج' },
    body: {
      en: 'On the shore, the old city grew around its harbour. In the 17th century Fakhr al-Din II built Khan al-Franj, a great courtyard inn for French merchants trading in silk.',
      ar: 'على الشاطئ نمت المدينة القديمة حول مينائها. وفي القرن السابع عشر بنى فخر الدين الثاني خان الإفرنج، وهو خان كبير بساحة للتجار الفرنسيين العاملين في تجارة الحرير.',
    },
    facts: [
      { en: 'Khan al-Franj, 17th c.', ar: 'خان الإفرنج، القرن 17' },
      { en: 'Silk trade with France', ar: 'تجارة الحرير مع فرنسا' },
    ],
    position: [KHAN.center[0], KHAN.size[1] + 14, KHAN.center[1]],
    camera: { position: [KHAN.center[0] - 70, 55, KHAN.center[1] + 90], target: [KHAN.center[0] + 10, 6, KHAN.center[1]] },
  },
]

export const ERAS: Era[] = [
  {
    t: 0,
    label: { en: 'c. 1200', ar: 'نحو 1200 م' },
    title: { en: 'A rocky islet', ar: 'جزيرة صخرية صغيرة' },
    text: {
      en: 'Off the harbour of Sidon lies a small islet, once the site of a Phoenician temple to Melqart.',
      ar: 'قبالة ميناء صيدا تقع جزيرة صغيرة، كانت يوماً موقع معبد فينيقي للإله ملقارت.',
    },
  },
  {
    t: 1,
    label: { en: '1228', ar: '1228 م' },
    title: { en: 'The Crusader castle', ar: 'القلعة الصليبية' },
    text: {
      en: 'Crusaders build the castle in a few months to guard the harbour, linking it to the shore by a stone causeway.',
      ar: 'يبني الصليبيون القلعة في بضعة أشهر لحماية الميناء، ويربطونها بالشاطئ بجسر حجري.',
    },
  },
  {
    t: 2,
    label: { en: '1291', ar: '1291 م' },
    title: { en: 'Dismantled by the Mamluks', ar: 'هدم المماليك' },
    text: {
      en: 'After taking Sidon, the Mamluks pull down the upper works so the castle can never shelter a Crusader return.',
      ar: 'بعد الاستيلاء على صيدا، يهدم المماليك الأجزاء العليا كي لا تؤوي القلعة عودة صليبية.',
    },
  },
  {
    t: 3,
    label: { en: 'c. 1650', ar: 'نحو 1650 م' },
    title: { en: 'Restored by Fakhr al-Din II', ar: 'ترميم فخر الدين الثاني' },
    text: {
      en: 'The emir repairs the castle, adds a small mosque and builds Khan al-Franj on the shore for the silk trade.',
      ar: 'يرمم الأمير القلعة ويضيف مسجداً صغيراً، ويبني خان الإفرنج على الشاطئ لتجارة الحرير.',
    },
  },
  {
    t: 4,
    label: { en: 'Today', ar: 'اليوم' },
    title: { en: 'A landmark of Sidon', ar: 'معلم من معالم صيدا' },
    text: {
      en: 'The west tower and the causeway still stand; the modern city rises behind the old harbour.',
      ar: 'لا يزال البرج الغربي والجسر قائمين، وترتفع المدينة الحديثة خلف الميناء القديم.',
    },
  },
]
