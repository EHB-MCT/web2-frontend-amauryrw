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
  
    const textElement = document.createElement('p');
    textElement.textContent = `Text: ${challenge.text}`;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${challenge.description}`;
  
    const datasetElement = document.createElement('p');
    datasetElement.textContent = `Dataset: ${challenge.dataset}`;
  
    const pictureElement = document.createElement('img');
    pictureElement.src = challenge.picture;
    pictureElement.alt = 'Challenge Picture';
  
    const resultElement = document.createElement('p');
    resultElement.textContent = `Result: ${challenge.result}`;
  
    challengeElement.appendChild(textElement);
    challengeElement.appendChild(descriptionElement);
    challengeElement.appendChild(datasetElement);
    challengeElement.appendChild(pictureElement);
    challengeElement.appendChild(resultElement);
  
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
  
    const challengeData = {
      text,
      description,
      dataset,
      picture,
      result,
      userId
    };
  
    try {
      const response = await fetch('http://localhost:5000/newChallenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(challengeData)
      });
  
      const { message, challengeId } = await response.json();
  
      if (response.ok) {
        alert(`${message} Challenge ID: ${challengeId}`);
        const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];
        currentChallengeIds.push(challengeId);
        localStorage.setItem('currentChallengeIds', JSON.stringify(currentChallengeIds));
        document.getElementById('createChallengeForm').reset();
        getAllChallenges();
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('An error occurred while creating the challenge');
    }
  }
  
  async function getMyChallenges(userId) {
    try {
      const response = await fetch(`http://localhost:5000/my-challenges?userId=${userId}`);
      const { challenges } = await response.json();
  
      const myChallengesList = document.getElementById('challengesList');
      myChallengesList.innerHTML = '';
  
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
      alert('An error occurred while retrieving user challenges');
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