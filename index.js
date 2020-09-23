import { countries } from './countries'

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const h2s = Array.from(document.getElementsByTagName('h2'))
h2s.forEach(h2 => {
  h2.innerHTML = h2.innerHTML.split(' ')
    .map(capitalizeFirstLetter)
    .join(' ')
})

Vue.component('qed-form', {
  template: `
    <div id="form">
      <div class="form-field" :class="isFieldError('relationshipName') ? 'form-field-error' : ''">
        <label class="form-label" for="relationshipName">Relationship Name</label>
        <input class="form-input" type="text" id="relationshipName" v-model="relationshipName">
        <span class="form-error">Relationship name is required</span>
      </div>

      <div class="form-field" :class="isFieldError('inverseRelationshipName') ? 'form-field-error' : ''">
        <label class="form-label" for="inverseRelationshipName">Inverse Relationship Name</label>
        <input class="form-input" type="text" id="inverseRelationshipName" v-model="inverseRelationshipName">
        <span class="form-error">Inverse Relationship name is required</span>
      </div>

      <div class="form-field" :class="isFieldError('individual') ? 'form-field-error' : ''">
        <label class="form-label" for="individual">Individual</label>
        <div class="form-search-container">
          <input class="form-input" type="text" id="individual" placeholder="Search" v-model="individual">
          <i class="fa fa-search form-search-icon"></i>
        </div>
        <span class="form-error">Individual is required</span>
      </div>

      <div class="form-buttons">
        <button class="form-button form-button-x" v-on:click="handleClickX"><i class="fa fa-times"></i></button>
        <button class="form-button form-button-y" v-on:click="handleClickY"><i class="fa fa-check"></i></button>
      </div>
    </div>
    <button class="form-close" v-on:click="hideForm">Close this modal</button>
  `,
  data() {
    return {
      relationshipName: '',
      inverseRelationshipName: '',
      individual: '',
      errors: ['relationshipName'],
    }
  },
  watch: {
    relationshipName () { this.errors = this.errors.filter(e => e !== 'relationshipName') },
    inverseRelationshipName () { this.errors = this.errors.filter(e => e !== 'inverseRelationshipName') },
    individual () { this.errors = this.errors.filter(e => e !== 'individual') },
  },
  methods: {
    clearForm () {
      this.relationshipName = ''
      this.inverseRelationshipName = ''
      this.individual = ''
      this.errors = []
    },
    isFieldError (fieldName) { return this.errors.includes(fieldName) },
    handleClickX () {
      this.clearForm()
    },
    validateForm () {
      this.errors = []
      if (this.relationshipName.length === 0) this.errors.push('relationshipName')
      if (this.inverseRelationshipName.length === 0) this.errors.push('inverseRelationshipName')
      if (this.individual.length === 0) this.errors.push('individual')
    },
    handleClickY () {
      this.validateForm()
      if (this.errors.length) return
      this.submit()
    },
    submit () {
      const payload = {
        relationshipName: this.relationshipName,
        inverseRelationshipName: this.inverseRelationshipName,
        individual: this.individual,
      }
      $.post('/post', payload)
        .done(this.clearForm())
        .fail(error => {
          console.log(error)
        })
    },
  }
});
// qed-form component ends here

Vue.config.devtools = true
var app = new Vue({
  el: '#app',
  data() {
    return {
      dateTomorrow:  moment().add(1,'days').format('ddd, MMM-D-YYYY'),
      countries: countries,

      isFormVisible: false,
      isModalVisible: false,
      isMenuVisible: false,
    }
  },
  methods: {
    hideForm () { this.isFormVisible = false },
    showForm () { this.isFormVisible = true },

    hideModal () { this.isModalVisible = false },
    showModal () { this.isModalVisible = true },

    hideMenu () { this.isMenuVisible = false },
    toggleMenu () { this.isMenuVisible = !this.isMenuVisible },

    toggleDarkMode () {
      document.documentElement.classList.toggle('dark-mode')
    },
  }
})

// https://www.chartjs.org/docs/latest/getting-started/
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    options: {}
});
