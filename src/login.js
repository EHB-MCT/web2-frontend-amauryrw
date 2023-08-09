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
        localStorage.setItem('userId', data.userId);
        alert('Successful connection');
      } else {
        alert('Error while connecting : ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error while connecting :', error);
      alert('An error occurred while logging in');
    });
}