const entity = "tmp_Subjekti";
const uniqueKey = "nipt";
Parse.Cloud.beforeSave(entity, async (request) => {
    const person = request.object;
    if (person.isNew()) {
        const query = new Parse.Query(entity);
        query.equalTo(uniqueKey, person.get(uniqueKey));
        const exists = await query.first({ useMasterKey: true })
        if (exists) {
            // throw new Parse.Error(1001, entity + ' egziston');
            return exists;
        }
    }
});