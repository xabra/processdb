import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/app-body.js';
// import '../../ui/pages/body.js';
// import '../../ui/pages/root-redirector.js';
// import '../../ui/pages/lists-show-page.js';
// import '../../ui/pages/app-not-found.js';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js';

// ----- Below here are the route definitions -----

FlowRouter.route('/', {
  name: 'Home',
  action(params, queryParams) {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/orders/cells', {
  name: 'OrderCells',
  action(params, queryParams) {
    BlazeLayout.render('OrderCellsLayout');
  }
});
