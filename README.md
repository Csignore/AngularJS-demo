# LoginRadius AngularJS Demo

## Overview

This document contains all of the details for our LoginRadius AngularJS [demo](https://github.com/LoginRadius/demo/tree/v2-AngularJS-demo). This demo is a simple single page website that allow different views to be shown in different conditions using AngularJS features. This demo demonstrates ease of implementation, getting a centralized look and feel, and customizability. 


## How to Run
**Required: NPM installed** (Link [here](https://nodejs.org/en/download/) to download)
1. configure the file `/app/app.js` to match your credentials.  **Note: make sure you fill out all of the fields to prevent unexpected behaviour.**
Running this application, on terminal or any command prompt run:
   1.  ` cd to directory `
   2.  `npm start ` **Note: this will trigger `npm install` and `Bower install`**
   3. Now browse to the app at `localhost:8000`

## Noted Differences between Plain-HTML/CSS/JS & AngularJS:

* The main difference between using the LoginRadiusV2.js directly and using it along with AngularJS is with invoking the LoginRadiusV2 Singleton.

  * **Problem**: Invoking the LoginRadiusV2 Singleton with AngularJS:
  * **Solution**: To invoke the LoginRadiusV2 you'll need to use:
  ```$scope.LoginObject = window.LoginRadiusV2($scope.commonOptions)``` 
  as shown in *app/app.js* 

* Redirect to Profile Page when login successfully.

  * **Problem**: Since this demo is single page, after log in, it won't show the profile by redirecting to other page.
  * **Solution**: Using flags to hide input options and show the profile by AngularJS apply function:
  ```$scope.$apply();```
  (you may need to replace $scope.$apply() with the helper function'safeApply' defined in app.js)