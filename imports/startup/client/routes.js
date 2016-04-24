import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/app-body.js';
// import '../../ui/pages/root-redirector.js';
// import '../../ui/pages/lists-show-page.js';
// import '../../ui/pages/app-not-found.js';

// Import to override accounts templates
// import '../../ui/accounts/accounts-templates.js';




// ----- Below here are the route definitions -----

//--- HOME
FlowRouter.route('/', {
  name: 'Home',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "HomeLayout"});
  }
});

//--- DASHBOARD
FlowRouter.route('/dashboard', {
  name: 'Dashboard',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "Dashboard"});
  }
});

// --- ORDERS
FlowRouter.route('/order/cells', {
  name: 'OrderCells',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "OrderCellsLayout"});
  }
});
FlowRouter.route('/order/strings', {
  name: 'OrderStrings',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "OrderStringsLayout"});
  }
});
FlowRouter.route('/order/modules', {
  name: 'OrderModules',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "OrderModulesLayout"});
  }
});
FlowRouter.route('/order/orders', {
  name: 'OrderList',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "OrderListLayout"});
  }
});

//--- ATTACH
FlowRouter.route('/attach/new-cell-lot', {
  name: 'New-Cell-Lots',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "NewCellLotLayout"});
  }
});
FlowRouter.route('/attach/load-materials', {
  name: 'LoadMaterials',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "LoadMaterialsLayout"});
  }
});
FlowRouter.route('/attach/log-maintenance', {
  name: 'LogMaintenance',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "LogMaintenanceLayout"});
  }
});
FlowRouter.route('/attach/cell-lots', {
  name: 'Cell-Lots',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "CellLotsLayout"});
  }
});

//--- INSPECT
FlowRouter.route('/inspect/cell-lot', {
  name: 'InspectCellLot',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "InspectCellLotLayout"});
  }
});
FlowRouter.route('/inspect/cell-lots', {
  name: 'InspectCellLots',
  action(params, queryParams) {
    BlazeLayout.render('MasterLayout', {nav: "NavLayout", main: "InspectCellLotsLayout"});
  }
});
