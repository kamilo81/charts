angular.
module('core.printValue').
directive('printValue', function ($interval) {
    return {
        restrict: 'E',
        templateUrl: 'app/core/printValue/printValue.template.html',
        link: function (scope, element) {
            scope.filter = element.attr('filter');
            scope.$watch(function() {
                return element.attr('total');
            }, function(newValue){
                scope.value = 0;
                var step = 0;
                if(newValue/100 < 10) {
                    step = 1;
                }else {
                    step = 100;
                }
                var int =  $interval(function() {
                    if(newValue <=  scope.value) {
                        $interval.cancel(int);
                        int = undefined;
                        scope.value =newValue;
                    }else {
                        scope.value =  scope.value + step;
                    }
                }, 1);
            });
        }
    }
});