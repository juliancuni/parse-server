const personClass = "Person";
const personUniqueKey = "nid";
//Check person unique nid;
Parse.Cloud.beforeSave(personClass, (request, response) => {
    if (!request.object.isNew()) {
        // Let Personi Egziston updates go through
        console.log("isNotNew")
        response.success();
    }
    var query = new Parse.Query(personClass);
    // Add query filters to check for uniqueness
    query.equalTo(personUniqueKey, request.object.get(personUniqueKey));
    query.first().then((existingObject) => {
        if (existingObject) {
            console.log("Personi Egziston if query.first existingObject")
            response.error("Personi Egziston");
        } else {
            // Pass a flag that this is not an Personi Egziston
            console.log("Personi Nuk Egziston else query.first existingObject")
            return Parse.Promise.as(false);
        }
    }).then((existingObject) => {
        if (existingObject) {
            console.log("Personi Egziston if then((existingObject)")
            // Personi Egziston, stop initial save
            response.error("Personi Egziston");
        } else {
            console.log("Personi Nuk Egziston else then((existingObject)")
            // New object, let the save go through
            response.success();
        }
    })
});


// E15414075G