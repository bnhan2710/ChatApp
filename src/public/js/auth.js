const btn_login = document.querySelector('#btn_login');
const btn_register = document.querySelector('#btn_register');
const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
const registerUsername = document.querySelector('#register-username');
const registerEmail = document.querySelector('#register-email');
const registerPassword = document.querySelector('#register-password');

btn_login.addEventListener('click', (e) => {
  e.preventDefault();
  const username = loginUsername.value;
  const password = loginPassword.value;
  const obj = { username, password };
  console.log(obj);
  fetch('/v1/api/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(data => {
      // console.log('Data:::',data)
      if (data.statusCode === 200) {
            const accessToken = data.message.accessToken;
            sessionStorage.setItem('token', accessToken);
          window.location.href = '/v1/chat';
      }else{
          // console.log(data.message);
          alert('Invalid username or password');
      }
    })
    .catch(err => console.error(err));

  loginUsername.value = '';
  loginPassword.value = '';
});

btn_register.addEventListener('click', (e) => {
  e.preventDefault();
  const username = registerUsername.value;
  const email = registerEmail.value;
  const password = registerPassword.value;

  fetch('/v1/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
    .then(res => res.json())
    .then(data => {
      if(data.statusCode === 200){
        alert('User registered successfully');
      }else{
          alert(data.message);
          }
    })
    .catch(err => console.error(err));

      registerUsername.value = '';
      registerEmail.value = '';
      registerPassword.value = '';
});
