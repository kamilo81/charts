angular.
module('chart')
.controller('DataBarCtrl', ['$scope', 'installationsData', function ($scope ,installationsData) {
    $scope.labels = [''];
    $scope.data = [
        [0]
    ];
    $scope.series = [''];

    $scope.colors = [
        { // blue
            backgroundColor: 'rgba(21, 160, 200, 1)',
            borderColor: 'rgba(21, 160, 200, 1)',
            borderWidth: 1
        },
        { // green
            backgroundColor: 'rgba(0, 160, 0, 1)',
            borderColor: 'rgba(0, 160, 0, 1)',
            borderWidth: 1
        },
        { // red
            backgroundColor: 'rgba(255, 61, 61, 1)',
            borderColor: 'rgba(255, 61, 61, 1)',
            borderWidth: 1
        }


    ];
    $scope.options = {
        legend: {
            display: true,
            position: 'bottom'

        },
        scales: {
            xAxes: [{
                gridLines : {
                    display : false
                }
            }],
            yAxes: [{
                type: 'linear',
                ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 5
                }
            }]
        },
        line: {
            borderWidth: 100
        }
    };

    $scope.loaded = 0;
    $scope.loadData = function () {
        $scope.loaded = 1;
        installationsData.query().$promise.then(function(data){
            $scope.labels = [];
            $scope.series =[];
            $scope.data = [];
            var dataOrigin = [];
            var dataSet = [];
            angular.forEach(data.result, function (v,k) {
                $scope.labels.push(k);
                angular.forEach(v, function (vv, kk) {
                    if($scope.series.indexOf(kk) === -1) {
                        $scope.series.push(kk);
                    }
                    if(!dataSet[kk]) {
                        dataSet[kk] = [vv.installation];
                    }else {
                        dataSet[kk].push(vv.installation);
                    }
                });
            });
            angular.forEach($scope.series, function (v) {
                dataOrigin.push(dataSet[v]);
                dataSet[v].reverse();
                dataSet[v]= dataSet[v].slice(0,5);
                dataSet[v].reverse();

                $scope.data.push(dataSet[v]);
            });
            $scope.labels.reverse();
            $scope.labels = $scope.labels.slice(0,5);
            $scope.labels.reverse();

            var flattened = dataOrigin.reduce(function(a, b) {
                return a.concat(b);
            });
            $scope.total = flattened.reduce(function (a, b) {
                return a + b;
            });

            $scope.loaded = 0;
        },function (e) {
            alert('Error');
            console.log(e);
            $scope.loaded = 0;
        });
    }
}]);