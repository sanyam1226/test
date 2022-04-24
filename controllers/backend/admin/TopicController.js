const topic = require('../../../models/Topic');
const layout = 'backend/layouts/layout';
const ejs = require('ejs');

module.exports.Index = async function (req, res, next) {
    const topicType = await topic.getByType('topic');
    res.render('backend/admin/topic/index', { layout, pageTitle: 'topic', topicType });
};

module.exports.List = function (req, res, next) {
    topic.TopicList(req, function (data) {
        res.send(data);
    });
};

module.exports.Add = async function (req, res, next) {
    const topicType = await topic.getByType('topic');
    const html = await ejs.renderFile('./views/backend/admin/topic/add.ejs', { topicType });
    res.send({ status: 1, html });
};

// module.exports.upserttopic = async function (req, res, next) {
//     const topicType = await topic.getByType('topic');
//     let data = {}
//     if (!topicType) {
//         data = await topic.store(req, res);
//     } else {
//         data = await topic.update(req, 'topic');
//     }
//     res.send(data);
// };

module.exports.edit = async function (req, res, next) {
    const data = await topic.getById(req.body.id);
    const html = await ejs.renderFile('./views/backend/admin/topic/edit.ejs',{data});
    res.send({status:1,html});
};

module.exports.update = function (req, res, next) {
    topic.update(req,res, function(data){
        res.send(data);
    });
};

module.exports.Store = function (req, res, next) {
    topic.Store(req, function (data) {
        res.send(data);
    });
};