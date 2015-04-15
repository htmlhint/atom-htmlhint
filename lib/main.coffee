linter = require "./linter"
module.exports =
  configDefaults:
    validateOnSave: true
    validateOnChange: false
    hideOnNoErrors: false
    useFoldModeAsDefault: false

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
