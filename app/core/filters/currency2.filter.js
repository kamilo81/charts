angular.
module('core.filter').
filter("currency2", function($filter) {
    return function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
});