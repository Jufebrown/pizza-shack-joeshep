`use strict`

const {Router} = require('express')
const router = Router()

// public routes
router.use(require(`./about`))
router.use(require(`./contact`))
// router.use(require(`./login`))
// router.use(require(`./register`))
router.use(require(`./root`))


//TODO: define isAuthenticated
//login guard middleware - sends user home if not registered
// router.use((req, res, next) => {
//   if(req.isAuthenticated()) {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// })

// private routes
// router.use(require('./logout'))
router.use(require('./order'))

module.exports = router
