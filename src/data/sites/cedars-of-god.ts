import type { Site } from '../types'
import { PHOTOS } from './cedars-of-god.photos'

export const CEDARS_OF_GOD: Site = {
  id: 'cedars-of-god',
  name: { en: 'Cedars of God and the Qadisha Valley', ar: 'أرز الرب ووادي قاديشا' },
  tagline: { en: 'The last of the ancient cedar forests', ar: 'ما تبقّى من غابات الأرز القديمة' },
  summary: {
    en: 'Above Bsharri, on a mountainside that approaches 2,000 metres, a few hundred cedars survive from the forests that supplied Egypt, Phoenicia and Solomon with timber. Below them the gorge of the Qadisha river sheltered hermits and, for centuries, the Maronite patriarchs. UNESCO lists the grove and the valley together.',
    ar: 'فوق بشري، على سفح جبلي يقارب ارتفاعه 2000 متر، تبقى بضع مئات من شجر الأرز من الغابات التي زوّدت مصر وفينيقيا وسليمان بالخشب. وتحتها احتضن وادي نهر قاديشا النسّاك، ثم البطاركة الموارنة قروناً طويلة. وتُدرج اليونسكو الغابة والوادي معاً.',
  },
  category: 'nature',
  region: 'north',
  coords: [34.244, 36.048],
  unesco: 1998,
  facts: [
    { en: 'About 375 old trees, some over 1,000 years', ar: 'نحو 375 شجرة معمّرة، بعضها يتجاوز ألف عام' },
    { en: 'Grove at nearly 2,000 m altitude', ar: 'غابة على ارتفاع يقارب 2000 متر' },
    { en: 'Cedar on the national flag since 1943', ar: 'الأرزة على العلم الوطني منذ 1943' },
    { en: 'UNESCO World Heritage since 1998', ar: 'تراث عالمي منذ 1998' },
  ],
  events: [
    {
      year: -2600,
      approx: true,
      title: { en: 'Cedar sails to Egypt', ar: 'الأرز يبحر إلى مصر' },
      text: {
        en: 'Egyptian records name Byblos by the reign of Sneferu. Timber from the Lebanese mountains, cedar above all, is shipped to the Nile for ships, temples and coffins.',
        ar: 'تذكر السجلات المصرية جبيل منذ عهد سنفرو، ويُشحن خشب جبال لبنان، وفي مقدمته الأرز، إلى وادي النيل لبناء السفن والمعابد والتوابيت.',
      },
    },
    {
      year: -950,
      approx: true,
      title: { en: 'Timber for Solomon\'s temple', ar: 'خشب لهيكل سليمان' },
      text: {
        en: 'In the biblical account, Hiram of Tyre floats rafts of cedar and cypress down the coast for the temple in Jerusalem. Phoenician fleets are built from the same forests.',
        ar: 'في الرواية التوراتية يرسل حيرام ملك صور أطواف الأرز والسرو بحراً لبناء الهيكل في القدس، ومن الغابات نفسها تُبنى الأساطيل الفينيقية.',
      },
    },
    {
      year: 130,
      approx: true,
      title: { en: 'Hadrian\'s imperial forest', ar: 'غابة هادريانوس الإمبراطورية' },
      text: {
        en: 'Emperor Hadrian declares the cedar forests imperial property and has boundary inscriptions cut into the rocks, the first recorded attempt to conserve them.',
        ar: 'يعلن الإمبراطور هادريانوس غابات الأرز ملكاً إمبراطورياً ويأمر بنقش حدودها على الصخور، في أول محاولة موثّقة لحمايتها.',
      },
    },
    {
      year: 1440,
      approx: true,
      title: { en: 'Patriarchs in the holy valley', ar: 'البطاركة في الوادي المقدس' },
      text: {
        en: 'The Maronite patriarchs settle at the monastery of Qannubin in the Qadisha gorge, which remains their seat until the nineteenth century.',
        ar: 'يتخذ البطاركة الموارنة من دير قنوبين في وادي قاديشا مقراً لهم، ويبقى كرسيّهم فيه حتى القرن التاسع عشر.',
      },
    },
    {
      year: 1550,
      title: { en: 'Twenty-eight giants', ar: 'ثمانٍ وعشرون شجرة عملاقة' },
      text: {
        en: 'The French naturalist Pierre Belon counts 28 ancient cedars in the grove. Travellers over the next two centuries count fewer each time they visit.',
        ar: 'يُحصي عالم الطبيعة الفرنسي بيير بيلون 28 أرزة معمّرة في الغابة، ويعدّ الرحّالة في القرنين التاليين عدداً أقل في كل زيارة.',
      },
    },
    {
      year: 1876,
      title: { en: 'A wall against the goats', ar: 'سور يصدّ الماعز' },
      text: {
        en: 'A high stone wall is built around the grove to keep grazing goats away from the saplings. Queen Victoria is usually credited with paying for it.',
        ar: 'يُشاد سور حجري عالٍ حول الغابة ليحمي الشتول من رعي الماعز، ويُنسب تمويله عادةً إلى الملكة فيكتوريا.',
      },
    },
    {
      year: 1943,
      title: { en: 'The cedar on the flag', ar: 'الأرزة على العلم' },
      text: {
        en: 'Independent Lebanon adopts its flag on 7 December: a green cedar on white between two red bands, making the tree the emblem of the new state.',
        ar: 'يعتمد لبنان المستقل علمه في 7 كانون الأول: أرزة خضراء على الأبيض بين شريطين أحمرين، فتغدو الشجرة شعار الدولة الجديدة.',
      },
    },
    {
      year: 1985,
      title: { en: 'Replanting the mountain', ar: 'إعادة تشجير الجبل' },
      text: {
        en: 'The Committee of the Friends of the Cedar Forest begins a reforestation programme. Some 200,000 cedars are planted around the old grove.',
        ar: 'تطلق لجنة أصدقاء غابة الأرز برنامجاً لإعادة التشجير، فتُغرس نحو 200 ألف أرزة حول الغابة القديمة.',
      },
    },
    {
      year: 1998,
      title: { en: 'World Heritage Site', ar: 'موقع تراث عالمي' },
      text: {
        en: 'UNESCO inscribes the Holy Valley and the Forest of the Cedars of God together, for the hermitages and monasteries and for the trees themselves.',
        ar: 'تدرج اليونسكو الوادي المقدس وغابة أرز الرب معاً على قائمة التراث العالمي، تقديراً للمناسك والأديرة وللأشجار نفسها.',
      },
    },
  ],
  photos: PHOTOS,
  experience: true,
}
