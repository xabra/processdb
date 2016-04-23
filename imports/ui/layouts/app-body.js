import { Template } from 'meteor/templating';

import { Lots } from '../../api/lots.js';

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

Template.body.helpers({
  lots() {
    return Lots.find({});
  },
});

Template.body.events({
  'submit .new-lot'(event) {
    // Prevent default browser form submit
    //event.preventDefault();

    // Get value from form element
    const target = event.target;
    const lotID = target.lotID.value;
    const count = target.count.value;
    const cellType = target.cellType.value;

    // Insert a new lot into the collection
    Lots.insert({
      lotID,
      count,
      cellType,
      createdAt: new Date(), // current time
    });

    // Clear form

    target. lotID.value = '';
    target.count.value = '';
    target.cellType.value = '';

    return false;    // Prevent screen clear
  },
});
