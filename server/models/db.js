/**
 * Created by lxy on 16/8/11.
 */
const MongoClient = require('mongodb').MongoClient;
const DB_URL = require('../config/setting.js').DB_URL;
const co = require('co');
//连接数据库
const _connectDB = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, (err, db) => {
            if (err) {
                reject(err);
                db.close();
                return;
            }
            resolve(db);
        })
    })
};
// 插入
const insertMany = (db, collectionName, json = []) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertMany(json, (err, result) => {
            if (err) {
                reject(err);
                db.close();
                return;
            }
            resolve(db);
        })
    })
};
const insert = (collectionName, json) => {
    return co(function* () {
        let db = yield _connectDB();
        let result = yield insertMany(db, collectionName, json);
        db.close();
        return result;
    });
};


//查询
const findMethod = (db, collectionName, json = {}, pageInfo = {limit: 0, skip: 0, page: 0}) => {
    return new Promise((resolve, reject) => {
        let collection = db.collection(collectionName);
        let cursor = collection.find(json).limit(pageInfo.limit).skip(pageInfo.limit * pageInfo.page);
        let docs = [];
        cursor.forEach(doc => {
            docs.push(doc);
        }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            cursor.count(false, (err, count) => {
                resolve({docs, count: parseInt(count)});
            })
        });
    })
}
const find = (collectionName, json, pageInfo) => {
    return co(function* () {
        let db = yield _connectDB();
        let result = yield findMethod(db,collectionName,json,pageInfo);
        db.close();
        return result;
    })
}

// 修改
const updateMany = (db, collectionName, json, newJson) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateMany(json, newJson).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
}
const update = (colloctionName,json,newJson) => {
    return co(function* () {
        let db = yield _connectDB();
        let result = yield updateMany(db,colloctionName,json,newJson);
        db.close();
        return result;
    });
}
//删除
const deleteMany = (db, collectionName, json) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteMany(json).then((result) => {
            resolve(result);
        }, (err) => {
            console.log(1);
            reject(err);
        });
    });
}

const remove = (collectionName, json) => {
    return co(function* () {
        let db = yield _connectDB();
        let result = deleteMany(db, collectionName, json);
        db.close();
        return result;
    });
}


// 连接ids 获取自增id
const ids = (db,collectionName) => {
    return new Promise((resolve,reject) => {
        db.collection(collectionName).findOneAndUpdate({name:'user'},{$inc:{id:1}},(err,r) => {
            if(err) {
                reject(err);
                db.close();
                return;
            }
            resolve(r);
        });
    })
}
const getId = (collectionName) => {
    return co(function* () {
        let db = yield _connectDB();
        let result = yield ids(db,collectionName);
        db.close();
        return result;
    });
}

module.exports = {
    insert,
    find,
    remove,
    update,
    getId
};
