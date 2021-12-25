const personClass = "Person";
const personUniqueKey = "nid";
//Check person unique nid;
Parse.Cloud.beforeSave(personClass, function (request, response) {
  var myObject = request.object;

  if (myObject.isNew()) {
    var query = new Parse.Query(personClass);
    query.equalTo(personUniqueKey, myObject.get(personUniqueKey));
    query.count({
      success: function (number) {
        if (number > 0) {
          response.error("Personi egziston");
        } else {
          response.success();
        }
      },
      error: function (error) {
        response.success();
      }
    })
  } else {
    response.success();
  }
});