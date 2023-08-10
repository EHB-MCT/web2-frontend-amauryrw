

async function getAllChallenges() {
    try {
      const response = await fetch('http://localhost:5000/all-challenges');
      const { challenges } = await response.json();
  
      const challengesList = document.getElementById('challengesUser');
      challengesList.innerHTML = '';
  
      challenges.forEach(challenge => {
        const challengeElement = createChallengeElement(challenge);
        challengesList.appendChild(challengeElement);
      });
    } catch (error) {
      console.error('Error while retrieving challenges:', error);
      alert('An error occurred while retrieving challenges');
    }
  }
  
  function createChallengeElement(challenge) {
    const challengeElement = document.createElement('div');
    challengeElement.classList.add('challenge');
  
    const textElement = document.createElement('h1');
    textElement.textContent = ` ${challenge.text}`;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${challenge.description}`;
  
    const datasetElement = document.createElement('p');
    datasetElement.textContent = `Dataset: ${challenge.dataset}`;
  
    const pictureElement = document.createElement('img');
    pictureElement.src = challenge.picture;
    pictureElement.alt = 'Challenge Picture';
  
    const resultElement = document.createElement('p');
    resultElement.textContent = `Result: ${challenge.result}`;

    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
    window.location.href = `/playChallenge.html?challengeId=${challenge.id}`;
    playChallenge();
  });
  
    challengeElement.appendChild(textElement);
    challengeElement.appendChild(descriptionElement);
    challengeElement.appendChild(datasetElement);
    challengeElement.appendChild(pictureElement);
    challengeElement.appendChild(resultElement);
    challengeElement.appendChild(playButton);
  
    return challengeElement;
  }
  
  async function createChallenge(event) {
    event.preventDefault();
  
    const text = document.getElementById('challengeTitle').value;
    const description = document.getElementById('challengeQuestion').value;
    const dataset = document.getElementById('dataset').value;
    const picture = document.getElementById('challengeImage').value;
    const result = document.getElementById('challengeAnswer').value;
  
    const userId = localStorage.getItem('userId');
    if (!userId) {  
      console.log('Login first please');
      return;
    }
  
    try {

      const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${picture}&client_id=bhRpal5CnR4RcdLKulIU1xWSkYPHfuKliarmeevfHKs`);

      const unsplashApi = await unsplashResponse.json();

      if (unsplashResponse.ok) {
          const picture = unsplashApi.urls.regular;
          const altDescription = unsplashApi.alt_description;
          const challengeData = {
              text,
              description,
              dataset,
              picture,
              altDescription,
              result,
              userId
          };

          const response = await fetch('http://localhost:5000/newChallenges', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(challengeData)
          });

          const {
              message,
              challengeId
          } = await response.json();

          if (response.ok) {
              alert(`${message} Challenge ID: ${challengeId}`);
              const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
              currentChallengeIds.push(challengeId);
              localStorage.setItem('currentChallengeIds', JSON.stringify(currentChallengeIds));
              document.getElementById('create-challenge-form').reset();
              getAllChallenges();

          } else {
              alert(message);
          }

      } else {
          alert('Error fetching api Unplaash-Amaury');
      }

  } catch (error) {
      console.error('Erreur lors de la création du défi:', error);
      //alert('Une erreur est survenue lors de la création du défi');
  }
}

  async function getMyChallenges(userId) {
    try {
      const response = await fetch(`http://localhost:5000/my-challenges?userId=${userId}`);
      const { challenges } = await response.json();
   
      const myChallengesList = document.getElementById('challengesList');
      while (myChallengesList.firstChild) {
       myChallengesList.removeChild(myChallengesList.firstChild);
}

  
      challenges.forEach(challenge => {
        const challengeElement = createChallengeElement(challenge);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteChallenge(challenge.challengeId);
        });
  
        challengeElement.appendChild(deleteButton);
        myChallengesList.appendChild(challengeElement);
      });
    } catch (error) {
      console.error('Error retrieving user challenges:', error);
      //alert('An error occurred while retrieving user challenges');
    }
  }


  async function playChallenge() {
    // Récupérer l'ID du challenge à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('challengeId');

    // Si l'ID du challenge est présent dans l'URL, afficher les détails du challenge
    if (challengeId) {
        const challengeDetailsContainer = document.getElementById('challengeDetails');

        // Appeler l'API pour obtenir les détails du challenge en utilisant l'ID
        fetch(`http://localhost:5000/challenges/${challengeId}`)
            .then(response => response.json())
            .then(challenge => {
                console.log(challenge); // Afficher les détails du challenge dans la console
                const challengeElement = createChallengeElement(challenge);
                challengeDetailsContainer.appendChild(challengeElement);
            })
            .catch(error => {
                console.error('Error fetching challenge details:', error);
                alert('An error occurred while fetching challenge details');
            });
    }
}

  
  async function deleteChallenge(challengeId) {
    try {
      const response = await fetch(`http://localhost:5000/deleteChallenge/${challengeId}`, {
        method: 'DELETE'
      });
  
      const { message } = await response.json();
  
      if (response.ok) {
        alert(message);
        const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
        const updatedChallengeIds = currentChallengeIds.filter(id => id !== challengeId);
        localStorage.setItem('currentChallengeIds', JSON.stringify(updatedChallengeIds));
        const userId = localStorage.getItem('userId');
        if (userId) {
          getMyChallenges(userId);
        }
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('An error occurred while deleting the challenge');
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    getMyChallenges(userId);
  }

  const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
  await Promise.all(
    currentChallengeIds.map(async challengeId => {
      try {
        const response = await fetch(`http://localhost:5000/challenges/${challengeId}`);
        if (response.ok) {
          const challenge = await response.json();
          const challengeElement = createChallengeElement(challenge);
          document.getElementById('challengesUser').appendChild(challengeElement);
        } else {
          console.error(`Error fetching challenge ${challengeId}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching challenge ${challengeId}: ${error}`);
      }
    })
  );
});
  
  document.getElementById('createChallengeForm').addEventListener('submit', createChallenge);