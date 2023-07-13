document.getElementById('loginForm').addEventListener('submit', loginUser);

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const loginData = {
    email,
    password
  };

  fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Connexion réussie') {

        alert('Connexion réussie !');
      } else {
        alert('Erreur lors de la connexion : ' + data.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la connexion :', error);
      alert('Une erreur est survenue lors de la connexion');
    });
}