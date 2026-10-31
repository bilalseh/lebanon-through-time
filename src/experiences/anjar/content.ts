import type { Era, Hotspot } from '../../data/types'
import { HALF_D, HALF_W, MOSQUE, PALACE } from './layout'

const [px, pz] = PALACE.center
const [mx, mz] = MOSQUE.center

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'tetrapylon',
    label: { en: 'Tetrapylon', ar: 'التترابيل' },
    title: { en: 'The tetrapylon', ar: 'التترابيل (البوابة الرباعية)' },
    body: {
      en: 'Where the two colonnaded streets cross, four pedestals each carried four columns. Re-erected by the excavators, it is now the first thing visitors see.',
      ar: 'عند تقاطع الشارعين المعمّدين، حملت أربع قواعد أربعة أعمدة على كلٍّ منها. أعاد المنقّبون نصبها، وهي اليوم أول ما يراه الزائر.',
    },
    facts: [
      { en: '16 columns', ar: '16 عموداً' },
      { en: 'Roman-style crossing', ar: 'تقاطع على الطراز الروماني' },
    ],
    position: [0, 14, 0],
    camera: { position: [-42, 24, 46], target: [0, 5, 0] },
  },
  {
    id: 'palace',
    label: { en: 'Great Palace', ar: 'القصر الكبير' },
    title: { en: 'The Great Palace', ar: 'القصر الكبير' },
    body: {
      en: 'The caliph’s residence filled the south-east quarter, built around an arcaded courtyard. Its two-storey arcade, rebuilt from fallen stones, is the symbol of Anjar.',
      ar: 'شغل مقرّ الخليفة الربع الجنوبي الشرقي، وبُني حول ساحة محاطة بأروقة معقودة. ورواقه ذو الطابقين، الذي أُعيد بناؤه من الحجارة المتساقطة، هو رمز عنجر.',
    },
    facts: [
      { en: 'Two-storey arcade', ar: 'رواق من طابقين' },
      { en: 'Re-erected after 1949', ar: 'أُعيد نصبه بعد 1949' },
    ],
    position: [px, 22, pz],
    camera: { position: [px - 60, 40, pz + 70], target: [px, 6, pz] },
  },
  {
    id: 'mosque',
    label: { en: 'Mosque', ar: 'المسجد' },
    title: { en: 'The mosque', ar: 'المسجد' },
    body: {
      en: 'Beside the palace stood the city’s mosque, with a private door so the caliph could enter straight from his residence.',
      ar: 'إلى جانب القصر قام مسجد المدينة، وله باب خاص يتيح للخليفة الدخول مباشرة من مقرّه.',
    },
    facts: [
      { en: 'Next to the palace', ar: 'ملاصق للقصر' },
      { en: 'Early 8th century', ar: 'مطلع القرن الثامن' },
    ],
    position: [mx, 16, mz],
    camera: { position: [mx - 50, 30, mz - 50], target: [mx, 4, mz] },
  },
  {
    id: 'walls',
    label: { en: 'Walls and gates', ar: 'الأسوار والبوابات' },
    title: { en: 'Walls, towers and gates', ar: 'الأسوار والأبراج والبوابات' },
    body: {
      en: 'A rectangle of walls about 370 by 310 metres, with forty towers and a gate in the middle of each side, drawn with the regularity of a Roman camp.',
      ar: 'مستطيل من الأسوار بنحو 370 في 310 أمتار، بأربعين برجاً وبوابة في منتصف كل ضلع، مرسوم بانتظام المعسكر الروماني.',
    },
    facts: [
      { en: '≈ 370 × 310 m', ar: 'نحو 370 × 310 م' },
      { en: '40 towers, 4 gates', ar: '40 برجاً و4 بوابات' },
    ],
    position: [-HALF_W, 18, -HALF_D],
    camera: { position: [-HALF_W - 90, 70, -HALF_D - 60], target: [-HALF_W + 40, 4, -HALF_D + 60] },
  },
  {
    id: 'armenian-anjar',
    visibleFrom: 3.5,
    label: { en: 'Armenian Anjar', ar: 'عنجر الأرمنية' },
    title: { en: 'The Armenian town', ar: 'البلدة الأرمنية' },
    body: {
      en: 'In 1939 Armenian families from Musa Dagh were settled beside the ruins. Their town of Anjar grew up next to the Umayyad city, which was excavated from the 1940s.',
      ar: 'في عام 1939 أُسكنت عائلات أرمنية من موسى داغ إلى جانب الأطلال. ونمت بلدتهم عنجر بجوار المدينة الأموية التي بدأ التنقيب فيها في أربعينيات القرن العشرين.',
    },
    facts: [
      { en: 'Settled 1939', ar: 'استوطنت عام 1939' },
      { en: 'Excavations since the 1940s', ar: 'تنقيب منذ الأربعينيات' },
    ],
    position: [250, 20, 0],
    camera: { position: [150, 70, 150], target: [250, 4, 0] },
  },
]

export const ERAS: Era[] = [
  {
    t: 0,
    label: { en: '705', ar: '705 م' },
    title: { en: 'A caliph’s new city', ar: 'مدينة جديدة للخليفة' },
    text: {
      en: 'Caliph al-Walid I has a trading city laid out on the plain, on the road between Damascus and the coast.',
      ar: 'يأمر الخليفة الوليد الأول بتخطيط مدينة تجارية على السهل، على الطريق بين دمشق والساحل.',
    },
  },
  {
    t: 1,
    label: { en: '715', ar: '715 م' },
    title: { en: 'Umayyad Anjar complete', ar: 'اكتمال عنجر الأموية' },
    text: {
      en: 'Walls, colonnaded streets, palaces, a mosque and baths are finished within a decade.',
      ar: 'تكتمل الأسوار والشوارع المعمّدة والقصور والمسجد والحمّامات في غضون عقد واحد.',
    },
  },
  {
    t: 2,
    label: { en: '750', ar: '750 م' },
    title: { en: 'Abandoned', ar: 'الهجران' },
    text: {
      en: 'With the fall of the Umayyads the city is deserted after barely a generation of use.',
      ar: 'مع سقوط الأمويين تُهجر المدينة بعد جيل واحد بالكاد من الاستخدام.',
    },
  },
  {
    t: 3,
    label: { en: '1900', ar: '1900 م' },
    title: { en: 'Buried and forgotten', ar: 'مدفونة ومنسيّة' },
    text: {
      en: 'Earthquakes and centuries of neglect leave fallen columns and low walls under the soil.',
      ar: 'تترك الزلازل وقرون الإهمال أعمدة متساقطة وجدراناً منخفضة تحت التراب.',
    },
  },
  {
    t: 4,
    label: { en: 'Today', ar: 'اليوم' },
    title: { en: 'Excavated and re-erected', ar: 'منقّبة ومعاد نصبها' },
    text: {
      en: 'Excavations since the 1940s have raised the tetrapylon and the palace arcade; UNESCO listed Anjar in 1984.',
      ar: 'أعادت الحفريات منذ الأربعينيات نصب التترابيل ورواق القصر، وأدرجت اليونسكو عنجر عام 1984.',
    },
  },
]
