/**
 * Created by lxy on 16/8/15.
 */
const db = require('../../models/db');
module.exports = {
    info: (req, res) => {
        db.find('personalInfo', {}).then(result => {
            res.json({msg:'ok',result:result.docs[0]});
        }).catch(err => {
            console.log(err);
            res.status(501).json({msg:err})
        })
    }
}