/*global atom, require, module*/

var HTMLHINT = require('htmlhint').HTMLHint;
var msgPanel = require('atom-message-panel');

module.exports = function () {
    'use strict';

    var editor = atom.workspace.getActiveEditor(),
        content = editor.getText(),
        langues = editor.getGrammar().name,
        result,
        error,
        i;

    if (langues === 'HTML') {
        result = HTMLHINT.verify(content);

        if (atom.workspaceView.find('.am-panel').length !== 1) {
            msgPanel.init('HTMLHint report');
        } else {
            msgPanel.clear();
        }

        if (result.length === 0) {
            msgPanel.append.header('√ No errors were found!', 'text-success');
        } else {
            for (i = 0; i < result.length; i += 1) {
                error = result[i];

                if (error) {
                    error.message = error.message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    error.evidence = error.evidence.trim();

                    msgPanel.append.lineMessage(error.line, error.col, error.message, error.evidence, 'text-error');
                }
            }
        }

        atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
            msgPanel.destroy();
        });
    }
};
