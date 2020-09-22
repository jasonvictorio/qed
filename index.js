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


Vue.config.devtools = true
var app = new Vue({
  el: '#app',
  data() {
    return {
      relationshipName: '',
      inverseRelationshipName: '',
      individual: '',

      dateTomorrow:  moment().add(1,'days').format('ddd, MMM-D-YYYY'),
      countries: countries,

      isFormVisible: false,
      isModalVisible: false,
      isMenuVisible: false,
    }
  },
  methods: {
    clearForm () {
      this.relationshipName = ''
      this.inverseRelationshipName = ''
      this.individual = ''
    },
    handleClickX () {
      this.clearForm()
    },
    handleClickY () {
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
