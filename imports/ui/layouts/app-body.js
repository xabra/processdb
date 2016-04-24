import { Template } from 'meteor/templating';

import { Lots } from '../../api/lots.js';
import { CellOrders } from '../../api/cell-orders.js';
import { EquipmentLogs } from '../../api/equipment-logs.js';

import './app-body.html';

import './dashboard.html';
import './home-layout.html';
import './master-layout.html';
import './nav-layout.html';

import './order-cells-layout.html';
import './order-strings-layout.html';
import './order-modules-layout.html';
import './order-list-layout.html';

import './cell-lots-layout.html';
import './cell-lot.html';
import './new-cell-lot-layout.html';
import './load-materials-layout.html';
import './log-maintenance-layout.html';

import './inspect-cell-lot-layout.html';
import './inspect-cell-lots-layout.html';

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMM DD YYYY, h:mm a');
});

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



Template.OrderCellsLayout.events({
    'submit .order-cells'(event) {
        // Prevent default browser form submit
        //event.preventDefault();

        // Get value from form element
        const target = event.target;

        const cellType = target.cellType.value;
        const project = target.project.value;
        const cellCount = target.cellCount.value;

        // Insert a new lot into the collection
        CellOrders.insert({
            cellType,
            project,
            cellCount,
            by: Meteor.user().username,
            createdAt: new Date(), // current time
        });

        // Clear form

        target.cellType.value = '';
        target.project.value = '';
        target.cellCount.value = '';

        return false;    // Prevent screen clear
    },
});
