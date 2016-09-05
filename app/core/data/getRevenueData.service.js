angular.
module('core.data').
constant("revenueDataUrl", "app/core/data/data.json").
factory('revenueData',['$resource','revenueDataUrl', function ($resource,revenueDataUrl) {
    return $resource(revenueDataUrl, {},{
        query :{
            isArray: false
        }
    });
}]);