// module.exports.render = (req, res, next) => {
//     res.render('home');
// }

module.exports.postRender = (req, res, next) => {
    res.render('home');
}