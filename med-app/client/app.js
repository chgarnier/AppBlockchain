// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	$("#success_ledger").hide();
	$("#failed_ledger").hide();	
	$("#success_del").hide();
	$("#error_del").hide();	
	$scope.queryAllMeds = function(){

		appFactory.queryAllMeds(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_med = array;
		});
	}

	$scope.getMedHistory = function(){
		var id_history = $scope.med_history_id;
		
		appFactory.getMedHistory(id_history, function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				data[i].Record.TxId = data[i].TxId;
				array.push(data[i].Record);
			}

			$scope.query_med_history = array;
		});
	}

	$scope.queryMed = function(){

		var id = $scope.med_id;

		appFactory.queryMed(id, function(data){
			$scope.query_med = data;

			if ($scope.query_med == "Could not locate med"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordMed = function(){

		appFactory.recordMed($scope.med, function(data){
			$scope.create_med = data;
			if ($scope.create_med =="Transaction failed to be committed to the ledger"){
				$("#success_ledger").hide();
				$("#failed_ledger").show();				
			} else {
				$("#success_ledger").show();
				$("#failed_ledger").hide();	
			}
		});
	}

	$scope.changeMedOwner = function(){

		appFactory.changeMedOwner($scope.medowner, function(data){
			$scope.change_holder = data;
			if ($scope.change_holder == "Error: no med catch found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}
	$scope.deleteMed = function(){
		var id_del = $scope.med_id_del;

		appFactory.deleteMed(id_del, function(data){
			$scope.del_med = data;
			if ($scope.del_med == "Error: can not delete drug"){
				$("#error_del").show();
				$("#success_del").hide();
			} else{
				$("#success_del").show();
				$("#error_del").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllMeds = function(callback){

    	$http.get('/get_all_med/').success(function(output){
			callback(output)
		});
	}


    factory.getMedHistory = function(id_history, callback){

    	$http.get('/get_med_history/'+id_history).success(function(output){
			callback(output)
		});
	}


	factory.queryMed = function(id, callback){
    	$http.get('/get_med/'+id).success(function(output){
			callback(output)
		});
	}

	factory.recordMed = function(data, callback){


		var med = data.dataMatrix + "-" + data.designation + "-" + data.laboratory + "-" + data.owner ;

    	$http.get('/add_med/'+med).success(function(output){
			callback(output)
		});

	}
	factory.changeMedOwner = function(data, callback){

		var medowner= data.dataMatrix + "-" + data.owner;

    	$http.get('/change_med_owner/'+medowner).success(function(output){
			callback(output)
		});
	}
	factory.deleteMed = function(id_del, callback){
    	$http.get('/delete_med/'+id_del).success(function(output){
			callback(output)
		});
	}

	return factory;
});


