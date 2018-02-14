# LoginRadius AngularJS Demo
## Overview
This is another demo project of LoginRadius that is implemented in AngularJS(we have an HTML and JS [demo](https://docs.loginradius.com/api/v2/use-cases-demo/iframe-demo/)). This is a simple single page website, that allows you to display the Hosted Registration page directly on your website in an iframe. The results (success or error) would either be alerted at the page or on the console. Filling your API information, you can log in with either email or your social account. Try it out!

## How to Run
**Required: NPM installed** (Link [here](https://nodejs.org/en/download/) to download)
1. configure the file ``/app/view1/view1.js`` to match your credentials.  **You must have every field present in that file.  If not, it could cause unexpected behaviour.**
Running this application, on terminal or any command prompt run:
   1.  ``` cd to directory ```
   2.  ``` npm start ``` (this would run "npm install" and "Bower install" on the behind as well)
   3. Now browse to the app at `localhost:8000`

## Noted Differences between Plain-HTML/CSS/JS & AngularJS:
1. Invoking the LoginRadiusV2 Singleton:
  * Solution: To invoke the LoginRadiusV2 you'll need to use:
  ``` let $scope.LoginObject = window.LoginRadiusV2($scope.commonOptions)``` 
  as shown in *app/view1.js/renderLoginItem* (or var if you're not in ES6)
2. Program not working without 'API information'
  * Solution: using a guard to guarantee the information is filled
```
    if($scope.commonOptions.apiKey.substring(0,1) == "<")
    {
      console.log("Please fill out your apiKey, appName and sott, otherwise it is not working");
    }
```
3. Verify the token
  * Problem: Cannot run the functions when getting the token, such as verifying the email for registration and reset Password

  * Solution: using a condition to guarantee the functions to run
  * Example:

```
var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
if (link.includes("email")){...}
if (link.includes("reset")){...}

```
