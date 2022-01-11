var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
  event.preventDefault()

  var zipCode = zipCodeField.value

  // -> Validações
  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.replace('_', '')
  zipCode = zipCode.replace('-', '')
    // -> Retira os espaços inseridos no início ou fim da string (valor inserido no input)
  zipCode = zipCode.trim()

  // -> Requisição (GET) para o servidor VIACEP
  axios
  .get('https://viacep.com.br/ws/' + zipCode +'/json/')
  .then(function(response) {
    // -> Validação de CEP's inválidos
    if(response.data.erro) {
      // Throw -> Lança a exceção
      throw new Error('CEP inválido!')
    }

    // -> Retorna os dados buscados a partir do valor inserido no input
    content.innerHTML = ''
    createLine(response.data.logradouro)
    createLine(response.data.bairro + ' - ' + response.data.localidade)
    createLine(response.data.uf + ' - Brasil')
  })
  .catch(function(error){
    content.innerHTML = ''
    createLine('Ops, algo deu errado!')
  })
}

function createLine (text){
  var line = document.createElement('p')
  var text = document.createTextNode(text)

  line.appendChild(text)
  content.appendChild(line)
}
