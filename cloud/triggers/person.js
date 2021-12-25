const personClass = "Person";
const personUniqueKey = "nid";
//Check person unique nid;
Parse.Cloud.beforeSave(personClass, (request, response) => {
    const person = request.object;
    console.log(person.isNew());
    if (!person.isNew()) {
        response.success();
    }
    const query = new Parse.Query(personClass);
    query.equalTo(personUniqueKey, person.get(personUniqueKey));
    query.first({
        success: (obj) => {
            if (obj) return Promise.reject("Personi Egziston");
            response.success();
        },
        error: (err) => {
            response.success();
        }
    })
});



// E15414075G




// query.first().then((existingObject) => {
//     if (existingObject) {
//         console.log("Personi Egziston if query.first existingObject")
//         response.error("Personi Egziston");
//     } else {
//         // Pass a flag that this is not an Personi Egziston
//         console.log("Personi Nuk Egziston else query.first existingObject")
//         return Parse.Promise.as(false);
//     }
// }).then((existingObject) => {
//     if (existingObject) {
//         console.log("Personi Egziston if then((existingObject)")
//         // Personi Egziston, stop initial save
//         response.error("Personi Egziston");
//     } else {
//         console.log("Personi Nuk Egziston else then((existingObject)")
//         // New object, let the save go through
//         response.success();
//     }
// })