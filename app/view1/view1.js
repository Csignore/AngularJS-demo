'use strict';

angular.module('myApp', ['ngRoute'])
.controller('IndexCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.config = null;
	$scope.check = 11;
	$scope.LoginObject = null;
	$scope.loginflag1 = false;
	$scope.loginflag2 = true;
	$scope.resetflag = false;
	$scope.ProfileObject = {};
	$scope.mapping = {
		standard:[
			"uid"]
	};

	$scope.showRegistration = false;
	$scope.showResendEmail = false;
	$scope.showEmailLogin = false;
	$scope.showForgotPW = false;
	$scope.showSocialLogin = false;

	var request = {
		method: 'get',
		url: '../utils/config.json',
		dataType: 'json',
		contentType: 'application/json'
	}

	$scope.renderLoginItem = function(cb) {
		$http(request)
			.success(function(jsonData){
			$scope.config = jsonData;
			$scope.commonOptions = {
				apiKey: $scope.config.apiKey,
			    appName: $scope.config.appName,
			    forgotPasswordUrl: $scope.config.forgotPasswordUrl,
			    hashTemplate: true,
			    sott: $scope.config.sott,
			    templateName: 'loginradiuscustom_tmpl',
			    verificationUrl: $scope.config.verificationUrl,
			    v2RecaptchaSiteKey: $scope.config.v2RecaptchaSiteKey,
			    v2Recaptcha: false,
			    invisibleRecaptcha: false
			}
		    $scope.LoginObject = window.LoginRadiusV2($scope.commonOptions);
		    
		    if(cb){
		    	cb();
		    }

			})
	};

	$scope.handleEventRegister = function(){
		$scope.renderLoginItem(function(){
			var registration_options = {};
			registration_options.onSuccess = function(response){
				alert("Emailed! Please check your email and go to the link provided");
				console.log(response);
			};
			registration_options.onError = function(errors){
				alert(JSON.stringify(errors));};
		    registration_options.container = 'registration-container';

		    $scope.LoginObject.init('registration', registration_options);
		});
	}


	$scope.handleEventLogin = function(){
		$scope.renderLoginItem(function(){
			
			var login_option = {};
			login_option.onSuccess = function(response) {
				//On Success
				console.log(JSON.stringify(response));
				$scope.loginflag1=true;
				$scope.loginflag2=false;
				$scope.ProfileObject = response;
				$scope.$apply();

				$scope.LoginObject.identify("ga", response.Profile, $scope.mapping);
			};
			login_option.onError = function(errors) {
				//On Errors
				alert(JSON.stringify(errors));
			};
			//$scope.LoginObject.track('ga');

			login_option.container = 'login-container';

			$scope.LoginObject.init('login', login_option)


		});
	}

	$scope.handleEventSocialLogin = function(){
		$scope.renderLoginItem(function(){
			var custom_interface_option = {};
			custom_interface_option.templateName = 'loginradiuscustom_tmpl';
			$scope.LoginObject.customInterface("interfacecontainerdiv", custom_interface_option);
					

			var sl_options = {};

			sl_options.onSuccess = function(response) {
					//On Success
					//Here you get the access token
					console.log(response);
					$scope.loginflag1=true;
					$scope.loginflag2=false;
					$scope.ProfileObject = response;
					$scope.$apply();
					};
				sl_options.onError = function(errors) {
					//On Errors
					alert(JSON.stringify(errors));
				};
			sl_options.container = 'sociallogin-container';
			$scope.LoginObject.init('socialLogin', sl_options)

		});
	}

	$scope.handleEventForgotPW = function(){
		$scope.renderLoginItem(function(){
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
			$scope.LoginObject.init('forgotPassword', forgotpassword_options)
		})
	}


	$scope.handleEventResendEmail = function(){
		$scope.renderLoginItem(function(){
			var resendemailverification_options = {};

			resendemailverification_options.onSuccess = function(response) {
				// On Success
				alert("Emailed! Please check your email and go to the link provided");
			};
			resendemailverification_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			resendemailverification_options.container = 'resendemailverification-container';
			$scope.LoginObject.init('resendVerificationEmail', resendemailverification_options)
		})
	}



	$scope.handleEventResetPassword = function(){
		$scope.renderLoginItem(function(){
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
			$scope.LoginObject.init('resetPassword', reset_options);
		})
		}	


	$scope.handleEventChangePassword = function(){
		$scope.renderLoginItem(function(){
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
			$scope.LoginObject.init('changePassword', changepassword_options);
		})}	




	$scope.handleEventVerifyemail = function(){
		$scope.renderLoginItem(function(){
			var verifyemail_options = {};
			verifyemail_options.onSuccess = function(response) {
				// On Success
				console.log(JSON.stringify(response));
			};
			verifyemail_options.onError = function(errors) {
				// On Errors
				alert(JSON.stringify(errors));
			}
			$scope.LoginObject.init("verifyEmail", verifyemail_options);
			$scope.myVar = true;
		})}	


	$scope.runVerify = function(){
		$scope.renderLoginItem(function(){
		var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
		if (link.includes("email")){
			$scope.handleEventVerifyemail();
		}
	})}

	$scope.runVerify();


	$scope.runReset = function(){
		$scope.renderLoginItem(function(){
		var link = JSON.stringify($scope.LoginObject.util.parseQueryString(window.location.href));
		if (link.includes("reset")){
			$scope.handleEventResetPassword();
			$scope.resetflag = true;
			$scope.loginflag1 = false;
			$scope.loginflag2 = false;
		}
	})}
	$scope.logout = function(){
		location.href = "/";
	}

	$scope.runReset();
	$scope.handleEventRegister();
	$scope.handleEventLogin();
	$scope.handleEventForgotPW();
	$scope.handleEventResendEmail();
	$scope.handleEventChangePassword();



	$scope.load = function(num){
		if (num == 1){
			$scope.showRegistration = !$scope.showRegistration;
			$scope.showForgotPW = false;
			$scope.showEmailLogin = false;
			$scope.showResendEmail = false;
			$scope.showSocialLogin = false;
		} else if (num == 2){
			$scope.showResendEmail = !$scope.showResendEmail;
			$scope.showForgotPW = false;
			$scope.showEmailLogin = false;
			$scope.showRegistration = false;
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