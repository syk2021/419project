# 419 Final Project

- Frontend directory: frontend (React Native)
- Backend directory: backend (MongoDB (database), Express.js (for api routing), Node.js)

## Commands to run in terminal
- run backend server => node index.js (make sure to be in backend directory)
- npx react-native start => will print out errors in the frontend side (in frontend directory)
- npx react-native run-ios => runs the react-native app itself (in frontend directory)

# Adding a package
Like Python's pip, node has a package manager called `npm`. 
Just like you do `pip install (package_name)`, call `npm install (package_name)`
For instance, this project will require you to have a package called `react-navigation-native`. 
To install this package, call `npm install react-navigation-native` in the terminal.
** npm i in `backend` and `frontend` directories respectively will install all the dependencies you need.

## How to add a page to the app
- add a Stack.Screen tag to frontend's App.js. the component has to match your component and name can be anything that you want it to be (as long as no overlaps in App.js and MainContainer.js)
- then pass in ({navigation}) into where your component sits.
- call navigation.navigate("Name") to redirect to the page that you named "Name" in frontend's App.js.

## Progress, MVP Version
- Backend: registration and login using mongoose models, api using axios requests
- Frontend: registration and login forms at entry point of app, main page (with home + details + settings tab), navigation using React Navigation
