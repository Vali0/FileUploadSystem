var httpRequester = (function(){
  var makeHttpRequest = function(url, type, data){
      var deferred = $.Deferred();
      $.ajax({
          url: url,
          type: type,
          contentType: 'application/json',
          data: data,
          success: function(resultData){
              deferred.resolve(resultData);
          },
          error: function(error){
              deferred.reject(error);
          }
      });

      return deferred.promise;
  }

  var putJSON = function(url, type, data){
      return makeHttpRequest(url, type, data);
  }

  return {
      put: putJSON
  }
}())