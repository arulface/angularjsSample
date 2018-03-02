//Run the application in strict mode
'use strict'

var myApp = angular.module("myApp", []);

//Controller defination
myApp.controller("todoListCtrl", function($scope) {
	//declare the arraylist
	$scope.itemList = [];

	//on click of Add this function would be invoked and pushing the values into array
	$scope.addRow = function(){	
		$scope.itemList.push({ 'itemName':$scope.itemName});
		$scope.itemName='';
	};

	// get checked item 
	$scope.model = {
			deleteitemList : []
	}
	
	//check all
	$scope.isSelectAll = function(){
		  $scope.model.deleteitemList = [];
		  if($scope.master){
			  $scope.master = true;
			  for(var i=0;i<$scope.itemList.length;i++){
				  $scope.model.deleteitemList.push($scope.itemList[i].itemName);  
			  }
		  }
		  else{
			  $scope.master = false;
		  }
		  
		  angular.forEach($scope.itemList, function (item) {
			  item.selected = $scope.master;
		  });
	}

	//uncheck all    
	$scope.isLabelChecked = function()
	{
		  var itemName = this.item.itemName;
		  if(this.item.selected){
			   $scope.model.deleteitemList.push(itemName);
			   if($scope.model.deleteitemList.length == $scope.itemList.length )
				{
				   $scope.master = true;
				}
		  }else{
			  $scope.master = false;
			  var index = $scope.model.deleteitemList.indexOf(itemName);
			  $scope.model.deleteitemList.splice(index, 1);
		 }
	}
	
	//declaration
	$scope.deleteindexList =[];
	
	//remove the objects which are selected
	$scope.removeSelectedRows = function(){
		var count = 0;
		var index;
			for( var i = 0; i < $scope.model.deleteitemList.length; i++ ) {
				for( var j = 0; j < $scope.itemList.length; j++ ) {
					//identify the index to remove the selected objects
					if( $scope.model.deleteitemList[i] === $scope.itemList[j].itemName ) {
						index = j;
						$scope.deleteindexList.push(index);
						count++;
						break;
					}
				}
			}
		// Removing the objects from the  main list.
		 for (var i = count - 1; i >= 0; i--){	
			$scope.itemList.splice($scope.deleteindexList[i], 1);
		}
		$scope.deleteindexList=[];
		$scope.model.deleteitemList=[];
	}

});
