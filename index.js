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
      isFormVisible: true,
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

    handleClickPopup () {
      this.isFormVisible = true
    },
    handleClickFormClose () {
      this.isFormVisible = false
    },
  }
})
