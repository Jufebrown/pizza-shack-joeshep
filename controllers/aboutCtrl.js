`use strict`

module.exports.show = (req, res, next) => {
  res.render('about', {page: 'About'})
}
