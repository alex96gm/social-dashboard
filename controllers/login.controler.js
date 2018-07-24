
module.exports.render = (req, res, next) => {
    res.render('index', { title: 'Express' });
}