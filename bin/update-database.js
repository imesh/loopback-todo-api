'use strict';

var app = require ('../server/server')
var path = require('path');
var models = require(path.resolve(__dirname, '../server/model-config.json'));
var datasources = require(path.resolve(__dirname, '../server/datasources.json'));

function autoUpdateAll() {
    Object.keys(models).forEach(function (key) {
        if (typeof models[key].dataSource != 'undefined') {
            if (typeof datasources[models[key].dataSource] != 'undefined') {
                app.dataSources[models[key].dataSource].autoupdate(key, function (err) {
                    if (err) throw err;
                    console.log('Model ' + key + ' updated');
                });
            }
        }
    });
}

autoUpdateAll();