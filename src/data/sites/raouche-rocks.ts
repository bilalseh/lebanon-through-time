import type { Site } from '../types'
import { PHOTOS } from './raouche-rocks.photos'

export const RAOUCHE_ROCKS: Site = {
  id: 'raouche-rocks',
  name: { en: 'Raouche Rocks, Beirut', ar: 'صخرة الروشة، بيروت' },
  tagline: { en: 'Beirut\'s landmark at the water\'s edge', ar: 'معلم بيروت عند حافة البحر' },
  summary: {
    en: 'Two limestone stacks rise from the sea beneath the cliffs of Ras Beirut, the larger pierced by an arch that boats pass through. The shore around them has yielded the oldest traces of people in the city, and the Corniche above them is where Beirut comes to walk at sunset.',
    ar: 'تنتصب كتلتان صخريتان كلسيتان من البحر تحت جروف رأس بيروت، وتخترق الكبرى منهما فتحة تمرّ القوارب عبرها. وقد كشف الشاطئ حولهما أقدم آثار الإنسان في المدينة، وعلى الكورنيش فوقهما يتنزه أهل بيروت عند الغروب.',
  },
  category: 'nature',
  region: 'beirut',
  coords: [33.8903, 35.471],
  facts: [
    { en: 'Larger rock about 70 m high', ar: 'الصخرة الكبرى بارتفاع نحو 70 متراً' },
    { en: 'Stone Age flints found on the shore', ar: 'أدوات صوانية من العصر الحجري على الشاطئ' },
    { en: 'Corniche promenade of 4.8 km', ar: 'كورنيش بطول 4.8 كيلومتر' },
    { en: 'Name from the French rocher or the Aramaic rosh', ar: 'الاسم من "روشيه" الفرنسية أو "روش" الآرامية' },
  ],
  events: [
    {
      year: 551,
      title: { en: 'The sea draws back', ar: 'البحر ينحسر' },
      text: {
        en: 'On 9 July a great earthquake levels Roman Berytus. Chroniclers tell how the sea withdrew from this coast and then rushed back as a tsunami.',
        ar: 'في 9 تموز يدمّر زلزال عظيم بيريتوس الرومانية، ويروي المؤرخون كيف انحسر البحر عن هذا الساحل ثم عاد موجةً عاتية.',
      },
    },
    {
      year: 1881,
      title: { en: 'Drawn for Picturesque Palestine', ar: 'رسم في كتاب "فلسطين الخلابة"' },
      text: {
        en: 'An engraving of the Pigeon Rocks appears in Picturesque Palestine, which notes the enormous cavern in the cliff that small boats can enter.',
        ar: 'ينشر كتاب "فلسطين الخلابة" نقشاً لصخرة الحمام، مشيراً إلى الكهف الهائل في الجرف الذي تدخله القوارب الصغيرة.',
      },
    },
    {
      year: 1884,
      title: { en: 'Flints on the shore', ar: 'أدوات صوانية على الشاطئ' },
      text: {
        en: 'Worked flints are first noticed at Minet ed-Dalieh, the cove beside the rocks. The site proves one of the richest prehistoric tool workshops in Lebanon.',
        ar: 'تُلاحظ للمرة الأولى أدوات صوانية مشغولة في مينة الدالية، الخليج الصغير بجانب الصخرة، ويتبيّن أن الموقع من أغنى مشاغل الأدوات الحجرية في لبنان.',
      },
    },
    {
      year: 1914,
      title: { en: 'Digging at Dalieh', ar: 'التنقيب في الدالية' },
      text: {
        en: 'Raoul Describes excavates the Dalieh site. Beneath a Chalcolithic layer of about 3800 BC lies a far older Middle Palaeolithic level.',
        ar: 'ينقّب رؤول ديكريب في موقع الدالية، فيجد تحت طبقة من العصر النحاسي تعود إلى نحو 3800 ق.م. طبقة أقدم بكثير من العصر الحجري القديم الأوسط.',
      },
    },
    {
      year: 1946,
      title: { en: 'The oldest tool in Beirut', ar: 'أقدم أداة في بيروت' },
      text: {
        en: 'Henri Fleisch surveys the marine terraces of Ras Beirut and recovers a rolled Acheulean handaxe, the earliest human trace yet found in the city.',
        ar: 'يمسح هنري فلايش المصاطب البحرية في رأس بيروت ويعثر على فأس يدوية أشولية، وهي أقدم أثر بشري عُثر عليه في المدينة حتى الآن.',
      },
    },
    {
      year: 1975,
      title: { en: 'A front line by the sea', ar: 'خط جبهة على البحر' },
      text: {
        en: 'Civil war divides Beirut. Palm trunks along the Corniche are pocked with bullets, and election candidates paste their portraits on the rock itself.',
        ar: 'تقسم الحرب الأهلية بيروت؛ تمتلئ جذوع النخيل على الكورنيش بالرصاص، ويلصق مرشحو الانتخابات صورهم على الصخرة نفسها.',
      },
    },
    {
      year: 2014,
      title: { en: 'Saving Dalieh', ar: 'إنقاذ الدالية' },
      text: {
        en: 'As the headland beside the rocks is sold to developers, a civic campaign begins to keep Dalieh, with its fishermen and its prehistoric site, open to all.',
        ar: 'مع بيع الرأس المجاور للصخرة لمطوّرين عقاريين، تنطلق حملة مدنية للإبقاء على الدالية، بصياديها وموقعها الأثري، مفتوحة للجميع.',
      },
    },
  ],
  photos: PHOTOS,
}
