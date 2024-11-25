import '@/assets/scripts/script';
import 'bootstrap/js/src/modal'

import { getData } from '../../assets/scripts/modules/getData';

getData('/events.json').then((data) => {
  console.log(data);
});

