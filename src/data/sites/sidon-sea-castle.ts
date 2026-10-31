import type { Site } from '../types'
import { PHOTOS } from './sidon-sea-castle.photos'

export const SIDON_SEA_CASTLE: Site = {
  id: 'sidon-sea-castle',
  name: { en: 'Sidon Sea Castle', ar: 'قلعة صيدا البحرية' },
  tagline: { en: 'A Crusader fortress rising from the sea', ar: 'حصن صليبي ينهض من البحر' },
  summary: {
    en: "Built by the Crusaders in 1228 on a rocky islet guarding Sidon's harbour, the Sea Castle stands where a Phoenician temple of Melqart is thought to have stood. Demolished by the Mamluks, rebuilt and later strengthened by Fakhr al-Din II, it is reached today by a stone causeway and crowned by a small domed mosque.",
    ar: 'شيّد الصليبيون القلعة البحرية سنة 1228 على جزيرة صخرية تحرس ميناء صيدا، في موضع يُعتقد أنه ضمّ معبداً فينيقياً للإله ملقرت. هدمها المماليك ثم أعيد بناؤها وحصّنها لاحقاً فخر الدين المعني الثاني، ويصل إليها الزائر اليوم عبر جسر حجري ويعلوها مسجد صغير بقبة.',
  },
  category: 'castle',
  region: 'south',
  coords: [33.5675, 35.3684],
  facts: [
    { en: 'Built by the Crusaders in 1228', ar: 'بناها الصليبيون سنة 1228' },
    { en: 'Islet about 80 m from the shore', ar: 'جزيرة تبعد نحو 80 متراً عن الشاطئ' },
    { en: 'Causeway carried on nine arches', ar: 'جسر يقوم على تسع قناطر' },
    { en: 'Roman columns reused in its walls', ar: 'أعمدة رومانية أعيد استخدامها في جدرانها' },
  ],
  events: [
    {
      year: -1000,
      approx: true,
      title: { en: 'A Phoenician islet of Melqart', ar: 'جزيرة ملقرت الفينيقية' },
      text: {
        en: "In Phoenician times the rocky islet off Sidon's harbour is believed to have held a temple of Melqart. Inscribed stones from it were later built into the castle walls.",
        ar: 'يُعتقد أن الجزيرة الصخرية قبالة ميناء صيدا ضمّت في العصر الفينيقي معبداً للإله ملقرت. وقد أُدمجت لاحقاً حجارة منقوشة منه في جدران القلعة.',
      },
    },
    {
      year: 1110,
      title: { en: 'Sidon falls to the Crusaders', ar: 'سقوط صيدا بيد الصليبيين' },
      text: {
        en: 'On 4 December 1110 King Baldwin I of Jerusalem, helped by the Norwegian fleet of King Sigurd, captures Sidon after a siege. The port becomes a Crusader lordship.',
        ar: 'في 4 كانون الأول 1110 يستولي بلدوين الأول ملك القدس على صيدا بعد حصار، بمساعدة أسطول الملك النرويجي سيغورد. ويغدو المرفأ إقطاعية صليبية.',
      },
    },
    {
      year: 1228,
      title: { en: 'The Sea Castle is built', ar: 'بناء القلعة البحرية' },
      text: {
        en: 'Crusaders of the Sixth Crusade fortify the islet, raising two towers linked by a wall and reinforcing them with Roman columns laid horizontally through the masonry.',
        ar: 'يحصّن صليبيو الحملة السادسة الجزيرة، فيرفعون برجين يصل بينهما سور ويدعمونهما بأعمدة رومانية مغروسة أفقياً في البناء.',
      },
    },
    {
      year: 1291,
      title: { en: 'Demolished by the Mamluks', ar: 'المماليك يهدمون القلعة' },
      text: {
        en: 'After Acre falls, the Mamluks retake Sidon on 14 July 1291 and dismantle its castles so the Franks cannot return. The Sea Castle is later rebuilt with its long causeway.',
        ar: 'بعد سقوط عكا يستعيد المماليك صيدا في 14 تموز 1291 ويهدمون قلاعها كي لا يعود الفرنجة. ثم يُعاد بناء القلعة البحرية مع جسرها الطويل.',
      },
    },
    {
      year: 1594,
      title: { en: 'Fakhr al-Din strengthens the fort', ar: 'فخر الدين يحصّن القلعة' },
      text: {
        en: 'Emir Fakhr al-Din II, who turns Sidon into the hub of his trade with Europe, strengthens the fort guarding the harbour and repairs the mosque inside it.',
        ar: 'يعزّز الأمير فخر الدين المعني الثاني، الذي يجعل من صيدا محور تجارته مع أوروبا، الحصن الذي يحرس المرفأ ويرمّم المسجد الذي بداخله.',
      },
    },
    {
      year: 1660,
      title: { en: 'Capital of an Ottoman province', ar: 'عاصمة ولاية عثمانية' },
      text: {
        en: 'Sidon becomes the seat of the Ottoman Eyalet of Sidon, a province it heads until 1864, and the castle keeps watch over a busy provincial port.',
        ar: 'تصبح صيدا مركز ولاية صيدا العثمانية حتى عام 1864، وتظل القلعة تراقب مرفأً إقليمياً نشطاً.',
      },
    },
    {
      year: 1837,
      title: { en: 'The great earthquake', ar: 'الزلزال الكبير' },
      text: {
        en: 'On 1 January 1837 a powerful earthquake centred in Galilee devastates most of Sidon. A new landward wall is built around the city in its aftermath.',
        ar: 'في الأول من كانون الثاني 1837 يدمّر زلزال قوي مركزه الجليل معظم صيدا. ويُبنى في أعقابه سور جديد يحيط بالمدينة من جهة البر.',
      },
    },
    {
      year: 1941,
      title: { en: 'Soldiers among the ruins', ar: 'جنود بين الأطلال' },
      text: {
        en: "During the Syria-Lebanon campaign of the Second World War, Australian troops are photographed among the castle's ruins. Today it is Sidon's best-known landmark.",
        ar: 'خلال حملة سوريا ولبنان في الحرب العالمية الثانية، يُصوَّر جنود أستراليون بين أطلال القلعة. وهي اليوم أشهر معالم صيدا.',
      },
    },
  ],
  photos: PHOTOS,
  experience: true,
}
