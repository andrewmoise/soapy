/**
 * Initial UI setup
 */
function onOpen(e) {
  var addon_menu = SpreadsheetApp.getUi().createAddonMenu();
  
  addon_menu
    .addItem('Optimize', 'optimize')
    .addToUi();
}

function optimize() {
  var ui = SpreadsheetApp.getUi();
  
  var params_result = ui.prompt(
    "Parameters",
    "Enter range to modify",
    ui.ButtonSet.OK_CANCEL
  );
  
  var range_text;
  var target_cell_text;
  
  var button = params_result.getSelectedButton();
  if (button == ui.Button.OK) {
    range_text = params_result.getResponseText();
  } else {
    return;
  }

  params_result = ui.prompt(
    "Parameters",
    "Enter cell to optimize",
    ui.ButtonSet.OK_CANCEL
  );
  
  button = params_result.getSelectedButton();
  if (button == ui.Button.OK) {
    target_cell_text = params_result.getResponseText();
  }
  
}
