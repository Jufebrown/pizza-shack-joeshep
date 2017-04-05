`use strict`

module.exports.show = (req, res, next) => {
  res.render('contact', {page: 'Contact'})
}
