import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Lots } from '../../api/lots.js';
import { CellOrders } from '../../api/cell-orders.js';
import { EquipmentLogs } from '../../api/equipment-logs.js';
import { Counters } from '../../api/counters.js';
import { getNextSequence } from '../../api/counters.js';

import { WaferTypes } from  '../../api/wafer-types.js';
import { Projects } from  '../../api/projects.js';
import { Efficiencies } from  '../../api/efficiencies.js';

import './app-body.html';

import './dashboard.html';
import './home-layout.html';
import './master-layout.html';
import './nav-layout.html';

import './orders-list-layout.html';
import './order-cells-layout.html';
import './cell-order.html';
import './cell-order-detail-layout.html';

import './cell-lots-layout.html';
import './cell-lot.html';
import './new-cell-lot-layout.html';
import './load-materials-layout.html';
import './log-maintenance-layout.html';

import './inspect-cell-lot-layout.html';
import './inspect-cell-lots-layout.html';

// --- Global Helpers ---
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMM DD YYYY, h:mm a');
});

Template.registerHelper('waferTypes', function() {
    return WaferTypes.find({});
});
Template.registerHelper('projects', function() {
    return Projects.find({});
});

Template.registerHelper('efficiencies', function() {
    return Efficiencies.find({});
});

Template.registerHelper('isEmpty', function(str) {
    return (!str || 0 === str.length);
});

Template.registerHelper('isEqual', function(str1, str2) {
    return (str1 === str2);
});

// --- CellLots ---
Template.CellLotsLayout.helpers({
    lots() {
        return Lots.find({});
    },
});

Template.NewCellLotLayout.helpers({
    cellOrders() {
        return CellOrders.find({status: 'OPEN'});
    },
});


Template.NewCellLotLayout.events({
    'submit #new-cell-lot'(event) {
        // Prevent default browser form submit
        //event.preventDefault();

        // Get value from form element
        const target = event.target;

        const cellType = target.cellType.value;
        const order = target.order.value;
        const recipe = target.recipe.value;
        const gridCount = target.gridCount.value;
        const waferCount = target.waferCount.value;
        const meshCount = target.meshCount.value;
        const cellCount = target.cellCount.value;
        const cameraRejects = target.cameraRejects.value;
        const operatorRejects = target.operatorRejects.value;
        const lotComment = target.lotComment.value;


        // Insert a new lot into the collection
        Lots.insert({
            lotID: getNextSequence("cellLotId"),
            cellType,
            order,
            recipe,
            gridCount,
            waferCount,
            meshCount,
            cellCount,
            cameraRejects,
            operatorRejects,
            lotComment,
            by: Meteor.user().username,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.cellType.value = '';
        target.order.value = '';
        target.recipe.value = '';
        //target.lotType.value = '';
        target.gridCount.value = '';
        target.waferCount.value = '';
        target.meshCount.value = '';
        target.cellCount.value = '';
        target.cameraRejects.value = '';
        target.operatorRejects.value = '';
        target.lotComment.value = '';

        FlowRouter.go('/attach/cell-lots');
        return false;    // Prevent screen clear
    },
});

// --- OrderList ---
Template.OrdersListLayout.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('showOpenOrders', true);
});

Template.OrdersListLayout.helpers({
    cellOrders() {
        const instance = Template.instance();
        if (instance.state.get('showOpenOrders')) {
            // If showOpenOrders is checked, filter tasks
            return CellOrders.find({ status: 'OPEN' });
        }
        // Otherwise, return all of the tasks

        return CellOrders.find({});
    },

    openCount() {
        return CellOrders.find({ status: 'OPEN'}).count();
    },
});

Template.OrdersListLayout.events({
    'change .show-open-orders input'(event, instance) {
        instance.state.set('showOpenOrders', event.target.checked);
    },
});

Template.OrderCellsLayout.events({
    // --- Adds new order to the Orders collection
    'submit #order-cells'(event) {
        // Prevent default browser form submit
        //event.preventDefault();

        // Get value from form element
        const target = event.target;

        const orderType = target.orderType.value;
        const cellType = target.cellType.value;
        const project = target.project.value;
        const cellCount = target.cellCount.value;
        const comment = target.comment.value;
        const maxEfficiency = target.maxEfficiency.value;
        const minEfficiency = target.minEfficiency.value;

        // Insert a new lot into the collection
        CellOrders.insert({
            orderID: getNextSequence("orderid"),
            orderType,
            cellType,
            project,
            cellCount,
            maxEfficiency,
            minEfficiency,
            by: Meteor.user().username,
            createdAt: new Date(), // current time
            completedCount: '0',
            status: 'OPEN',
            comment,
        });

        // Clear form

        target.cellCount.value = '';
        target.comment.value = '';

        FlowRouter.go('/orders/orders-list');

        return false;    // Prevent screen clear
    },
});

Template.CellOrderDetailLayout.helpers({
    cellOrder: function() {
        var id = FlowRouter.getParam("orderId");
        var order = CellOrders.findOne({_id: id});
        return order;
    },
});


Template.CellOrderDetailLayout.events({
    'click #cancel-order'(event) {
        var id = FlowRouter.getParam("orderId");
        CellOrders.update({_id: id}, {$set: {status: 'CANCELED'}});
        FlowRouter.go('/orders/orders-list');
    },
});
