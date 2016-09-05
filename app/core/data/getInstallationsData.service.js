angular.
module('core.data').
constant("installationsDataUrl", "app/core/data/data.json").
factory('installationsData',['$resource','installationsDataUrl', function ($resource,installationsDataUrl) {
    return $resource(installationsDataUrl, {},{
        query :{
            isArray: false
        }
    });
}]);