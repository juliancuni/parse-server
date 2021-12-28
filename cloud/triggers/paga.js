const entity = "tmp_Paga";
const key1 = "nid";
const key2 = "nipt";
Parse.Cloud.beforeSave(entity, async (request) => {
    const obj = request.object;
    if (obj.isNew()) {
        const queryKey1 = new Parse.Query(entity);
        queryKey1.equalTo(key1, obj.get(key1));
        const queryKey2 = new Parse.Query(entity);
        queryKey2.equalTo(key2, obj.get(key2));
        const query = Parse.Query.and(queryKey1, queryKey2);
        const exists = await query.first({ useMasterKey: true })
        if (exists) {
            throw new Parse.Error(1001, entity + ' egziston');
        }
    }
});