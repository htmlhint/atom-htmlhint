linter = require "./linter"
module.exports =
  config:
    validateOnSave:
      type: 'boolean'
      default: true
    validateOnChange:
      type: 'boolean'
      default: false
    hideOnNoErrors:
      type: 'boolean'
      default: false
    useFoldModeAsDefault:
      type: 'boolean'
      default: false

  activate: ->
    editor = atom.workspace.getActiveTextEditor()
    subscriptions =
      onSave: null
      onChange: null

    atom.commands.add "atom-workspace", "htmlhint:hint", linter
    atom.config.observe "htmlhint.validateOnSave", (value) ->
      if value is true
        atom.workspace.observeTextEditors (editor) ->
          subscriptions.onSave = editor.buffer.onDidSave linter
      else
        atom.workspace.observeTextEditors (editor) ->
          subscriptions.onSave?.dispose()

    atom.config.observe "htmlhint.validateOnChange", (value) ->
      if value is true
        atom.workspace.observeTextEditors (editor) ->
          subscriptions.onChange = editor.buffer.onDidStopChanging linter
      else
        atom.workspace.observeTextEditors (editor) ->
          subscriptions.onChange?.dispose()
