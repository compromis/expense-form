import { createApp } from 'vue'

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronDown, faFileArrowUp, faTimes, faPlus, faUser,
  faCircleCheck, faCircleXmark, faSpinnerThird
} from '@fortawesome/pro-regular-svg-icons'

library.add(
  faChevronDown, faFileArrowUp, faTimes, faPlus, faUser,
  faCircleCheck, faCircleXmark, faSpinnerThird
)

/* Blobby */
import BInputGroup from '@compromis/blobby/components/inputs/BInputGroup.vue'
import BInput from '@compromis/blobby/components/inputs/BInput.vue'
import BSelect from '@compromis/blobby/components/inputs/BSelect.vue'
import BField from '@compromis/blobby/components/inputs/BField.vue'
import BButton from '@compromis/blobby/components/button/BButton.vue'
import BFooter from '@compromis/blobby/components/footer/BFooter.vue'
import BCard from '@compromis/blobby/components/card/BCard.vue'
import BCardSection from '@compromis/blobby/components/card/BCardSection.vue'
import '@compromis/blobby/scss/blobby.scss'

/* App */
import App from './App.vue'
const app = createApp(App)

app.component('b-input-group', BInputGroup)
app.component('b-input', BInput)
app.component('b-select', BSelect)
app.component('b-field', BField)
app.component('b-button', BButton)
app.component('b-footer', BFooter)
app.component('b-card', BCard)
app.component('b-card-section', BCardSection)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
