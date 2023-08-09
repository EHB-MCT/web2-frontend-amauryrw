
document.getElementById('registerForm').addEventListener('submit', registerUser)

function registerUser(e) {
  e.preventDefault();

  const username = document.getElementById('inputUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;


  const userData = {
    username,
    email,
    password
  };

  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Inscription réussie') {
        localStorage.setItem('userId', data.userId);
        alert('Successful registration');
      } else {
        alert('Error while registering: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error while registering:', error);
      alert('An error occurred while registering');
    });
}