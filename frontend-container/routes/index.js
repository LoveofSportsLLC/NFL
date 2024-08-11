// import express from 'express';
// import pkg from 'express-openid-connect';

// const { requiresAuth } = pkg;
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send(
//     req.oidc.isAuthenticated()
// /      ? res.redirect('/dashboard/default')
//       : res.redirect('/'),
//   );
// });

// router.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user, null, 2));
// });

// router.post('/log', (req, res) => {
//   const { fileName, functionName, messages, logCount } = req.body;
//   logger.debug(
//     `[LOG] [${fileName}:${functionName}] ${messages.join(' ')} (Log Count: ${logCount}) [CLIENT]`,
//   );
//   res.sendStatus(200);
// });

// export default router;
