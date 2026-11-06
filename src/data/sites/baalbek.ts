import type { Site } from '../types'
import { PHOTOS } from './baalbek.photos'

export const BAALBEK: Site = {
  id: 'baalbek',
  name: { en: 'Baalbek', ar: 'بعلبك' },
  tagline: { en: 'Among the largest temples Rome ever built', ar: 'من أكبر المعابد التي شيّدتها روما' },
  summary: {
    en: 'In the northern Bekaa valley, the Romans raised a sanctuary to Jupiter, Venus and Bacchus on a scale rarely matched anywhere in their empire. Earthquakes, sieges and centuries of reuse have left six giant columns of Jupiter standing, the almost intact Temple of Bacchus and podium blocks weighing hundreds of tonnes.',
    ar: 'في شمال سهل البقاع، شيّد الرومان مجمّعاً دينياً لجوبيتر وفينوس وباخوس بحجم قلّما ضاهاه مكان آخر في إمبراطوريتهم. وقد أبقت الزلازل والحصارات وقرون من إعادة الاستخدام ستة أعمدة عملاقة من معبد جوبيتر قائمة، ومعبد باخوس شبه الكامل، وكتل منصة تزن مئات الأطنان.',
  },
  category: 'ancient',
  region: 'baalbek-hermel',
  coords: [34.0069, 36.2039],
  unesco: 1984,
  facts: [
    { en: '6 of 54 Jupiter columns still stand', ar: '6 من أصل 54 عموداً لا تزال قائمة' },
    { en: 'Columns about 20 m tall', ar: 'أعمدة بارتفاع نحو 20 متراً' },
    { en: 'Trilithon blocks of about 800 t', ar: 'كتل التريليثون بنحو 800 طن' },
    { en: 'UNESCO World Heritage since 1984', ar: 'تراث عالمي منذ 1984' },
  ],
  events: [
    {
      year: -7000,
      approx: true,
      title: { en: 'First settlement on the tell', ar: 'أول استيطان على التل' },
      text: {
        en: 'Excavations beneath the Roman courtyards show the mound was settled in the Neolithic, long before any temple stood here.',
        ar: 'تُظهر الحفريات تحت الساحات الرومانية أن التل كان مأهولاً في العصر الحجري الحديث، قبل قيام أي معبد هنا بزمن طويل.',
      },
    },
    {
      year: -300,
      approx: true,
      title: { en: 'Heliopolis, city of the sun', ar: 'هليوبوليس، مدينة الشمس' },
      text: {
        en: 'Under the Ptolemies the town takes the Greek name Heliopolis. Its local god Baal is identified with the sun and later with Jupiter.',
        ar: 'في عهد البطالمة تحمل البلدة الاسم اليوناني هليوبوليس. ويُماهى إلهها المحلي بعل بالشمس، ثم لاحقاً بجوبيتر.',
      },
    },
    {
      year: -15,
      approx: true,
      title: { en: 'A Roman colony', ar: 'مستعمرة رومانية' },
      text: {
        en: 'Augustus settles veterans in the region and work begins on the Temple of Jupiter, with a podium built from some of the largest stones ever moved.',
        ar: 'يُسكن أغسطس قدامى الجنود في المنطقة ويبدأ العمل في معبد جوبيتر، فوق منصة بُنيت من بعض أضخم الحجارة التي نُقلت على الإطلاق.',
      },
    },
    {
      year: 60,
      approx: true,
      title: { en: 'Temple of Jupiter completed', ar: 'اكتمال معبد جوبيتر' },
      text: {
        en: 'Fifty-four columns, each about 20 metres tall, surround the sanctuary. The temple is dedicated under Nero.',
        ar: 'أربعة وخمسون عموداً، يبلغ ارتفاع كلٍّ منها نحو 20 متراً، تحيط بالمعبد الذي يُكرَّس في عهد نيرون.',
      },
    },
    {
      year: 150,
      approx: true,
      title: { en: 'Temple of Bacchus', ar: 'معبد باخوس' },
      text: {
        en: 'A second, richly carved temple rises beside Jupiter. Today it is among the best-preserved Roman temples in the world.',
        ar: 'يرتفع معبد ثانٍ غني بالنقوش إلى جانب معبد جوبيتر. وهو اليوم من أفضل المعابد الرومانية حفظاً في العالم.',
      },
    },
    {
      year: 391,
      approx: true,
      title: { en: 'The temples are closed', ar: 'إغلاق المعابد' },
      text: {
        en: 'Emperor Theodosius bans pagan worship. A Christian basilica is built in the Great Court, in front of the Temple of Jupiter.',
        ar: 'يحظر الإمبراطور ثيودوسيوس العبادات الوثنية، وتُبنى بازيليك مسيحية في الساحة الكبرى أمام معبد جوبيتر.',
      },
    },
    {
      year: 636,
      approx: true,
      title: { en: 'A fortress called the Qalaa', ar: 'قلعة تُعرف بالقلعة' },
      text: {
        en: 'After the Arab conquest the temple platform is turned into a citadel. Walls and towers are added over the following centuries.',
        ar: 'بعد الفتح العربي تتحول منصة المعابد إلى قلعة، وتُضاف إليها الأسوار والأبراج على مدى القرون التالية.',
      },
    },
    {
      year: 1759,
      title: { en: 'The great earthquake', ar: 'الزلزال الكبير' },
      text: {
        en: 'Of the nine columns of Jupiter still standing, three fall. The six that remain become the symbol of Baalbek.',
        ar: 'من أصل تسعة أعمدة كانت لا تزال قائمة في معبد جوبيتر، تسقط ثلاثة. وتصبح الستة الباقية رمز بعلبك.',
      },
    },
    {
      year: 1898,
      title: { en: 'German excavations begin', ar: 'بداية الحفريات الألمانية' },
      text: {
        en: 'Kaiser Wilhelm II visits the ruins. A German team excavates and documents the site between 1900 and 1904.',
        ar: 'يزور القيصر فيلهلم الثاني الأطلال، ويقوم فريق ألماني بالتنقيب في الموقع وتوثيقه بين عامي 1900 و1904.',
      },
    },
    {
      year: 1956,
      title: { en: 'Baalbeck International Festival', ar: 'مهرجانات بعلبك الدولية' },
      text: {
        en: 'The first festival is held among the temples. Fairuz, Umm Kulthum and orchestras from around the world perform on its stages.',
        ar: 'تُقام أولى دورات المهرجان بين المعابد. وتغني على مسارحه فيروز وأم كلثوم وتعزف فرق موسيقية من حول العالم.',
      },
    },
    {
      year: 1984,
      title: { en: 'World Heritage Site', ar: 'موقع تراث عالمي' },
      text: {
        en: 'UNESCO inscribes Baalbek on the World Heritage List as one of the finest examples of Imperial Roman architecture.',
        ar: 'تدرج اليونسكو بعلبك على قائمة التراث العالمي بوصفها من أروع نماذج العمارة الرومانية الإمبراطورية.',
      },
    },
  ],
  photos: PHOTOS,
  experience: true,
}
