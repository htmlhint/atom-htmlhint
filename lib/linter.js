/*global atom, require, module*/

var HTMLHINT = require('htmlhint').HTMLHint;

module.exports = function () {
    'use strict';

    var editor = atom.workspace.getActiveEditor(),
        content = editor.getText(),
        langues = editor.getGrammar().name,
        result,
        error,
        pre,
        i,
        addClick = function (pre, line, character) {
            pre.click(function () {
                editor.cursors[0].setBufferPosition([line - 1, character - 1]);
            });
        };

    if (langues === 'HTML') {
        result = HTMLHINT.verify(content);

        if (atom.workspaceView.find('.htmlhint').length !== 1) {
            atom.workspaceView.prependToBottom('<div class="htmlhint tool-panel panel-bottom" />');
            atom.workspaceView.find('.htmlhint')
                .append('<div class="panel-heading">HTMLHint report <button type="button" class="close" aria-hidden="true">&times;</button></div>')
                .append('<div class="panel-body padded" />');
            atom.workspaceView.find('.htmlhint .close').click(function () {
                atom.workspaceView.find('.htmlhint').remove();
            });
        } else {
            atom.workspaceView.find('.htmlhint .panel-body').html('');
        }

        if (result.length === 0) {
            atom.workspaceView.find('.htmlhint .panel-body').append('<h1 class="text-success">√ No errors was found!</h1>');
        } else {
            for (i = 0; i < result.length; i += 1) {
                error = result[i];

                atom.workspaceView.find('.htmlhint .panel-body')
                    .append('<div class="text-subtle inline-block">at line' + String(error.line) + ', character ' + String(error.col) + '</div>')
                    .append('<div class="text-error inline-block">' + error.message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')  + '</div>')
                    .append('<pre>' + error.evidence.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')  + '</pre>');

                pre = atom.workspaceView.find('.htmlhint .panel-body pre:last-child');

                addClick(pre, error.line, error.col);
            }
        }

        atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
            atom.workspaceView.find('.htmlhint').remove();
        });
    }
};
