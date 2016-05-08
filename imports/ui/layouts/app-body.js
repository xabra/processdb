import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Lots } from '../../api/lots.js';
import { CellOrders } from '../../api/cell-orders.js';
import { EquipmentLogs } from '../../api/equipment-logs.js';
import { Counters } from '../../api/counters.js';
import { getNextSequence } from '../../api/counters.js';

import { WaferTypes } from  '../../api/wafer-types.js';

import './app-body.html';

import './dashboard.html';
import './home-layout.html';
import './master-layout.html';
import './nav-layout.html';

import './order-list-layout.html';
import './cell-order.html';

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


// --- CellLots ---
Template.CellLotsLayout.helpers({
    lots() {
        return Lots.find({});
    },
});

Template.NewCellLotLayout.events({
    'submit .new-lot'(event) {
        // Prevent default browser form submit
        //event.preventDefault();

        // Get value from form element
        const target = event.target;

        const lotID = target.lotID.value;
        const cellType = target.cellType.value;
        const order = target.order.value;
        const recipe = target.recipe.value;
        //const lotType = target.lotType.value;
        const gridCount = target.gridCount.value;
        const waferCount = target.waferCount.value;
        const meshCount = target.meshCount.value;
        const cellCount = target.cellCount.value;
        const cameraRejects = target.cameraRejects.value;
        const operatorRejects = target.operatorRejects.value;
        const lotComment = target.lotComment.value;


        // Insert a new lot into the collection
        Lots.insert({
            lotID,
            cellType,
            order,
            recipe,
            //lotType,
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

        target.lotID.value = '';
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


        return false;    // Prevent screen clear
    },
});

// --- OrderList ---
Template.OrderListLayout.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('showOpenOrders', true);
});

Template.OrderListLayout.helpers({
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

    debugWaferTypes(){
        for(i=0;i<3;i++){
            console.log("Hi", waferTypes()[i].type);
        }
        return 0;
    },
});

Template.OrderListLayout.events({
    'change .show-open-orders input'(event, instance) {
        instance.state.set('showOpenOrders', event.target.checked);
    },
    // --- Adds new order to the Orders collection
    'submit .order-cells'(event) {
        // Prevent default browser form submit
        //event.preventDefault();

        // Get value from form element
        const target = event.target;

        const cellType = target.cellType.value;
        const project = target.project.value;
        const cellCount = target.cellCount.value;
        const comment = target.comment.value;

        // Insert a new lot into the collection
        CellOrders.insert({
            orderID: getNextSequence("orderid"),
            cellType,
            project,
            cellCount,
            by: Meteor.user().username,
            createdAt: new Date(), // current time
            completedCount: '0',
            status: 'OPEN',
            comment,
        });

        // Clear form

        target.cellType.value = '';
        target.project.value = '';
        target.cellCount.value = '';
        target.comment.value = '';
        return false;    // Prevent screen clear
    },
});
