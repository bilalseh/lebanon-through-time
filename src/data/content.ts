import { BACCHUS, JUPITER, survivorsCenter } from './templeLayout'

export type Lang = 'en' | 'ar'
export type Localized = Record<Lang, string>

export interface Hotspot {
  id: string
  label: Localized
  title: Localized
  body: Localized
  facts: Localized[]
  /** Where the marker floats in the scene. */
  position: [number, number, number]
  /** Where the camera flies to, and what it looks at. */
  camera: { position: [number, number, number]; target: [number, number, number] }
}

export interface Era {
  t: number
  label: Localized
  title: Localized
  text: Localized
}

const [sx, sz] = survivorsCenter()
const jTop = JUPITER.podium.height + JUPITER.columnHeight
const [bx, bz] = BACCHUS.center
const westFace = JUPITER.center[0] - JUPITER.podium.length / 2

export const QUARRY_STONE = { position: [-150, 0, 120] as [number, number, number], size: [20.5, 4.5, 4] as [number, number, number] }

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'jupiter',
    label: { en: 'Temple of Jupiter', ar: 'معبد جوبيتر' },
    title: { en: 'Temple of Jupiter', ar: 'معبد جوبيتر' },
    body: {
      en: 'Begun under Emperor Augustus and completed around 60 AD, this was one of the largest temples Rome ever built. A ring of 54 columns, each about 20 metres tall, surrounded the sanctuary on a massive raised podium.',
      ar: 'بدأ بناؤه في عهد الإمبراطور أغسطس واكتمل نحو عام 60 م، وكان من أكبر المعابد التي شيّدتها روما. أحاطت بالمعبد حلقة من 54 عموداً، يبلغ ارتفاع كلٍّ منها نحو 20 متراً، فوق منصة ضخمة مرتفعة.',
    },
    facts: [
      { en: '54 columns originally', ar: '54 عموداً في الأصل' },
      { en: '≈ 20 m column height', ar: 'نحو 20 م ارتفاع العمود' },
      { en: 'Completed c. 60 AD', ar: 'اكتمل نحو 60 م' },
    ],
    position: [0, jTop + 6, -JUPITER.podium.width / 2 + 4],
    camera: { position: [95, 55, 95], target: [0, 12, 0] },
  },
  {
    id: 'six-columns',
    label: { en: 'The Six Columns', ar: 'الأعمدة الستة' },
    title: { en: 'The Six Columns', ar: 'الأعمدة الستة' },
    body: {
      en: 'Of the 54 original columns, only six still stand, still carrying a section of their carved entablature. They have become the symbol of Baalbek.',
      ar: 'من أصل 54 عموداً، لم يبقَ قائماً سوى ستة أعمدة، ما زالت تحمل جزءاً من إفريزها المنحوت. وقد أصبحت رمزاً لبعلبك.',
    },
    facts: [
      { en: '6 of 54 still standing', ar: '6 من أصل 54 لا تزال قائمة' },
      { en: 'Entablature still in place', ar: 'الإفريز لا يزال في مكانه' },
    ],
    position: [sx, jTop + 7, sz],
    camera: { position: [sx - 44, 30, sz + 40], target: [sx, 17, sz] },
  },
  {
    id: 'bacchus',
    label: { en: 'Temple of Bacchus', ar: 'معبد باخوس' },
    title: { en: 'Temple of Bacchus', ar: 'معبد باخوس' },
    body: {
      en: 'Built in the mid-2nd century AD, it is one of the best-preserved Roman temples in the world, famous for its carved doorway and ceiling. Its walls still stand almost to their full height.',
      ar: 'بُني في منتصف القرن الثاني الميلادي، وهو من أفضل المعابد الرومانية حفظاً في العالم، ويشتهر ببوابته وسقفه المنحوتين. ولا تزال جدرانه قائمة بكامل ارتفاعها تقريباً.',
    },
    facts: [
      { en: 'Built c. 150 AD', ar: 'بُني نحو 150 م' },
      { en: 'Among the best preserved', ar: 'من أفضل المعابد حفظاً' },
    ],
    position: [bx, BACCHUS.podium.height + BACCHUS.columnHeight + 6, bz],
    camera: { position: [bx + 62, 30, bz + 58], target: [bx, 9, bz] },
  },
  {
    id: 'trilithon',
    label: { en: 'The Trilithon', ar: 'الحجارة الثلاثة' },
    title: { en: 'The Trilithon', ar: 'الحجارة الثلاثة (التريليثون)' },
    body: {
      en: 'Three limestone blocks set into the podium of the Temple of Jupiter, each about 19 metres long and weighing an estimated 800 tonnes. How they were moved and lifted is still debated.',
      ar: 'ثلاث كتل من الحجر الكلسي ضمن منصة معبد جوبيتر، يبلغ طول كلٍّ منها نحو 19 متراً ويُقدَّر وزنها بنحو 800 طن. ولا تزال طريقة نقلها ورفعها موضع نقاش.',
    },
    facts: [
      { en: '3 blocks', ar: '3 كتل' },
      { en: '≈ 800 t each', ar: 'نحو 800 طن لكل كتلة' },
      { en: '≈ 19 m long', ar: 'نحو 19 م طولاً' },
    ],
    position: [westFace - 2, 9, 0],
    camera: { position: [westFace - 40, 15, 30], target: [westFace, 4, 0] },
  },
  {
    id: 'quarry',
    label: { en: 'Stone of the Pregnant Woman', ar: 'حجر الحبلى' },
    title: { en: 'Stone of the Pregnant Woman', ar: 'حجر الحبلى' },
    body: {
      en: 'Left in the ancient quarry nearby, this block weighs an estimated 1,000 tonnes and was never moved. Archaeologists have since uncovered even larger blocks beside it.',
      ar: 'تُرك في المقلع القديم القريب، ويُقدَّر وزنه بنحو 1000 طن ولم يُنقل قط. وقد كشف علماء الآثار لاحقاً عن كتل أكبر منه إلى جانبه.',
    },
    facts: [
      { en: '≈ 1,000 t', ar: 'نحو 1000 طن' },
      { en: 'Never moved', ar: 'لم يُنقل قط' },
      { en: 'Hajar al-Hibla', ar: 'حجر الحبلى' },
    ],
    position: [QUARRY_STONE.position[0], 10, QUARRY_STONE.position[2]],
    camera: {
      position: [QUARRY_STONE.position[0] - 26, 14, QUARRY_STONE.position[2] + 30],
      target: [QUARRY_STONE.position[0], 2, QUARRY_STONE.position[2]],
    },
  },
]

export const ERAS: Era[] = [
  {
    t: 0,
    label: { en: 'c. 60 AD', ar: 'نحو 60 م' },
    title: { en: 'Roman Heliopolis', ar: 'هليوبوليس الرومانية' },
    text: {
      en: 'The Temple of Jupiter, one of the largest temples Rome ever built, is completed.',
      ar: 'اكتمال بناء معبد جوبيتر، أحد أكبر المعابد التي شيّدتها روما.',
    },
  },
  {
    t: 1,
    label: { en: 'c. 150 AD', ar: 'نحو 150 م' },
    title: { en: 'The complex at its height', ar: 'المجمّع في أوج ازدهاره' },
    text: {
      en: 'The Temple of Bacchus is added beside it, richly carved inside and out.',
      ar: 'إضافة معبد باخوس إلى جانبه، بزخارف غنية في الداخل والخارج.',
    },
  },
  {
    t: 2,
    label: { en: '1759', ar: '1759 م' },
    title: { en: 'Centuries of earthquakes', ar: 'قرون من الزلازل' },
    text: {
      en: 'Earthquakes over the centuries, including a major one in 1759, bring down most of the columns.',
      ar: 'الزلازل على مرّ القرون، ومنها زلزال كبير عام 1759، تُسقط معظم الأعمدة.',
    },
  },
  {
    t: 3,
    label: { en: 'Today', ar: 'اليوم' },
    title: { en: 'A UNESCO World Heritage Site', ar: 'موقع على قائمة التراث العالمي' },
    text: {
      en: 'Six columns of Jupiter still stand. The site has been on the UNESCO World Heritage List since 1984.',
      ar: 'لا تزال ستة أعمدة من معبد جوبيتر قائمة. أُدرج الموقع على قائمة اليونسكو للتراث العالمي عام 1984.',
    },
  },
]

/** The era whose label best describes timeline value `t`. */
export function eraAt(t: number): Era {
  return ERAS.reduce((best, era) => (Math.abs(era.t - t) < Math.abs(best.t - t) ? era : best), ERAS[0])
}

export const UI = {
  title: { en: 'Baalbek in 3D', ar: 'بعلبك ثلاثية الأبعاد' },
  subtitle: {
    en: 'An interactive journey through the Roman temples of Heliopolis',
    ar: 'رحلة تفاعلية بين المعابد الرومانية في هليوبوليس',
  },
  intro: {
    en: 'Walk around one of the greatest temple complexes of the Roman world, then travel through nearly 2,000 years of its history.',
    ar: 'تجوّل في أحد أعظم المجمّعات الدينية في العالم الروماني، ثم سافر عبر نحو ألفي عام من تاريخه.',
  },
  start: { en: 'Start exploring', ar: 'ابدأ الاستكشاف' },
  tour: { en: 'Guided tour', ar: 'جولة إرشادية' },
  stopTour: { en: 'Stop tour', ar: 'إيقاف الجولة' },
  places: { en: 'Points of interest', ar: 'معالم الموقع' },
  timeline: { en: 'Timeline', ar: 'الخط الزمني' },
  play: { en: 'Play history', ar: 'تشغيل التاريخ' },
  pause: { en: 'Pause', ar: 'إيقاف مؤقت' },
  close: { en: 'Close', ar: 'إغلاق' },
  previous: { en: 'Previous', ar: 'السابق' },
  next: { en: 'Next', ar: 'التالي' },
  overview: { en: 'Overview', ar: 'نظرة عامة' },
  hint: {
    en: 'Drag to orbit · Scroll or pinch to zoom · Select a marker to learn more',
    ar: 'اسحب للتدوير · مرّر أو اقرص للتكبير · اختر علامة لمعرفة المزيد',
  },
  disclaimer: {
    en: 'Simplified, illustrative reconstruction. Not to scale.',
    ar: 'إعادة بناء مبسّطة وتوضيحية، والمقاييس غير دقيقة.',
  },
  language: { en: 'العربية', ar: 'English' },
} satisfies Record<string, Localized>
