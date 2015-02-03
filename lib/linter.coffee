{MessagePanelView, PlainMessageView, LineMessageView} = require "atom-message-panel"
config = require("./config")
htmlHint = require("htmlhint").HTMLHint
messages = new MessagePanelView
  title: "<span class=\"icon-bug\"></span> HTMLHint report"
  rawTitle: true
  closeMethod: "destroy"
editor = null
content = null
result = null

module.exports = ->
  editor = atom.workspace.getActiveTextEditor()

  return unless editor
  return unless editor.getGrammar().name is "HTML"

  content = editor.getText()
  result = htmlHint.verify content, config()

  messages.clear()
  messages.attach()

  if atom.config.get("htmlhint.useFoldModeAsDefault") and messages.summary.css("display") is "none"
    messages.toggle()

  if result.length is 0
    atom.config.observe "htmlhint.hideOnNoErrors", (value) ->
      if value is true
        messages.close()
      else
        messages.add new PlainMessageView
          message: "No errors were found!"
          className: "text-success"
  else
    for error in result
      continue if !error

      messages.add new LineMessageView
        message: error.message
        line: error.line
        character: error.col
        preview: error.evidence.trim() if error.evidence
        className: "text-#{error.type}"

  atom.workspace.onDidChangeActivePaneItem ->
    messages.close()
