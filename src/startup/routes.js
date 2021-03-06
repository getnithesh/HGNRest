
const timeEntry = require('../models/timeentry');
const userProfile = require('../models/userProfile');
const project = require('../models/project');
const team = require('../models/team');
const actionItem = require('../models/actionItem');
const notification = require('../models/notification');


const userProfileRouter = require('../routes/userProfileRouter')(userProfile);
const dashboardRouter = require('../routes/dashboardRouter')();
const timeEntryRouter = require('../routes/timeentryRouter')(timeEntry);
const projectRouter = require('../routes/projectRouter')(project);
const teamRouter = require('../routes/teamRouter')(team);
const actionItemRouter = require('../routes/actionItemRouter')(actionItem);
const notificationRouter = require('../routes/notificationRouter')(notification);
const loginRouter = require('../routes/loginRouter')();
const forgotPwdRouter = require('../routes/forgotPwdRouter')(userProfile);
const forcePwdRouter = require('../routes/forcePwdRouter')(userProfile);

module.exports = function (app) {
  app.use('/api', forgotPwdRouter);
  app.use('/api', loginRouter);
  app.use('/api', forcePwdRouter);
  app.use('/api', projectRouter);
  app.use('/api', userProfileRouter);
  app.use('/api', dashboardRouter);
  app.use('/api', timeEntryRouter);
  app.use('/api', teamRouter);
  app.use('/api', actionItemRouter);
  app.use('/api', notificationRouter);
};
