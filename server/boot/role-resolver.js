// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function (app) {
  var Role = app.models.Role;

  Role.registerResolver('$owner', function (role, context, cb) {
    function accept() {
      process.nextTick(function () {
        cb(null, true);
      });
    }

    function reject() {
      process.nextTick(function () {
        cb(null, false);
      });
    }

    // Do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      console.log('Invalid access token!');
      return reject();
    }

    // Validate ownership of content
    if (context.modelName === 'user') {
      context.model.findById(context.modelId, function (err, user) {
        if (err || !user) {
          console.log('User not found: [user-id] ' + context.modelId);
          return reject();
        }

        if (user.id !== userId) {
          console.log('Unauthorized content access attempt detected: [login-user-id] ' + userId + ' [content-owner-user-id] ' + user.id);
          return reject();
        } else {
          return accept();
        }
      });
    } else {
      return accept();
    }
  });
};
