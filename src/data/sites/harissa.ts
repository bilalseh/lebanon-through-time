import type { Site } from '../types'
import { PHOTOS } from './harissa.photos'

export const HARISSA: Site = {
  id: 'harissa',
  name: { en: 'Our Lady of Lebanon, Harissa', ar: 'سيدة لبنان، حريصا' },
  tagline: { en: 'A white Madonna above Jounieh bay', ar: 'سيدة بيضاء تطل على خليج جونيه' },
  summary: {
    en: 'On a hilltop 650 metres above the bay of Jounieh, a white-painted bronze statue of the Virgin Mary has opened her arms over Lebanon since 1908. Pilgrims of every faith climb the spiral ramp around her stone base, while beside her the modern Maronite basilica rises like a cedar of glass and concrete.',
    ar: 'على قمة تل يرتفع 650 متراً فوق خليج جونيه، تفتح السيدة العذراء ذراعيها فوق لبنان منذ عام 1908 في تمثال برونزي مطلي بالأبيض. يصعد الحجاج من كل الأديان الدرج الحلزوني حول قاعدته الحجرية، فيما ترتفع إلى جانبه الكاتدرائية المارونية الحديثة كأرزة من الزجاج والخرسانة.',
  },
  category: 'religious',
  region: 'mount-lebanon',
  coords: [33.981, 35.651],
  facts: [
    { en: '15-tonne bronze statue, 8.5 m tall', ar: 'تمثال برونزي بوزن 15 طناً وارتفاع 8.5 م' },
    { en: 'Stone base 20 m high', ar: 'قاعدة حجرية بارتفاع 20 متراً' },
    { en: '650 m above the sea', ar: '650 متراً فوق سطح البحر' },
    { en: 'Cable car from Jounieh since 1965', ar: 'تلفريك من جونيه منذ 1965' },
  ],
  events: [
    {
      year: 1904,
      title: { en: 'A jubilee project', ar: 'مشروع اليوبيل' },
      text: {
        en: 'To mark the 50th anniversary of the dogma of the Immaculate Conception, Maronite Patriarch Elias Hoyek lays the cornerstone of a shrine to the Virgin on the hill of Harissa.',
        ar: 'في الذكرى الخمسين لإعلان عقيدة الحبل بلا دنس، يضع البطريرك الماروني إلياس الحويك حجر الأساس لمزار للعذراء على تلة حريصا.',
      },
    },
    {
      year: 1908,
      title: { en: 'Queen of Lebanon', ar: 'ملكة لبنان' },
      text: {
        en: 'The French-made bronze statue, 8.5 metres tall and painted white, is inaugurated on its 20-metre stone tower, and the Patriarch proclaims Mary Queen of Lebanon.',
        ar: 'يُدشَّن التمثال البرونزي المصنوع في فرنسا، بارتفاع 8.5 أمتار ومطلياً بالأبيض، فوق برجه الحجري البالغ 20 متراً، ويعلن البطريرك مريم ملكة لبنان.',
      },
    },
    {
      year: 1954,
      title: { en: 'Golden jubilee', ar: 'اليوبيل الذهبي' },
      text: {
        en: 'The shrine\'s golden jubilee coincides with the centenary of the dogma. Pope Pius XII sends Cardinal Angelo Roncalli, the future John XXIII, as his legate to Lebanon.',
        ar: 'يتزامن اليوبيل الذهبي للمزار مع مئوية العقيدة، ويوفد البابا بيوس الثاني عشر الكاردينال أنجيلو رونكالي، البابا يوحنا الثالث والعشرين لاحقاً، مندوباً عنه إلى لبنان.',
      },
    },
    {
      year: 1965,
      title: { en: 'The téléphérique', ar: 'التلفريك' },
      text: {
        en: 'A cable car opens from the seafront of Jounieh to Harissa, climbing about 650 metres in nine minutes and turning the shrine into an easy day trip from Beirut.',
        ar: 'يُفتتح تلفريك من شاطئ جونيه إلى حريصا، يصعد نحو 650 متراً في تسع دقائق، فيصبح المزار رحلة يوم سهلة من بيروت.',
      },
    },
    {
      year: 1970,
      approx: true,
      title: { en: 'A basilica like a cedar', ar: 'كاتدرائية على شكل أرزة' },
      text: {
        en: 'The cornerstone of a new Maronite basilica is laid beside the statue. Designed by Pierre El Khoury to recall a cedar and a Phoenician ship, it takes over twenty years to build.',
        ar: 'يوضع حجر الأساس لكاتدرائية مارونية جديدة إلى جانب التمثال، صممها بيار الخوري على هيئة أرزة وسفينة فينيقية، ويستغرق بناؤها أكثر من عشرين عاماً.',
      },
    },
    {
      year: 1997,
      title: { en: 'John Paul II at Harissa', ar: 'يوحنا بولس الثاني في حريصا' },
      text: {
        en: 'On 10 May 1997, during the first papal journey to Lebanon, Pope John Paul II celebrates Mass in the modern basilica at Harissa.',
        ar: 'في 10 أيار 1997، خلال أول زيارة بابوية إلى لبنان، يحتفل البابا يوحنا بولس الثاني بالقداس في الكاتدرائية الحديثة في حريصا.',
      },
    },
    {
      year: 2012,
      title: { en: 'Benedict XVI signs for the East', ar: 'بندكتس السادس عشر يوقّع في حريصا' },
      text: {
        en: 'At St Paul\'s Melkite basilica on the hill, Pope Benedict XVI signs the apostolic exhortation Ecclesia in Medio Oriente on 14 September 2012.',
        ar: 'في بازيليك مار بولس للروم الملكيين الكاثوليك على التلة، يوقّع البابا بندكتس السادس عشر الإرشاد الرسولي «الكنيسة في الشرق الأوسط» في 14 أيلول 2012.',
      },
    },
    {
      year: 2025,
      title: { en: 'Pope Leo XIV at the shrine', ar: 'البابا لاون الرابع عشر في المزار' },
      text: {
        en: 'On 1 December 2025 Pope Leo XIV meets Lebanon\'s bishops, priests and pastoral workers at Our Lady of Lebanon during his apostolic journey to the country.',
        ar: 'في 1 كانون الأول 2025 يلتقي البابا لاون الرابع عشر أساقفة لبنان وكهنته والعاملين في الحقل الرعوي في مزار سيدة لبنان خلال زيارته الرسولية إلى البلاد.',
      },
    },
  ],
  photos: PHOTOS,
}
