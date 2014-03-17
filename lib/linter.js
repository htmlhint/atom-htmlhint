/*global atom, require, module*/

var HTMLHINT = require('htmlhint').HTMLHint;
var msgPanel = require('atom-message-panel');

module.exports = function () {
    'use strict';

    var editor = atom.workspace.getActiveEditor(),
        content,
        result,
        error,
        lines = [],
        i;

    if (!editor) {
        return;
    }

    if (editor.getGrammar().name === 'HTML') {
        content = editor.getText();

        result = HTMLHINT.verify(content);

        if (atom.workspaceView.find('.am-panel').length !== 1) {
            msgPanel.init('<span class="icon-bug"></span> HTMLHint report');

            atom.config.observe('htmlhint.useFoldModeAsDefault', {callNow: true}, function (value) {
                if (value === true) {
                    msgPanel.fold(0);
                }
            });
        } else {
            msgPanel.clear();
        }

        if (result.length === 0) {
            atom.config.observe('htmlhint.hideOnNoErrors', {callNow: true}, function (value) {
                if (value === true) {
                    msgPanel.destroy();
                } else {
                    msgPanel.append.header('√ No errors were found!', 'text-success');
                }
            });
        } else {
            for (i = 0; i < result.length; i += 1) {
                error = result[i];

                if (error) {
                    error.message = error.message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    error.evidence = error.evidence.trim();
                    lines.push(error.line);

                    msgPanel.append.lineMessage(error.line, error.col, error.message, error.evidence, 'text-error');
                }
            }
        }

        msgPanel.append.lineIndicators(lines, 'text-error');

        atom.workspaceView.on('pane-container:active-pane-item-changed destroyed', function () {
            msgPanel.destroy();
        });
    }
};
