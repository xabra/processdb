import { Mongo } from 'meteor/mongo';

export const Counters = new Mongo.Collection('Counters');

export function getNextSequence(name) {
    var ndocs = Counters.update(
        {_id: name},
        {$inc: {seq: 1}},
        {multi: false},
        {upsert: false}
    );

    var doc = Counters.findOne({_id: name});

    return doc.seq;
}
