const personClass = "Person";
const personUniqueKey = "nid";
//Check person unique nid;
Parse.Cloud.beforeSave(personClass, async (request) => {
    const person = request.object;
    if (person.isNew()) {
        console.log("person.isNew()");
        const query = new Parse.Query(personClass);
        query.equalTo(personUniqueKey, person.get(personUniqueKey));
        const exists = await query.first({ useMasterKey: true })
        if (exists) {
            console.log("Egzistonnnnnnnnnnnnnnn");
            throw new Parse.Error(1001, 'Personi egziston');
        }
    }
});



// E15414075G
