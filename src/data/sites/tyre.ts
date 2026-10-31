import type { Site } from '../types'
import { PHOTOS } from './tyre.photos'

export const TYRE: Site = {
  id: 'tyre',
  name: { en: 'Tyre', ar: 'صور' },
  tagline: { en: 'The Phoenician island that founded Carthage', ar: 'الجزيرة الفينيقية التي أنجبت قرطاج' },
  summary: {
    en: 'Tyre was the island capital of the Phoenicians, famous for its purple dye, its sailors and the colonies they founded, Carthage among them. Alexander joined it to the mainland with a causeway in 332 BC, and the Romans left a colonnaded street, a vast necropolis and one of the largest hippodromes of the ancient world.',
    ar: 'كانت صور عاصمة الفينيقيين على جزيرتها، واشتهرت بصباغها الأرجواني وبحّارتها والمستعمرات التي أسسوها، وفي مقدمتها قرطاج. وصلها الإسكندر باليابسة عبر جسر ترابي سنة 332 قبل الميلاد، وخلّف الرومان فيها شارعاً معمّداً ومقبرة شاسعة وواحداً من أكبر ميادين سباق العربات في العالم القديم.',
  },
  category: 'ancient',
  region: 'south',
  coords: [33.2705, 35.204],
  unesco: 1984,
  facts: [
    { en: 'Founded c. 2750 BC according to Herodotus', ar: 'تأسست نحو 2750 ق.م بحسب هيرودوت' },
    { en: 'Hippodrome about 480 m long for 20,000 spectators', ar: 'ميدان بطول نحو 480 متراً يتسع لعشرين ألف متفرج' },
    { en: 'Home of Tyrian purple, valued above gold', ar: 'موطن الأرجوان الصوري الذي فاق الذهب ثمناً' },
    { en: 'UNESCO World Heritage since 1984', ar: 'تراث عالمي منذ 1984' },
  ],
  events: [
    {
      year: -2750,
      approx: true,
      title: { en: 'An island city is founded', ar: 'تأسيس مدينة الجزيرة' },
      text: {
        en: 'According to the priests who spoke to Herodotus, the city was founded some 2,300 years before his visit, on a rocky island a short distance from the shore.',
        ar: 'بحسب ما روى الكهنة لهيرودوت، تأسست المدينة قبل زيارته بنحو 2300 سنة، على جزيرة صخرية قريبة من الشاطئ.',
      },
    },
    {
      year: -980,
      approx: true,
      title: { en: 'King Hiram I', ar: 'الملك حيرام الأول' },
      text: {
        en: 'Hiram I joins the two islands into one, enlarges the harbour and builds a temple of Melqart. He sends cedar and craftsmen to Solomon for the Temple in Jerusalem.',
        ar: 'يوحّد حيرام الأول الجزيرتين في جزيرة واحدة ويوسّع الميناء ويبني معبداً لملقرت. ويرسل خشب الأرز والحرفيين إلى سليمان لبناء الهيكل في القدس.',
      },
    },
    {
      year: -814,
      approx: true,
      title: { en: 'Carthage is founded', ar: 'تأسيس قرطاج' },
      text: {
        en: "Settlers from Tyre found Carthage, the 'new city', on the coast of modern Tunisia. Legend credits the Tyrian princess Elissa, known to the Romans as Dido.",
        ar: 'يؤسس مستوطنون من صور قرطاج، أي «المدينة الجديدة»، على ساحل تونس الحالية. وتنسب الأسطورة تأسيسها إلى الأميرة الصورية عليسة، التي عرفها الرومان باسم ديدو.',
      },
    },
    {
      year: -586,
      approx: true,
      title: { en: 'A thirteen-year siege', ar: 'حصار ثلاثة عشر عاماً' },
      text: {
        en: 'Nebuchadnezzar II of Babylon besieges the island for thirteen years. He never storms it, but Tyre finally negotiates terms and becomes a Babylonian vassal.',
        ar: 'يحاصر نبوخذ نصر الثاني ملك بابل الجزيرة ثلاثة عشر عاماً. ولا يقتحمها قط، لكن صور تتفاوض في النهاية على الشروط وتصبح تابعة لبابل.',
      },
    },
    {
      year: -332,
      title: { en: "Alexander's causeway", ar: 'جسر الإسكندر' },
      text: {
        en: 'After a seven-month siege Alexander the Great takes Tyre by building a causeway out to the island. Thousands are killed and some 30,000 are sold into slavery.',
        ar: 'بعد حصار دام سبعة أشهر يستولي الإسكندر الأكبر على صور ببناء جسر ترابي إلى الجزيرة. يُقتل الآلاف ويُباع نحو 30 ألفاً في أسواق الرقيق.',
      },
    },
    {
      year: 150,
      approx: true,
      title: { en: 'Roman Tyre at its height', ar: 'صور الرومانية في أوجها' },
      text: {
        en: 'The Romans build a monumental arch, an aqueduct and a hippodrome about 480 metres long at Al-Bass, with room for some 20,000 spectators around its chariot track.',
        ar: 'يشيّد الرومان في منطقة البص قوس نصر وقناة مياه وميدان سباق عربات بطول نحو 480 متراً يتسع لنحو 20 ألف متفرج.',
      },
    },
    {
      year: 1124,
      title: { en: 'The Crusaders take Tyre', ar: 'الصليبيون يأخذون صور' },
      text: {
        en: 'After a siege of nearly five months, backed by a Venetian fleet, the Crusaders enter Tyre on 7 July 1124. Venice is rewarded with a third of the city.',
        ar: 'بعد حصار دام نحو خمسة أشهر بدعم من أسطول البندقية، يدخل الصليبيون صور في 7 تموز 1124. وتُكافأ البندقية بثلث المدينة.',
      },
    },
    {
      year: 1291,
      title: { en: 'The Mamluks arrive', ar: 'وصول المماليك' },
      text: {
        en: 'Weeks after Acre falls to Sultan al-Ashraf Khalil, Tyre passes to the Mamluks along with Sidon and Beirut, and the Crusader city slowly falls into ruin.',
        ar: 'بعد أسابيع من سقوط عكا في يد السلطان الأشرف خليل، تنتقل صور إلى المماليك مع صيدا وبيروت، وتتحول المدينة الصليبية تدريجياً إلى أطلال.',
      },
    },
    {
      year: 1946,
      title: { en: 'Large-scale excavations begin', ar: 'بداية الحفريات الواسعة' },
      text: {
        en: "Emir Maurice Chehab, head of Lebanon's antiquities service, begins large-scale excavations that uncover the Roman and Byzantine city at Al-Mina and the necropolis at Al-Bass.",
        ar: 'يبدأ الأمير موريس شهاب، مدير الآثار في لبنان، حفريات واسعة تكشف المدينة الرومانية والبيزنطية في موقع الميناء والمقبرة في البص.',
      },
    },
    {
      year: 1984,
      title: { en: 'World Heritage Site', ar: 'موقع تراث عالمي' },
      text: {
        en: 'UNESCO inscribes Tyre on the World Heritage List for its Phoenician, Roman and Crusader remains. Excavations, halted by the civil war in 1975, resume in 1995.',
        ar: 'تدرج اليونسكو صور على قائمة التراث العالمي لآثارها الفينيقية والرومانية والصليبية. وتُستأنف الحفريات التي أوقفتها الحرب الأهلية سنة 1975 في عام 1995.',
      },
    },
  ],
  photos: PHOTOS,
  experience: true,
}
