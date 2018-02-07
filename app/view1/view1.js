'use strict';

angular.module('myApp', [])
.controller('IndexCtrl', ['$scope', function($scope, myConstant) {
	$scope.config = null;
	$scope.check = 11;
	$scope.LoginObject = null;
	$scope.loginflag1 = false;
	$scope.loginflag2 = true;
	$scope.resetflag = false;
	$scope.ProfileFN = {};
	$scope.ProfileLN = {};

	$scope.showRegistration = false;
	$scope.showResendEmail = false;
	$scope.showEmailLogin = false;
	$scope.showForgotPW = false;
	$scope.showSocialLogin = false;


	$scope.renderLoginItem = function(cb) {
		$scope.commonOptions = {
			apiKey: "258a7ba5-7c34-4ee7-8b86-07a86398511e",
			appName: "internal-vincent",
			forgotPasswordUrl: "http://localhost:8000",
			hashTemplate: true,
			sott: "YmZCNm3tgvB7dJ08RP4vbEXya31ynevZs4+J/rWCGtK6lxA9RDzu58/TsLS/+/+mPd6c5MP0WwDYcbcYseeCcPZsRa4zovpChRYaLEg2ozs=*7db073e5c4867b68e708e04d72bf7fb2",
			templateName: 'loginradiuscustom_tmpl',
			verificationUrl:"http://localhost:8000",
			v2Recaptcha: false,
			invisibleRecaptcha: false

		};
		if($scope.commonOptions.apiKey.substring(0,1) == "<") 
			console.log("Please fill out your apiKey, appName and sott, otherwise it is not working");
	    $scope.LoginObject = window.LoginRadiusV2($scope.commonOptions);
	    
	    if(cb){
	    	cb();
	    }

	};
	$scope.renderLoginItem();
	$scope.handleEventRegister = function(){
			var registration_options = {};
			registration_options.onSuccess = function(response){
				alert("Emailed! Please check your email and go to the link provided");
				console.log(response);
			};
			registration_options.onError = function(errors){
				alert(JSON.stringify(errors));};
		    registration_options.container = 'registration-container';
		    $scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('registration', registration_options);
		    })
		
	}


	$scope.handleEventLogin = function(){
			
			var login_option = {};
			login_option.onSuccess = function(response) {
				//On Success
				console.log(JSON.stringify(response));
				$scope.loginflag1=true;
				$scope.loginflag2=false;
				$scope.ProfileFN = response.Profile.FirstName;
				$scope.ProfileLN = response.Profile.LastName;
				$scope.$apply();
			};
			login_option.onError = function(errors) {
				//On Errors
				alert(JSON.stringify(errors));
			};

			login_option.container = 'login-container';

			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('login', login_option);
		    })

	}

	$scope.handleEventSocialLogin = function(){
			var custom_interface_option = {};
			custom_interface_option.templateName = 'loginradiuscustom_tmpl';
			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.customInterface("interfacecontainerdiv", custom_interface_option);
		    })

			var sl_options = {};

			sl_options.onSuccess = function(response) {
					//On Success
					//Here you get the access token
					console.log(response);
					$scope.loginflag1=true;
					$scope.loginflag2=false;
					$scope.ProfileFN = response.Profile.FirstName;
					$scope.ProfileLN = response.Profile.LastName;
					$scope.$apply();
					};
				sl_options.onError = function(errors) {
					//On Errors
					alert(JSON.stringify(errors));
				};
			sl_options.container = 'sociallogin-container';
			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('socialLogin', sl_options);
		    })

	}

	$scope.handleEventForgotPW = function(){
			var forgotpassword_options = {};

			forgotpassword_options.onSuccess = function(response) {
				// On Success
				alert("Emailed! Please check your email and go to the link provided");
			};
			forgotpassword_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			forgotpassword_options.container = 'forgotpassword-container';
			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('forgotPassword', forgotpassword_options);
		    })
	}




	$scope.handleEventResetPassword = function(){
			var reset_options = {};
			reset_options.container = 'resetpassword-container';
			reset_options.onSuccess = function(response) {
				// On Success
				alert("Change it successfully, Please relogin.");
				location.href="/";

			};
			reset_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('resetPassword', reset_options);
		    })
		}	


	$scope.handleEventChangePassword = function(){
			$scope.hideProfile = true;
			var changepassword_options = {};
			changepassword_options.container = 'changepassword-container';
			changepassword_options.onSuccess = function(response) {
				// On Success
				alert("Change it successfully");

			};
			changepassword_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			
			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init('changePassword', changepassword_options);
		    })
		}




	$scope.handleEventVerifyemail = function(){
			var verifyemail_options = {};
			verifyemail_options.onSuccess = function(response) {
				// On Success
				console.log(JSON.stringify(response));
			};
			verifyemail_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			
			$scope.myVar = true;

			$scope.LoginObject.util.ready(function(){
		    	$scope.LoginObject.init("verifyEmail", verifyemail_options);
		    })
		}


	$scope.runVerify = function(){
		var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
		if (link.includes("email")){
			$scope.handleEventVerifyemail();
		}
	}

	$scope.runVerify();


	$scope.runReset = function(){
		var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
		if (link.includes("reset")){
			$scope.handleEventResetPassword();
			$scope.resetflag = true;
			$scope.loginflag1 = false;
			$scope.loginflag2 = false;
		}
	}
	$scope.logout = function(){
		$scope.LoginObject.api.invalidateToken(window.localStorage['LRTokenKey'],
					 function(response) {
					    alert(JSON.stringify(response));
					}, function(errors) {
					    alert(JSON.stringify(errors));
					})
		location.href = "/";
	}

	$scope.runReset();
	$scope.handleEventRegister();
	$scope.handleEventLogin();
	$scope.handleEventForgotPW();
	$scope.handleEventChangePassword();



	$scope.load = function(num){
		if (num == 1){
			$scope.showRegistration = !$scope.showRegistration;
			$scope.showForgotPW = false;
			$scope.showEmailLogin = false;
			$scope.showResendEmail = false;
			$scope.showSocialLogin = false;
		} else if (num == 3){
			$scope.showEmailLogin = !$scope.showEmailLogin;
			$scope.showForgotPW = false;
			$scope.showResendEmail = false;
			$scope.showRegistration = false;
			$scope.showSocialLogin = false;
		} else if (num == 4){
			$scope.showForgotPW = !$scope.showForgotPW;
			$scope.showEmailLogin = false;
			$scope.showResendEmail = false;
			$scope.showRegistration = false;
			$scope.showSocialLogin = false;

		} else if (num == 5){
			$scope.showSocialLogin = !$scope.showSocialLogin;
			$scope.handleEventSocialLogin();
			$scope.showForgotPW = false;
			$scope.showEmailLogin = false;
			$scope.showResendEmail = false;
			$scope.showRegistration = false;
		}
	}
}]);