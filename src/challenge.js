
async function getAllChallenges() {
    try {
      const response = await fetch('https://web-2-courseprojectaugust-backend.onrender.com/all-challenges');
      const { challenges } = await response.json();
  
      const challengesList = document.getElementById('challengesUser');
      challengesList.innerHTML = '';
  
      challenges.forEach(challenge => {
        const challengeElement = createChallengeElement(challenge);
        challengesList.appendChild(challengeElement);
      });
    } catch (error) {
      console.error('Error while retrieving challenges:', error);
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
      window.location.href = `./playChallenge.html?challengeId=${challenge.challengeId}`;
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
      //alert('Login first please');
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

          const response = await fetch('https://web-2-courseprojectaugust-backend.onrender.com/newChallenges', {
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

          const createChallengeForm = document.getElementById('createChallengeForm');
          const successMessage = document.createElement('p');
          successMessage.textContent = `${message}`;
          successMessage.classList.add('success-message');
          createChallengeForm.parentNode.insertBefore(successMessage, createChallengeForm.nextSibling);

          if (response.ok) {
              //alert(`${message} Challenge ID: ${challengeId}`);
              const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
              currentChallengeIds.push(challengeId);
              localStorage.setItem('currentChallengeIds', JSON.stringify(currentChallengeIds));
              createChallengeForm.reset();
              getAllChallenges();

          } else {
              alert(message);
          }

      } else {
          alert('Error fetching api Unplaash-Amaury');
      }

  } catch (error) {
      console.error('Erreur lors de la création du défi:', error);
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
    }
  }


async function playChallenge() {
  const urlParams = new URLSearchParams(window.location.search);
  const challengeId = urlParams.get('challengeId'); 

  if (challengeId) {
    try {
      const response = await fetch(`https://web-2-courseprojectaugust-backend.onrender.com/challenges/${challengeId}`);
      if (response.ok) {
        const challenge = await response.json();
        displayChallengeDetails(challenge);
      } else {
        console.error(`Error fetching challenge details: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  }
}

function displayChallengeDetails(challenge) {
  const challengeDetailContainer = document.getElementById('challengeDetailsContainer');
  challengeDetailContainer.innerHTML = '';
  const challengeDetailElement = createChallengeDetailElement(challenge);
  challengeDetailContainer.appendChild(challengeDetailElement);

  const responseForm = challengeDetailElement.querySelector('#responseForm');
  const resultMessage = challengeDetailElement.querySelector('#resultMessage');

  responseForm.addEventListener('submit', async event => {
    event.preventDefault();
    const userResponse = responseForm.querySelector('#userResponse').value;

    if (userResponse === challenge.result) {
      resultMessage.textContent = 'Correct!';
    } else {
      resultMessage.textContent = 'Incorrect. Please try again.';
    }
  });
}

function createChallengeDetailElement(challenge) {
  const challengeDetailContainer = document.createElement('div');
  challengeDetailContainer.classList.add('challenge-detail');

  const questionElement = document.createElement('h1');
  questionElement.textContent = challenge.text;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${challenge.description}`;

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  const challengeImage = document.createElement('img');
  challengeImage.src = challenge.picture;
  challengeImage.alt = 'Challenge Image';
  imageContainer.appendChild(challengeImage);

  const datasetElement = document.createElement('p');
datasetElement.textContent = `Dataset: ${JSON.stringify(challenge.dataset, null, 2)}`; 
datasetElement.classList.add('json-dataset'); 

  const responseForm = document.createElement('form');
  responseForm.id = 'responseForm';
  const responseLabel = document.createElement('label');
  responseLabel.classList.add('response-label');
  responseLabel.for = 'userResponse';
  responseLabel.textContent = 'Your Response:';
  const responseInput = document.createElement('input');
  responseInput.type = 'text';
  responseInput.id = 'userResponse';
  responseInput.classList.add('answer-input');
  responseInput.required = true;
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('submit-button');
  submitButton.textContent = 'Submit';
  responseForm.appendChild(responseLabel);
  responseForm.appendChild(responseInput);
  responseForm.appendChild(submitButton);

  const resultMessage = document.createElement('p');
  resultMessage.id = 'resultMessage';

  challengeDetailContainer.appendChild(questionElement);
  challengeDetailContainer.appendChild(descriptionElement);
  challengeDetailContainer.appendChild(imageContainer);
  challengeDetailContainer.appendChild(datasetElement);
  challengeDetailContainer.appendChild(responseForm);
  challengeDetailContainer.appendChild(resultMessage);

  return challengeDetailContainer;
}


document.addEventListener('DOMContentLoaded', playChallenge);

  async function deleteChallenge(challengeId) {
    try {
      const response = await fetch(`https://web-2-courseprojectaugust-backend.onrender.com/deleteChallenge/${challengeId}`, {
        method: 'DELETE'
      });
  
      const { message } = await response.json();
      if (response.ok) {
        const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
        const updatedChallengeIds = currentChallengeIds.filter(id => id !== challengeId);
        localStorage.setItem('currentChallengeIds', JSON.stringify(updatedChallengeIds));
        const userId = localStorage.getItem('userId');
        if (userId) {
          getMyChallenges(userId);
        }
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
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
    document.getElementById('createChallengeForm').addEventListener('submit', createChallenge);
  });