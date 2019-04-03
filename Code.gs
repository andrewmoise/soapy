/**
 * Initial UI setup
 */
function onOpen(e) {
  var addon_menu = SpreadsheetApp.getUi().createAddonMenu();
  
  addon_menu
    .addItem('Optimize', 'optimizeMenuCall')
    .addToUi();
}

function optimizeMenuCall() {
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
  
  var current_sheet = SpreadsheetApp.getActiveSheet();
  var opti_range = current_sheet.getRange(range_text);
  var target_cell = current_sheet.getRange(target_cell_text);
  
  target_cell.setVa
  
  runOptimizeLoop(current_sheet, opti_range, target_cell);
}

var bake_cycles = 500;
var bake_mod = .1;

function runOptimizeLoop(sheet, src_range, target) {
  var prev_src = src_range.getValues();
  var prev_target = target.getValue();
  
  for(var i=0; i<bake_cycles; i++) {
    var new_src = [];
    for(var ii = 0; ii < prev_src.length; ii++) {
      new_src.push([]);
      for (var jj = 0; jj < prev_src[ii].length; jj++) {
        var new_value = prev_src[ii][jj];
        new_value *= 1. + 2. * bake_mod * (Math.random() - .5);
        new_src[ii].push(new_value);
      }
    }
    
    src_range.setValues(new_src);
    var new_target = target.getValue();
    
    if (new_target < prev_target) {
      prev_target = new_target;
      prev_src = new_src;
    }
  }
  
  src_range.setValues(prev_src);
}
