
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
        alert('Inscription réussie !');
      } else {
        alert('Erreur lors de l\'inscription : ' + data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Une erreur est survenue lors de l\'inscription');
    });
}