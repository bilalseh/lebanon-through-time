import type { Era, Hotspot } from '../../data/types'
import { AQUEDUCT, ARCH, HIPPODROME, ISLAND, MOLE } from './layout'

const [ix, iz] = ISLAND.center
const [hx, hz] = HIPPODROME.center
const ax = (AQUEDUCT.from[0] + AQUEDUCT.to[0]) / 2
const az = (AQUEDUCT.from[1] + AQUEDUCT.to[1]) / 2

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'island',
    label: { en: 'Island city', ar: 'المدينة الجزيرة' },
    title: { en: 'The island city', ar: 'المدينة الجزيرة' },
    body: {
      en: 'Phoenician Tyre stood on a rocky island with two harbours and walls rising straight from the sea. Its temple of Melqart was famous across the Mediterranean.',
      ar: 'قامت صور الفينيقية على جزيرة صخرية بمينائين وأسوار ترتفع مباشرة من البحر. وكان معبدها للإله ملقارت شهيراً في أرجاء المتوسط.',
    },
    facts: [
      { en: 'Two harbours', ar: 'ميناءان' },
      { en: 'Founded Carthage c. 814 BC', ar: 'أسست قرطاج نحو 814 ق.م' },
    ],
    position: [ix, 30, iz],
    camera: { position: [ix - 150, 120, iz + 260], target: [ix, 5, iz] },
  },
  {
    id: 'mole',
    visibleFrom: 0.35,
    label: { en: "Alexander's mole", ar: 'جسر الإسكندر' },
    title: { en: "Alexander's mole", ar: 'جسر الإسكندر' },
    body: {
      en: 'In 332 BC Alexander the Great spent seven months building a causeway from the shore to the island, then stormed the walls. Silt gathered against it and turned Tyre into a peninsula for ever.',
      ar: 'في عام 332 ق.م أمضى الإسكندر الكبير سبعة أشهر في بناء جسر من الشاطئ إلى الجزيرة، ثم اقتحم الأسوار. وتراكمت الرمال على جانبيه فتحوّلت صور إلى شبه جزيرة إلى الأبد.',
    },
    facts: [
      { en: '7-month siege', ar: 'حصار 7 أشهر' },
      { en: 'Island became a peninsula', ar: 'صارت الجزيرة شبه جزيرة' },
    ],
    position: [-MOLE.length / 2, 18, 0],
    camera: { position: [-40, 70, 150], target: [-MOLE.length / 2, 0, 0] },
  },
  {
    id: 'arch',
    visibleFrom: 1.35,
    label: { en: 'Arch and colonnade', ar: 'القوس والشارع المعمّد' },
    title: { en: 'The arch and the colonnaded road', ar: 'قوس النصر والشارع المعمّد' },
    body: {
      en: 'A monumental arch of the 2nd century AD opens onto a paved, colonnaded road lined with the tombs of the Al-Bass necropolis. The columns were re-erected by archaeologists.',
      ar: 'قوس ضخم من القرن الثاني الميلادي يفتح على طريق مبلّط معمّد تحفّه مقابر جبّانة البص. وقد أعاد علماء الآثار نصب الأعمدة.',
    },
    facts: [
      { en: '2nd century AD', ar: 'القرن الثاني الميلادي' },
      { en: 'Al-Bass necropolis', ar: 'جبّانة البص' },
    ],
    position: [ARCH.x, ARCH.height + 10, 0],
    camera: { position: [ARCH.x - 60, 30, 70], target: [ARCH.x + 10, 6, 0] },
  },
  {
    id: 'hippodrome',
    visibleFrom: 1.5,
    label: { en: 'Hippodrome', ar: 'ميدان سباق الخيل' },
    title: { en: 'The Roman hippodrome', ar: 'ميدان سباق الخيل الروماني' },
    body: {
      en: 'One of the largest hippodromes of the Roman world, about 480 metres long, seated tens of thousands for chariot races around a central spine topped by an obelisk.',
      ar: 'من أكبر ميادين سباق الخيل في العالم الروماني، بطول نحو 480 متراً، واتّسع لعشرات الآلاف لمشاهدة سباقات العربات حول حاجز مركزي يعلوه مسلّة.',
    },
    facts: [
      { en: '≈ 480 m long', ar: 'نحو 480 م طولاً' },
      { en: 'Tens of thousands of seats', ar: 'عشرات الآلاف من المقاعد' },
    ],
    position: [hx, 24, hz],
    camera: { position: [hx - 160, 110, hz + 150], target: [hx, 4, hz] },
  },
  {
    id: 'aqueduct',
    visibleFrom: 1.5,
    label: { en: 'Aqueduct', ar: 'القناة المائية' },
    title: { en: 'The aqueduct', ar: 'القناة المائية' },
    body: {
      en: 'Arches carried water from the springs of Ras al-Ain, south of the city, to Roman Tyre. Stretches of the arcade still cross the fields east of the ruins.',
      ar: 'حملت الأقواس الماء من ينابيع رأس العين جنوب المدينة إلى صور الرومانية. ولا تزال أجزاء من القناطر تعبر الحقول شرق الأطلال.',
    },
    facts: [
      { en: 'From Ras al-Ain springs', ar: 'من ينابيع رأس العين' },
      { en: 'Roman arcade', ar: 'قناطر رومانية' },
    ],
    position: [ax, 24, az],
    camera: { position: [ax - 60, 40, az + 90], target: [ax, 6, az] },
  },
]

export const ERAS: Era[] = [
  {
    t: 0,
    label: { en: 'c. 1000 BC', ar: 'نحو 1000 ق.م' },
    title: { en: "Hiram's island city", ar: 'مدينة حيرام الجزيرة' },
    text: {
      en: 'Phoenician Tyre, home of purple dye and far-sailing merchants, prospers on its island fortress.',
      ar: 'صور الفينيقية، موطن الصباغ الأرجواني والتجار البحّارة، تزدهر في حصنها الجزيرة.',
    },
  },
  {
    t: 1,
    label: { en: '332 BC', ar: '332 ق.م' },
    title: { en: "Alexander's siege", ar: 'حصار الإسكندر' },
    text: {
      en: 'Alexander builds a mole across the strait, brings up siege towers and takes the city after seven months.',
      ar: 'يبني الإسكندر جسراً عبر المضيق، ويقرّب أبراج الحصار، ويستولي على المدينة بعد سبعة أشهر.',
    },
  },
  {
    t: 2,
    label: { en: 'c. 200 AD', ar: 'نحو 200 م' },
    title: { en: 'Roman Tyre', ar: 'صور الرومانية' },
    text: {
      en: 'Silt has joined the island to the shore. A hippodrome, a triumphal arch, colonnades and an aqueduct rise on the mainland.',
      ar: 'ربطت الرمال الجزيرة بالشاطئ. وترتفع على البرّ ميدان سباق وقوس نصر وشوارع معمّدة وقناة مائية.',
    },
  },
  {
    t: 3,
    label: { en: '1291', ar: '1291 م' },
    title: { en: 'After the Mamluk conquest', ar: 'بعد الفتح المملوكي' },
    text: {
      en: 'Crusader Tyre falls to the Mamluks and is dismantled; the Roman monuments slowly collapse into the sand.',
      ar: 'تسقط صور الصليبية بيد المماليك وتُهدم، وتنهار المعالم الرومانية ببطء في الرمال.',
    },
  },
  {
    t: 4,
    label: { en: 'Today', ar: 'اليوم' },
    title: { en: 'A peninsula and a World Heritage Site', ar: 'شبه جزيرة وموقع تراث عالمي' },
    text: {
      en: 'The modern town covers the old island; the excavated Al-Bass site, with its re-erected columns, has been UNESCO-listed since 1984.',
      ar: 'تغطي المدينة الحديثة الجزيرة القديمة، وموقع البص المنقّب، بأعمدته المعاد نصبها، مدرج لدى اليونسكو منذ 1984.',
    },
  },
]
