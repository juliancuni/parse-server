const personClass = "Person";
const personUniqueKey = "nid";
//Check person unique nid;
Parse.Cloud.beforeSave(personClass, function (request, response) {
    if (!request.object.isNew()) {
        // Let Personi Egziston updates go through
        response.success();
    }
    var query = new Parse.Query(personClass);
    // Add query filters to check for uniqueness
    query.equalTo(personUniqueKey, request.object.get(personUniqueKey));
    query.first().then(function (existingObject) {
        if (existingObject) {
            response.error("Personi Egziston");
        } else {
            // Pass a flag that this is not an Personi Egziston
            return Parse.Promise.as(false);
        }
    }).then(function (existingObject) {
        if (existingObject) {
            // Personi Egziston, stop initial save
            response.error("Personi Egziston");
        } else {
            // New object, let the save go through
            response.success();
        }
    })
});


// E15414075G