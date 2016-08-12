/**
 * Created by lxy on 16/8/11.
 */
const path = require('path');
exports.showIndex = (req,res) => {
    res.sendFile(path.resolve(__dirname,'../dist/public/index.html'));
}