import type { Site } from '../types'
import { PHOTOS } from './baatara-gorge.photos'

export const BAATARA_GORGE: Site = {
  id: 'baatara-gorge',
  name: { en: 'Baatara Gorge Waterfall', ar: 'شلال بالوع بعتارة' },
  tagline: { en: 'A waterfall through three natural bridges', ar: 'شلال يهوي عبر ثلاثة جسور صخرية' },
  summary: {
    en: 'High above Tannourine, meltwater plunges 255 metres into the Balaa pothole, passing beneath three natural limestone bridges stacked one above the other. The rock is Jurassic, more than 145 million years old, yet the outside world only learned of the chasm in 1952.',
    ar: 'في أعالي تنورين، تهوي مياه ذوبان الثلوج 255 متراً في بالوع بالعا، مارّةً تحت ثلاثة جسور طبيعية من الحجر الكلسي يعلو بعضها بعضاً. الصخر جوراسي يزيد عمره على 145 مليون سنة، لكن العالم الخارجي لم يعرف بالهوّة إلا في عام 1952.',
  },
  category: 'nature',
  region: 'north',
  coords: [34.1772, 35.8722],
  facts: [
    { en: '255 m drop into the pothole', ar: 'هوّة بعمق 255 متراً' },
    { en: '3 natural bridges stacked above the chasm', ar: '3 جسور طبيعية فوق الهوّة' },
    { en: 'Jurassic limestone over 145 million years old', ar: 'حجر كلسي جوراسي يزيد عمره على 145 مليون سنة' },
    { en: 'Documented for the outside world in 1952', ar: 'عُرف خارج لبنان عام 1952' },
  ],
  events: [
    {
      year: 1951,
      title: { en: 'Lebanese caving takes off', ar: 'انطلاق استكشاف المغاور في لبنان' },
      text: {
        en: 'The Spéléo Club du Liban is founded in Beirut. Its cavers will spend the following decades mapping the sinkholes and underground rivers of Mount Lebanon.',
        ar: 'يتأسس النادي اللبناني للتنقيب في المغاور في بيروت، وسيقضي أعضاؤه العقود التالية في رسم خرائط البواليع والأنهار الجوفية في جبل لبنان.',
      },
    },
    {
      year: 1952,
      title: { en: 'Henri Coiffait finds the chasm', ar: 'هنري كويفايت يكتشف الهوّة' },
      text: {
        en: 'The French bio-speleologist Henri Coiffait documents the pothole that the villagers of Balaa had long known, revealing its three bridges to the outside world.',
        ar: 'يوثّق عالم أحياء المغاور الفرنسي هنري كويفايت البالوع الذي عرفه أهالي بالعا منذ القدم، فيكشف جسوره الثلاثة للعالم الخارجي.',
      },
    },
    {
      year: 1980,
      approx: true,
      title: { en: 'Mapping the pothole', ar: 'رسم خريطة البالوع' },
      text: {
        en: 'Members of the Spéléo Club du Liban survey the waterfall and the sinkhole in detail. In spring a cascade of up to 100 metres drops behind the bridges into a chasm about 240 metres deep.',
        ar: 'يمسح أعضاء النادي اللبناني للتنقيب في المغاور الشلال والبالوع بالتفصيل. ففي الربيع يهوي شلال يصل ارتفاعه إلى 100 متر خلف الجسور في هوّة بعمق نحو 240 متراً.',
      },
    },
    {
      year: 1988,
      title: { en: 'Where does the water go?', ar: 'إلى أين تذهب المياه؟' },
      text: {
        en: 'Fluorescent dye poured into the chasm reappears at the Dalleh spring in the Ghaouaghir cave near Balaa, proving the underground link between them.',
        ar: 'تظهر صبغة فلورية أُلقيت في الهوّة مجدداً في نبع الدلّة بمغارة الغواغير قرب بالعا، مما يثبت الصلة الجوفية بينهما.',
      },
    },
    {
      year: 1999,
      title: { en: 'Tannourine cedars protected', ar: 'حماية أرز تنورين' },
      text: {
        en: 'A law creates the Tannourine Cedars Forest Nature Reserve on the heights above the gorge: 195 hectares of cedar left untouched through the war years.',
        ar: 'يُنشئ قانون محمية أرز تنورين الطبيعية على المرتفعات فوق الأخدود: 195 هكتاراً من الأرز بقيت على حالها طوال سنوات الحرب.',
      },
    },
    {
      year: 2008,
      title: { en: 'On the Lebanon Mountain Trail', ar: 'على درب الجبل اللبناني' },
      text: {
        en: 'The 470 km Lebanon Mountain Trail is completed. Its Tannourine sections bring hikers from across the world to the edge of the three bridges.',
        ar: 'يكتمل درب الجبل اللبناني بطول 470 كيلومتراً، وتجلب مقاطعه في تنورين المشاة من أنحاء العالم إلى حافة الجسور الثلاثة.',
      },
    },
  ],
  photos: PHOTOS,
}
