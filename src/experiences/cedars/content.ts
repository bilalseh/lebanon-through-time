import type { Era, Hotspot } from '../../data/types'
import { CHAPEL, HADRIAN_MARKERS, WALL, groundHeight } from './layout'

const [cx, cz] = CHAPEL.position
const [mx, mz] = HADRIAN_MARKERS[5]
const townX = -390
const townZ = 290

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'grove',
    label: { en: 'The grove', ar: 'الغابة' },
    title: { en: 'Arz el-Rab, the Cedars of God', ar: 'أرز الرب' },
    body: {
      en: 'About 375 ancient cedars survive here at 2,000 metres, some of them well over a thousand years old. They are the last of the forests that once covered Mount Lebanon.',
      ar: 'يبقى هنا نحو 375 شجرة أرز قديمة على ارتفاع 2000 متر، يتجاوز عمر بعضها ألف عام بكثير. وهي آخر ما تبقّى من الغابات التي كانت تغطي جبل لبنان.',
    },
    facts: [
      { en: '≈ 375 old trees', ar: 'نحو 375 شجرة قديمة' },
      { en: '≈ 2,000 m altitude', ar: 'ارتفاع نحو 2000 م' },
      { en: 'UNESCO since 1998', ar: 'يونسكو منذ 1998' },
    ],
    position: [40, groundHeight(40, -20) + 42, -20],
    camera: { position: [-150, 90, 190], target: [0, 20, 0] },
  },
  {
    id: 'chapel',
    visibleFrom: 2.8,
    label: { en: 'The chapel', ar: 'الكنيسة' },
    title: { en: 'The chapel in the grove', ar: 'كنيسة الغابة' },
    body: {
      en: 'A small Maronite chapel, built in 1843 among the trees, where a feast of the Transfiguration is celebrated every August.',
      ar: 'كنيسة مارونية صغيرة بُنيت عام 1843 بين الأشجار، يُحتفل فيها بعيد التجلّي في آب من كل عام.',
    },
    facts: [
      { en: 'Built 1843', ar: 'بُنيت عام 1843' },
      { en: 'Maronite', ar: 'مارونية' },
    ],
    position: [cx, groundHeight(cx, cz) + 16, cz],
    camera: { position: [cx - 45, groundHeight(cx, cz) + 22, cz + 40], target: [cx, groundHeight(cx, cz) + 3, cz] },
  },
  {
    id: 'hadrian',
    visibleFrom: 1.85,
    label: { en: "Hadrian's markers", ar: 'علامات هادريان' },
    title: { en: "Hadrian's forest boundary", ar: 'حدود غابة هادريان' },
    body: {
      en: 'In the 2nd century Emperor Hadrian had inscriptions carved on rocks across Mount Lebanon, declaring the best timber imperial property and forbidding its felling.',
      ar: 'في القرن الثاني أمر الإمبراطور هادريان بنقش كتابات على الصخور عبر جبل لبنان، تعلن أن أجود الأخشاب ملك للإمبراطور وتحظر قطعها.',
    },
    facts: [
      { en: '2nd century AD', ar: 'القرن الثاني الميلادي' },
      { en: 'Hundreds of inscriptions', ar: 'مئات النقوش' },
    ],
    position: [mx, groundHeight(mx, mz) + 10, mz],
    camera: { position: [mx - 30, groundHeight(mx, mz) + 14, mz + 28], target: [mx, groundHeight(mx, mz) + 1, mz] },
  },
  {
    id: 'wall',
    visibleFrom: 2.9,
    label: { en: 'The 1876 wall', ar: 'سور 1876' },
    title: { en: 'The wall of 1876', ar: 'سور عام 1876' },
    body: {
      en: 'Goats were eating the seedlings. In 1876 a stone wall was built around the grove, usually said to have been paid for by Queen Victoria: the first act of protection in modern times.',
      ar: 'كانت الماعز تأكل الشتلات، فبُني عام 1876 سور حجري حول الغابة، يُنسب تمويله عادةً إلى الملكة فيكتوريا، وهو أول إجراء حماية في العصر الحديث.',
    },
    facts: [
      { en: 'Built 1876', ar: 'بُني عام 1876' },
      { en: 'Credited to Queen Victoria', ar: 'يُنسب إلى الملكة فيكتوريا' },
    ],
    position: [0, groundHeight(0, WALL.rz) + 10, WALL.rz],
    camera: { position: [-60, groundHeight(0, WALL.rz) + 25, WALL.rz + 70], target: [0, groundHeight(0, WALL.rz) + 2, WALL.rz] },
  },
  {
    id: 'qadisha',
    label: { en: 'Qadisha Valley', ar: 'وادي قاديشا' },
    title: { en: 'The Qadisha Valley and Bsharri', ar: 'وادي قاديشا وبشرّي' },
    body: {
      en: 'Below the grove the Holy Valley drops away, dotted with rock-cut monasteries that sheltered Maronite patriarchs for centuries. Bsharri, birthplace of Khalil Gibran, sits on its rim.',
      ar: 'تحت الغابة ينحدر الوادي المقدّس، تتناثر فيه أديرة محفورة في الصخر آوت البطاركة الموارنة قروناً. وتقع بشرّي، مسقط رأس جبران خليل جبران، على حافته.',
    },
    facts: [
      { en: 'Monasteries in the cliffs', ar: 'أديرة في الجروف' },
      { en: 'Home of Khalil Gibran', ar: 'موطن جبران خليل جبران' },
    ],
    position: [townX, groundHeight(townX, townZ) + 30, townZ],
    camera: { position: [townX + 160, groundHeight(townX, townZ) + 150, townZ + 220], target: [townX - 80, groundHeight(townX, townZ) - 30, townZ - 80] },
  },
]

export const ERAS: Era[] = [
  {
    t: 0,
    label: { en: 'c. 3000 BC', ar: 'نحو 3000 ق.م' },
    title: { en: 'A mountain of cedars', ar: 'جبل من الأرز' },
    text: {
      en: 'Cedar forests cover the slopes of Mount Lebanon from the coast to the snow line.',
      ar: 'تغطي غابات الأرز منحدرات جبل لبنان من الساحل حتى خط الثلج.',
    },
  },
  {
    t: 1,
    label: { en: 'c. 1000 BC', ar: 'نحو 1000 ق.م' },
    title: { en: 'Timber for pharaohs and kings', ar: 'خشب للفراعنة والملوك' },
    text: {
      en: 'Egypt, the Phoenician shipyards and the builders of Solomon’s temple fell the cedars and float them down to the coast.',
      ar: 'تقطع مصر وأحواض السفن الفينيقية وبناة هيكل سليمان الأرز وينقلونه إلى الساحل.',
    },
  },
  {
    t: 2,
    label: { en: '138 AD', ar: '138 م' },
    title: { en: "Hadrian's forest law", ar: 'قانون غابات هادريان' },
    text: {
      en: 'Rome marks the surviving forests as imperial property; felling slows but does not stop.',
      ar: 'تعلن روما الغابات الباقية ملكاً إمبراطورياً، فيتباطأ القطع لكنه لا يتوقف.',
    },
  },
  {
    t: 3,
    label: { en: '1876', ar: '1876 م' },
    title: { en: 'A wall around the last grove', ar: 'سور حول آخر غابة' },
    text: {
      en: 'Only the grove above Bsharri remains. A wall, usually credited to Queen Victoria, keeps the goats away from the seedlings.',
      ar: 'لم تبقَ سوى الغابة فوق بشرّي. ويبعد سور، يُنسب عادةً إلى الملكة فيكتوريا، الماعز عن الشتلات.',
    },
  },
  {
    t: 4,
    label: { en: 'Today', ar: 'اليوم' },
    title: { en: 'Protected and replanted', ar: 'محمية ومعاد زراعتها' },
    text: {
      en: 'The cedar is on the national flag; the grove is a UNESCO site and young trees are planted around it.',
      ar: 'الأرزة على العلم الوطني، والغابة موقع يونسكو، وتُزرع أشجار فتية حولها.',
    },
  },
]
