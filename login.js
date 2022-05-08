const inputEmail = document.querySelector('input[type="email"]')
const inputPassword = document.querySelector('input[type="password"]')
const submitButton = document.querySelector('.login-submit')
const loginBt = document.querySelector('.login')
const mainContainer = document.querySelector('.main')
const modal = document.querySelector('.modal')
const closeBt = document.querySelector('.close')

const errorHandler = () => {
  submitButton.classList.remove('loading')
  submitButton.classList.remove('success')
  submitButton.classList.add('error')
  submitButton.textContent = 'Error :('
  submitButton.style.backgroundColor = 'red'
}

const successHandler = () => {
  submitButton.classList.remove('loading')
  submitButton.classList.remove('error')
  submitButton.classList.add('success')
  submitButton.style.backgroundColor = 'green'
}

loginBt.addEventListener('click', () => {
  modal.style.display = 'block'
})

closeBt.addEventListener('click', () => {
  console.log('f')
  modal.style.display = 'none'
})

submitButton.addEventListener('click', event => {
  event.preventDefault()
  const regex = /[A-Za-z\d@$!%*#?&]{3,}/g
  if (regex.test(inputPassword.value)) {
  } else {
    alert('Email ou senha inválidos')
    inputPassword.value = ''
    errorHandler()
    return
  }

  // submitButton.textContent = "Loading...";

  fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value
    })
  })
    .then(response => {
      if (response.status == 200) {
        return response.json()
      } else if (response.status == 400) {
        throw 'Missing password'
      }
    })
    .then(response => {
      localStorage.setItem('token', response.token)
      console.log(localStorage.getItem('token'))
      successHandler()
    })
    .catch(() => {
      errorHandler()
    })
})
