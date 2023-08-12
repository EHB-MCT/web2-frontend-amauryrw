/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/challenge.js":
/*!**************************!*\
  !*** ./src/challenge.js ***!
  \**************************/
/***/ (() => {

eval("\r\nasync function getAllChallenges() {\r\n    try {\r\n      const response = await fetch('https://web-2-courseprojectaugust-backend.onrender.com/all-challenges');\r\n      const { challenges } = await response.json();\r\n  \r\n      const challengesList = document.getElementById('challengesUser');\r\n      challengesList.innerHTML = '';\r\n  \r\n      challenges.forEach(challenge => {\r\n        const challengeElement = createChallengeElement(challenge);\r\n        challengesList.appendChild(challengeElement);\r\n      });\r\n    } catch (error) {\r\n      console.error('Error while retrieving challenges:', error);\r\n    }\r\n  }\r\n  \r\n  function createChallengeElement(challenge) {\r\n    const challengeElement = document.createElement('div');\r\n    challengeElement.classList.add('challenge');\r\n  \r\n    const textElement = document.createElement('h1');\r\n    textElement.textContent = ` ${challenge.text}`;\r\n  \r\n    const descriptionElement = document.createElement('p');\r\n    descriptionElement.textContent = `Description: ${challenge.description}`;\r\n  \r\n    const datasetElement = document.createElement('p');\r\n    datasetElement.textContent = `Dataset: ${challenge.dataset}`;\r\n  \r\n    const pictureElement = document.createElement('img');\r\n    pictureElement.src = challenge.picture;\r\n    pictureElement.alt = 'Challenge Picture';\r\n  \r\n    const resultElement = document.createElement('p');\r\n    resultElement.textContent = `Result: ${challenge.result}`;\r\n\r\n    const playButton = document.createElement('button');\r\n    playButton.textContent = 'Play';\r\n    playButton.addEventListener('click', () => {\r\n      window.location.href = `./playChallenge.html?challengeId=${challenge.challengeId}`;\r\n  });\r\n  \r\n    challengeElement.appendChild(textElement);\r\n    challengeElement.appendChild(descriptionElement);\r\n    challengeElement.appendChild(datasetElement);\r\n    challengeElement.appendChild(pictureElement);\r\n    challengeElement.appendChild(resultElement);\r\n    challengeElement.appendChild(playButton);\r\n  \r\n    return challengeElement;\r\n  }\r\n  \r\n  async function createChallenge(event) {\r\n    event.preventDefault();\r\n  \r\n    const text = document.getElementById('challengeTitle').value;\r\n    const description = document.getElementById('challengeQuestion').value;\r\n    const dataset = document.getElementById('dataset').value;\r\n    const picture = document.getElementById('challengeImage').value;\r\n    const result = document.getElementById('challengeAnswer').value;\r\n  \r\n    const userId = localStorage.getItem('userId');\r\n    if (!userId) {  \r\n      //alert('Login first please');\r\n      return;\r\n    }\r\n  \r\n    try {\r\n\r\n      const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${picture}&client_id=bhRpal5CnR4RcdLKulIU1xWSkYPHfuKliarmeevfHKs`);\r\n      const unsplashApi = await unsplashResponse.json();\r\n\r\n      if (unsplashResponse.ok) {\r\n          const picture = unsplashApi.urls.regular;\r\n          const altDescription = unsplashApi.alt_description;\r\n          const challengeData = {\r\n              text,\r\n              description,\r\n              dataset,\r\n              picture,\r\n              altDescription,\r\n              result, \r\n              userId\r\n          };\r\n\r\n          const response = await fetch('https://web-2-courseprojectaugust-backend.onrender.com/newChallenges', {\r\n              method: 'POST',\r\n              headers: {\r\n                  'Content-Type': 'application/json'\r\n              },\r\n              body: JSON.stringify(challengeData)\r\n          }); \r\n\r\n          const {\r\n              message,\r\n              challengeId\r\n          } = await response.json();\r\n\r\n          const createChallengeForm = document.getElementById('createChallengeForm');\r\n          const successMessage = document.createElement('p');\r\n          successMessage.textContent = `${message}`;\r\n          successMessage.classList.add('success-message');\r\n          createChallengeForm.parentNode.insertBefore(successMessage, createChallengeForm.nextSibling);\r\n\r\n          if (response.ok) {\r\n              //alert(`${message} Challenge ID: ${challengeId}`);\r\n              const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];\r\n              currentChallengeIds.push(challengeId);\r\n              localStorage.setItem('currentChallengeIds', JSON.stringify(currentChallengeIds));\r\n              createChallengeForm.reset();\r\n              getAllChallenges();\r\n\r\n          } else {\r\n              alert(message);\r\n          }\r\n\r\n      } else {\r\n          alert('Error fetching api Unplaash-Amaury');\r\n      }\r\n\r\n  } catch (error) {\r\n      console.error('Erreur lors de la création du défi:', error);\r\n  }\r\n}\r\n\r\n  async function getMyChallenges(userId) {\r\n    try {\r\n      const response = await fetch(`http://localhost:5000/my-challenges?userId=${userId}`);\r\n      const { challenges } = await response.json();\r\n   \r\n      const myChallengesList = document.getElementById('challengesList');\r\n      while (myChallengesList.firstChild) {\r\n       myChallengesList.removeChild(myChallengesList.firstChild);\r\n}\r\n\r\n  \r\n      challenges.forEach(challenge => {\r\n        const challengeElement = createChallengeElement(challenge);\r\n  \r\n        const deleteButton = document.createElement('button');\r\n        deleteButton.textContent = 'Delete';\r\n        deleteButton.addEventListener('click', () => {\r\n          deleteChallenge(challenge.challengeId);\r\n        });\r\n  \r\n        challengeElement.appendChild(deleteButton);\r\n        myChallengesList.appendChild(challengeElement);\r\n      });\r\n    } catch (error) {\r\n      console.error('Error retrieving user challenges:', error);\r\n    }\r\n  }\r\n\r\n\r\nasync function playChallenge() {\r\n  const urlParams = new URLSearchParams(window.location.search);\r\n  const challengeId = urlParams.get('challengeId'); \r\n\r\n  if (challengeId) {\r\n    try {\r\n      const response = await fetch(`https://web-2-courseprojectaugust-backend.onrender.com/challenges/${challengeId}`);\r\n      if (response.ok) {\r\n        const challenge = await response.json();\r\n        displayChallengeDetails(challenge);\r\n      } else {\r\n        console.error(`Error fetching challenge details: ${response.status}`);\r\n      }\r\n    } catch (error) {\r\n      console.error('Error fetching challenge details:', error);\r\n    }\r\n  }\r\n}\r\n\r\nfunction displayChallengeDetails(challenge) {\r\n  const challengeDetailContainer = document.getElementById('challengeDetailsContainer');\r\n  challengeDetailContainer.innerHTML = '';\r\n  const challengeDetailElement = createChallengeDetailElement(challenge);\r\n  challengeDetailContainer.appendChild(challengeDetailElement);\r\n\r\n  const responseForm = challengeDetailElement.querySelector('#responseForm');\r\n  const resultMessage = challengeDetailElement.querySelector('#resultMessage');\r\n\r\n  responseForm.addEventListener('submit', async event => {\r\n    event.preventDefault();\r\n    const userResponse = responseForm.querySelector('#userResponse').value;\r\n\r\n    if (userResponse === challenge.result) {\r\n      resultMessage.textContent = 'Correct!';\r\n    } else {\r\n      resultMessage.textContent = 'Incorrect. Please try again.';\r\n    }\r\n  });\r\n}\r\n\r\nfunction createChallengeDetailElement(challenge) {\r\n  const challengeDetailContainer = document.createElement('div');\r\n  challengeDetailContainer.classList.add('challenge-detail');\r\n\r\n  const questionElement = document.createElement('h1');\r\n  questionElement.textContent = challenge.text;\r\n\r\n  const descriptionElement = document.createElement('p');\r\n  descriptionElement.textContent = `Description: ${challenge.description}`;\r\n\r\n  const imageContainer = document.createElement('div');\r\n  imageContainer.classList.add('image-container');\r\n  const challengeImage = document.createElement('img');\r\n  challengeImage.src = challenge.picture;\r\n  challengeImage.alt = 'Challenge Image';\r\n  imageContainer.appendChild(challengeImage);\r\n\r\n  const datasetElement = document.createElement('p');\r\ndatasetElement.textContent = `Dataset: ${JSON.stringify(challenge.dataset, null, 2)}`; \r\ndatasetElement.classList.add('json-dataset'); \r\n\r\n  const responseForm = document.createElement('form');\r\n  responseForm.id = 'responseForm';\r\n  const responseLabel = document.createElement('label');\r\n  responseLabel.classList.add('response-label');\r\n  responseLabel.for = 'userResponse';\r\n  responseLabel.textContent = 'Your Response:';\r\n  const responseInput = document.createElement('input');\r\n  responseInput.type = 'text';\r\n  responseInput.id = 'userResponse';\r\n  responseInput.classList.add('answer-input');\r\n  responseInput.required = true;\r\n  const submitButton = document.createElement('button');\r\n  submitButton.type = 'submit';\r\n  submitButton.classList.add('submit-button');\r\n  submitButton.textContent = 'Submit';\r\n  responseForm.appendChild(responseLabel);\r\n  responseForm.appendChild(responseInput);\r\n  responseForm.appendChild(submitButton);\r\n\r\n  const resultMessage = document.createElement('p');\r\n  resultMessage.id = 'resultMessage';\r\n\r\n  challengeDetailContainer.appendChild(questionElement);\r\n  challengeDetailContainer.appendChild(descriptionElement);\r\n  challengeDetailContainer.appendChild(imageContainer);\r\n  challengeDetailContainer.appendChild(datasetElement);\r\n  challengeDetailContainer.appendChild(responseForm);\r\n  challengeDetailContainer.appendChild(resultMessage);\r\n\r\n  return challengeDetailContainer;\r\n}\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', playChallenge);\r\n\r\n  async function deleteChallenge(challengeId) {\r\n    try {\r\n      const response = await fetch(`https://web-2-courseprojectaugust-backend.onrender.com/deleteChallenge/${challengeId}`, {\r\n        method: 'DELETE'\r\n      });\r\n  \r\n      const { message } = await response.json();\r\n      if (response.ok) {\r\n        const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];\r\n        const updatedChallengeIds = currentChallengeIds.filter(id => id !== challengeId);\r\n        localStorage.setItem('currentChallengeIds', JSON.stringify(updatedChallengeIds));\r\n        const userId = localStorage.getItem('userId');\r\n        if (userId) {\r\n          getMyChallenges(userId);\r\n        }\r\n      }\r\n    } catch (error) {\r\n      console.error('Error deleting challenge:', error);\r\n    }\r\n  }\r\n  \r\n  document.addEventListener('DOMContentLoaded', async () => {\r\n    const userId = localStorage.getItem('userId');\r\n    if (userId) {\r\n      getMyChallenges(userId);\r\n    }\r\n  \r\n    const currentChallengeIds = JSON.parse(localStorage.getItem('currentChallengeIds')) || [];\r\n    await Promise.all(\r\n      currentChallengeIds.map(async challengeId => {\r\n        try {\r\n          const response = await fetch(`http://localhost:5000/challenges/${challengeId}`);\r\n          if (response.ok) {\r\n            const challenge = await response.json();\r\n            const challengeElement = createChallengeElement(challenge);\r\n            document.getElementById('challengesUser').appendChild(challengeElement);\r\n          } else {\r\n            console.error(`Error fetching challenge ${challengeId}: ${response.status}`);\r\n          }\r\n        } catch (error) {\r\n          console.error(`Error fetching challenge ${challengeId}: ${error}`);\r\n        }\r\n      })\r\n    );\r\n    document.getElementById('createChallengeForm').addEventListener('submit', createChallenge);\r\n  });\n\n//# sourceURL=webpack://web2-frontend-amauryrw/./src/challenge.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/challenge.js"]();
/******/ 	
/******/ })()
;