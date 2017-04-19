define(function () {
    return ['$scope', '$http', function($scope, $http) {
      
 
function resetItem(){
   $scope.employee = {
      name : '',
      email : '',
      dob : '',
      department : '',
      gender : '',
      age : '',
      id : ''
   };              
   $scope.displayForm = '';
   
}
resetItem();
 
 $scope.addItem = function () {
   resetItem();
   $scope.displayForm = true;
 }
 
 
$scope.saveItem = function () {
  var emp = $scope.employee;
      if (emp.id.length == 0){

        /* Calculate Age */
        var myage = 0;
        var now = new Date();
        var birthdate = emp.dob.split("/");
        var born = new Date(birthdate[2], birthdate[1]-1, birthdate[0]);

        var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
        if (now >= birthday) 
          myage = now.getFullYear() - born.getFullYear();
        else
          myage = now.getFullYear() - born.getFullYear() - 1;



            $http.get('/employee/create?name=' + emp.name + '&email=' +  emp.email + '&dob=' +  emp.dob + '&department=' +  emp.department + '&gender=' +  emp.gender + '&age=' +  myage).success(function(data) {
              $scope.items.push(data);
              $scope.displayForm = '';
              removeModal();
            }).
  error(function(data, status, headers, config) {
    alert(data.summary);
  });
          }
          else{
            $http.get('/employee/update/'+ emp.id +'?name=' + emp.name + '&email=' +  emp.email + '&dob=' +  emp.dob + '&department=' +  emp.department + '&gender=' +  emp.gender + '&age=' +  myage).success(function(data) {
              $scope.displayForm = '';
              removeModal();
            }).
  error(function(data, status, headers, config) {
    alert(data.summary);
  });
          }
        };
 
$scope.editItem = function (data) {       
        $scope.employee = data;
        $scope.displayForm = true;
}
 
        $scope.removeItem = function (data) {
          if (confirm('Do you really want to delete?')){
            $http['delete']('/employee/' + data.id).success(function() {
              $scope.items.splice($scope.items.indexOf(data), 1);
            });
          }
        };
 
        $http.get('/employee/find').success(function(data) {
          for (var i = 0; i < data.length; i++) {
            data[i].index = i;
          }
          $scope.items = data;
        });
 
        function removeModal(){
          $('.modal').modal('hide');          
      }
 
    }];
});