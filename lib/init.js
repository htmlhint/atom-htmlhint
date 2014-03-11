/*global atom, require, module*/

var linter = require('./linter');

module.exports = {
    activate: function () {
        'use strict';

        atom.workspaceView.command('htmlhint', linter);
    }
};
