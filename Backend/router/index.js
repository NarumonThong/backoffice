const router = require('express').Router();
const { authenticated, isInRoles } = require('../configs/security');

// Account route
// router.use('/account', require('./account'));
// Equipment route
router.use('/equipment', isInRoles(['admin']), authenticated, require('./equipment'));
// Room route
router.use('/room', authenticated, isInRoles(['admin']), require('./room'));
// Booking route
router.use('/booking', authenticated, require('./booking'));



// UserLogin route
router.use('/userlogin', require('./userlogin'));
// MemberListing route
router.use('/memberlisting', authenticated, isInRoles(['admin']), require('./memberlisting'));
// Membercar route
router.use('/membercar', authenticated, isInRoles(['admin']), require('./membercar'));
// MemberRedeem route
router.use('/memberredeem', authenticated, isInRoles(['admin']), require('./memberredeem'));
// ServiceHistory route
router.use('/servicehistory', authenticated, isInRoles(['admin']), require('./servicehistory'));

// Province route
router.use('/province', authenticated, isInRoles(['admin']), require('./province'));
// CarBrand route
router.use('/carbrand', authenticated, isInRoles(['admin']), require('./carbrand'));
// CarModel route
router.use('/carmodel', authenticated, isInRoles(['admin']), require('./carmodel'));
// ServiceBranch route
router.use('/servicebranch', authenticated, isInRoles(['admin']), require('./servicebranch'));


module.exports = router;