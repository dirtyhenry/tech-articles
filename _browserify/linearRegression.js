var smr = require('smr');

window.resetRegression = function() {
  window.regression = new smr.Regression({ numX: 3, numY: 1 });
  window.regression6 = new smr.Regression({ numX: 6, numY: 1 });  
}
