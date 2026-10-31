import type { Site } from '../types'
import { PHOTOS } from './beiteddine-palace.photos'

export const BEITEDDINE_PALACE: Site = {
  id: 'beiteddine-palace',
  name: { en: 'Beiteddine Palace', ar: 'قصر بيت الدين' },
  tagline: { en: 'The emir\'s palace in the Chouf', ar: 'قصر الأمير في الشوف' },
  summary: {
    en: 'Emir Bashir Shihab II spent thirty years building this palace of courtyards, arcades and painted halls, a masterpiece of Lebanese architecture in the Chouf mountains. After his exile it served Ottoman governors and French officials, and since 1943 it has been the summer residence of Lebanon\'s presidents.',
    ar: 'أمضى الأمير بشير الشهابي الثاني ثلاثين عاماً في بناء هذا القصر بساحاته وأروقته وقاعاته المزخرفة، وهو تحفة من العمارة اللبنانية في جبال الشوف. بعد نفيه خدم الولاة العثمانيين والموظفين الفرنسيين، ومنذ عام 1943 صار المقر الصيفي لرؤساء الجمهورية اللبنانية.',
  },
  category: 'castle',
  region: 'mount-lebanon',
  coords: [33.695, 35.58],
  facts: [
    { en: 'Built 1788-1818', ar: 'بُني بين 1788 و1818' },
    { en: 'National monument since 1934', ar: 'معلم وطني منذ 1934' },
    { en: 'Presidential summer residence since 1943', ar: 'المقر الصيفي للرئاسة منذ 1943' },
    { en: 'Byzantine mosaics from Jiyeh, 5th-6th c.', ar: 'فسيفساء بيزنطية من الجية، القرن 5-6' },
  ],
  events: [
    {
      year: 1788,
      title: { en: 'Bashir II begins his palace', ar: 'بشير الثاني يبدأ قصره' },
      text: {
        en: 'Soon after taking power, Emir Bashir Shihab II starts building a palace on the site of a Druze hermitage above the village of Beiteddine.',
        ar: 'بعد توليه الحكم بقليل، يشرع الأمير بشير الشهابي الثاني في بناء قصر على موقع خلوة درزية فوق بلدة بيت الدين.',
      },
    },
    {
      year: 1811,
      approx: true,
      title: { en: 'Capital of the emirate', ar: 'عاصمة الإمارة' },
      text: {
        en: 'Bashir moves his seat from Deir al-Qamar to Beiteddine. Courtyards, stables, a hammam and richly painted reception halls are completed by about 1818.',
        ar: 'ينقل بشير مقر حكمه من دير القمر إلى بيت الدين، وتكتمل الساحات والإسطبلات والحمّام وقاعات الاستقبال المزخرفة نحو عام 1818.',
      },
    },
    {
      year: 1840,
      title: { en: 'The emir\'s exile', ar: 'نفي الأمير' },
      text: {
        en: 'After siding with Egypt\'s Ibrahim Pasha, Bashir surrenders to the Ottomans in October 1840 and is exiled to Malta, then Istanbul, where he dies in 1850.',
        ar: 'بعد وقوفه إلى جانب إبراهيم باشا المصري، يستسلم بشير للعثمانيين في تشرين الأول 1840 ويُنفى إلى مالطا ثم إسطنبول، حيث يموت عام 1850.',
      },
    },
    {
      year: 1861,
      approx: true,
      title: { en: 'Seat of the mutasarrifs', ar: 'مقر المتصرفين' },
      text: {
        en: 'The Ottomans use the palace as a government building. After the troubles of 1860 it becomes the residence of the mutasarrifs who govern Mount Lebanon.',
        ar: 'يستخدم العثمانيون القصر مبنى حكومياً، وبعد أحداث 1860 يغدو مقراً للمتصرفين الذين يحكمون جبل لبنان.',
      },
    },
    {
      year: 1934,
      title: { en: 'A national monument', ar: 'معلم وطني' },
      text: {
        en: 'Used by French officials under the Mandate, the palace is declared a national monument, protecting its courtyards and painted halls.',
        ar: 'يُعلن القصر، الذي يستخدمه الموظفون الفرنسيون في عهد الانتداب، معلماً وطنياً، فتُصان ساحاته وقاعاته المزخرفة.',
      },
    },
    {
      year: 1943,
      title: { en: 'The president\'s summer home', ar: 'المقر الصيفي للرئيس' },
      text: {
        en: 'In the year of independence, President Bechara El Khoury makes Beiteddine the official summer residence of Lebanon\'s presidents.',
        ar: 'في عام الاستقلال يجعل الرئيس بشارة الخوري قصر بيت الدين المقر الصيفي الرسمي لرؤساء الجمهورية اللبنانية.',
      },
    },
    {
      year: 1984,
      title: { en: 'Rescued from the war', ar: 'إنقاذه من الحرب' },
      text: {
        en: 'Badly damaged in the civil war, the palace is restored on the orders of Walid Jumblatt. Byzantine mosaics rescued from a church at Jiyeh are laid out in the stables.',
        ar: 'بعد أضرار بالغة في الحرب الأهلية، يُرمَّم القصر بأمر من وليد جنبلاط، وتُعرض في إسطبلاته فسيفساء بيزنطية أُنقذت من كنيسة في الجية.',
      },
    },
    {
      year: 1985,
      title: { en: 'Beiteddine Festival', ar: 'مهرجانات بيت الدين' },
      text: {
        en: 'The first Beiteddine festival is held in the palace courtyards in the middle of the war. It grows into one of the region\'s leading summer festivals.',
        ar: 'تُقام أولى دورات مهرجانات بيت الدين في ساحات القصر في خضم الحرب، وتصبح من أبرز المهرجانات الصيفية في المنطقة.',
      },
    },
    {
      year: 1999,
      title: { en: 'Back to the state', ar: 'عودته إلى الدولة' },
      text: {
        en: 'The palace is handed back to the Lebanese state, and President Emile Lahoud revives the tradition of presidential summers at Beiteddine.',
        ar: 'يُعاد القصر إلى الدولة اللبنانية، ويحيي الرئيس إميل لحود تقليد الإقامة الصيفية الرئاسية في بيت الدين.',
      },
    },
  ],
  photos: PHOTOS,
}
