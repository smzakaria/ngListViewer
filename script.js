// Code goes here

(function() {
  var app = angular.module("listviewer", []);

  var MainController = function($scope, $filter) {
    var lib = {

      categories: [
        'Performance', 'Investments', 'Operations'
      ],
      applets: [{
        name: 'Performance Snapshot',
        categories: ['Performance']
      }, {
        name: 'Commitment Widget',
        categories: ['Investments']
      }, {
        name: 'CMS',
        categories: ['Investments', 'Performance']
      }]
    };

    


    var data = [];
    var catParam = lib.categories;

    $scope.showApplet = function(applet) {
      $scope.categorySelected = true;
      $scope.activeRecord = applet;
      $scope.applets = $filter('filter')(lib.applets, {
        categories: applet
      });
    };

    loadCategories(catParam);

    function loadCategories(catParam) {
      catParam.forEach(function(value) {

        $scope.count = 0;
        lib.applets.forEach(function(value1) {
          value1.categories.forEach(function(value2) {
            if (value == value2) {
              $scope.count += 1;
            }
          });
        });

        data.push({
          "category": value,
          "count": $scope.count
        });
      });
      $scope.data = data;
    }

    $scope.change = function(applet) {
      var compiledData = [];
      $scope.data1 = [];
      $scope.data1 = $filter('filter')(lib.applets, {
        name: applet
      });
      $scope.data1.forEach(function(item) {
        item.categories.forEach(function(valCategory) {
          var temp = $filter('filter')(compiledData, {
            category: valCategory
          });
          console.log(temp);
          if (temp.length === 0) {

            compiledData.push({
              "category": valCategory,
              "count": 1
            });
          } else {
            var findData = compiledData.findIndex(x => x.category == valCategory);
            if (findData >= 0) {
              compiledData[findData].count += 1;
              console.log(compiledData[findData].category);
            } else {
              compiledData.push({
                "category": valCategory,
                "count": 0
              });
            }
          }

        });
      });
      $scope.fiteredMenuData = compiledData;
    };
  };

  app.controller("MainController", ["$scope", "$filter", MainController]);

})();


/*

 // need to replace with filter?
    $scope.reload = function() {
      var data = [];
      var catParam = $filter('filter')($scope.applets, {
        name: $scope.filterCategory
      });
      catParam.forEach(function(value1) {
        value1.categories.forEach(function(value2) {
          if (true) {
            data.push(value2);
          }
        });
      });
      $scope.message = data;
      loadCategories(data);
    };*/


/*
  app.filter('reverse', function() {
    return function(input, scope) {
      return input;
      
      input = input || '';
      var out = '';
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out;
      }
      // conditional based on optional argument
      if (uppercase) {
        out = out.toUpperCase();
      }
      return out;
      
    };
  })
  
*/

/*
 //this was working to pull count in menu
   loadCategories(catParam);

    function loadCategories(catParam) {
      catParam.forEach(function(value) {

        $scope.count = 0;
        lib.applets.forEach(function(value1) {
          value1.categories.forEach(function(value2) {
            if (value == value2) {
              $scope.count += 1;
            }
          });
        });

        data.push({
          "name": value,
          "count": $scope.count
        });
      });
      $scope.data = data;
    }
*/