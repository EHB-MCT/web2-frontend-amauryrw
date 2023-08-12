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

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/***/ (() => {

eval("\r\ndocument.getElementById('registerForm').addEventListener('submit', registerUser)\r\nfunction displayMessage(message, isError = false) {\r\n  const messageContainer = document.getElementById('messageContainerReg');\r\n  messageContainer.innerHTML = `<p class=\"${isError ? 'error-message' : 'success-message'}\">${message}</p>`;\r\n}\r\n\r\nfunction registerUser(e) {\r\n  e.preventDefault();\r\n\r\n  const username = document.getElementById('inputUsername').value;\r\n  const email = document.getElementById('registerEmail').value;\r\n  const password = document.getElementById('registerPassword').value;\r\n\r\n\r\n  const userData = {\r\n    username,\r\n    email,\r\n    password\r\n  };\r\n\r\n  fetch('http://localhost:5000/register', {\r\n    method: 'POST',\r\n    headers: {\r\n      'Content-Type': 'application/json'\r\n    },\r\n    body: JSON.stringify(userData)\r\n  })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n      if (data.message === 'Successful registration') {\r\n        localStorage.setItem('userId', data.userId);\r\n        displayMessage('Successful registration');\r\n      } \r\n      else {\r\n        displayMessage(data.message);\r\n      }\r\n    })\r\n    .catch(error => {\r\n      console.error('Error while registering:', error);\r\n      displayMessage('An error occurred while registering');\r\n    });\r\n}\n\n//# sourceURL=webpack://web2-frontend-amauryrw/./src/register.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/register.js"]();
/******/ 	
/******/ })()
;