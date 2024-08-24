'use strict';

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message =
      'Warning: ' +
      format.replace(/%s/g, function () {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch ( x )
    {
      console.log(x);
    }
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
          'message argument',
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

export default warning;
