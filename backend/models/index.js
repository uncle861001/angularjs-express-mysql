/**
 * 
  Model Properties:  The supported types are:
    
    text: A text string;
    number: A floating point number. You can specify size: 2|4|8.
    integer: An integer. You can specify size: 2|4|8.
    boolean: A true/false value;
    date: A date object. You can specify time: true
    enum: A value from a list of possible values;
    object: A JSON object;
    point: A N-dimensional point (not generally supported);
    binary: Binary data.
    
  Each type can have additional options:
    
    All types support 'required' (boolean), 'unique' (boolean) and 'defaultValue' (text). 
    Text type also supports maximum 'size' of string (number) and 'big' (boolean - for very long strings). 
    Number type is a float, 'size' (number - byte size) and 'unsigned' (boolean). 
    Date type supports 'time' (boolean).

    Model Hooks: Currently the following events are supported:
    
    afterLoad : (no parameters) Right after loading and preparing an instance to be used;
    afterAutoFetch : (no parameters) Right after auto-fetching associations (if any), it will trigger regardless of having associations or not;
    beforeSave : (no parameters) Right before trying to save;
    afterSave : (bool success) Right after saving;
    beforeCreate : (no parameters) Right before trying to save a new instance (prior to beforeSave);
    afterCreate : (bool success) Right after saving a new instance;
    beforeRemove : (no parameters) Right before trying to remove an instance;
    afterRemove : (bool success) Right after removing an instance;
    beforeValidation : (no parameters) Before all validations and prior to beforeCreate and beforeSave;
 */

var orm = require('orm');
var settings = require('../config/settings');

var connection = null;

function setup(db, cb) {
    require('./user')(orm, db);
    require('./customer')(orm, db);
    require('./address')(orm, db);

    return cb(null, db);
}

module.exports = function(cb) {
    if (connection) return cb(null, connection);

    orm.connect(settings.database, function(err, db) {
        if (err) return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};