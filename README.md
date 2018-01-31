# LoginRadius Angular Demo
## How to Run
**Required: NPM installed** (Link [here](https://nodejs.org/en/download/) to download)
1. configure the file ``./app/src/utils/config.json`` to match your credentials.  **You must have every field present in that file.  If not, it could cause unexpected behaviour.**
1. The first time running this application, on terminal or any command prompt run:
   1.  ``` cd to directory ```
   2.  ``` npm install ``` (this would run "Bower install" on the behind as well)
   2.  ``` npm start ```

2. In the following, 
   1.  ``` cd to directory ``` 
   2.  ``` npm start ```



  Now browse to the app at [`localhost:8000`]

## Noted Differences between Plain-HTML/CSS/JS & AngularJS:
* ### Invoking the LoginRadiusV2 Singleton:
  
  
  *  **Solution**: To invoke the LoginRadiusV2 you'll need to use:
  ``` let $scope.LoginObject = window.LoginRadiusV2($scope.commonOptions)``` as shown in *./src/view1.js/renderLoginItem* (or var if you're not in ES6)

* ### Deploying the preset interfaces on the Virtual DOM:
  * **Problem:** Writing the methods correctly, the LR interfaces do not deploy on the DOM properly (It does not deploy at all)

  * **Solution**: Get rid of the ```LoginObject.util.ready``` wrapper.

  * **Example**:
 ``` 
// BEFORE //
LoginObject.util.ready(function() {
    LoginObject.init('registration',registration_options);
}
// AFTER //
$scope.LoginObject.init('registration',registration_options);
  ```
  * This will not cause unexpected errors as long as you have the methods to initialize the LR options in your *componentDidMount* method

* ### Deploying the Social Login Interface on the Virtual DOM:
  * **Problem:** The Social Login Interface references a class on the DOM, the method will not be able to find "classes" on Angular.

  * **Solution:** On the Social Login component, reference it using "className" instead of "class"
  * **Example:**
```
// BEFORE //
<div id="interfacecontainerdiv" class="interfacecontainerdiv"></div>
// AFTER //
<div id="interfacecontainerdiv" className="interfacecontainerdiv"></div>
```


* ### Verify the token when on the Virtual DOM
  * **Problem:** Cannot run the functions when getting the token, such as verifying the email for registration and reset Password

  * **Solution:** using a condition to guarantee the functions to run
  * **Example:**1
```
// AFTER //
var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
if (link.includes("email")){...}
if (link.includes("reset")){...}

```



















# AngularJS-demo
