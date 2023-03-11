# 419 project

Frontend directory: testproject (React Native)
Backend directory: backend (MongoDB (database), Express.js (for api routing), Node.js)

## Commands to run in terminal
run backend server => node index.js
npx react-native start => will print out errors in the frontend side
npx react-native run-ios => runs the react-native app itself

# Adding a package
Like Python's pip, node has a package manager called `npm`. 
Just like you do `pip install (package_name)`, call `npm install (package_name)`
For instance, this project will require you to have a package called `react-router-native`. 
To install this package, call `npm install react-router-native` in the terminal.

## How to add a page to the app
- Make a .js file in `testproject` directory.
- Navigate to 'App.js' in `testproject` directory and inside the tags `NativeRouter` and `Routes`, add a Route with the relevant path you want to direct the app to (this will be called inside navigate in the frontend pages themselves) and import the component from the file. Inside the `Route` tag, include element=`NameofElement`.