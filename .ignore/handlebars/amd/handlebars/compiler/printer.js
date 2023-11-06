define(["exports", "./visitor"], function (exports, _visitor) {
  /* eslint-disable new-cap */
  "use strict";

  exports.__esModule = true;
  exports.print = print;
  exports.PrintVisitor = PrintVisitor;
  // istanbul ignore next

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var _Visitor = _interopRequireDefault(_visitor);

  function print(ast) {
    return new PrintVisitor().accept(ast);
  }

  function PrintVisitor() {
    this.padding = 0;
  }

  PrintVisitor.prototype = new _Visitor["default"]();

  PrintVisitor.prototype.pad = function (string) {
    var out = "";

    for (var i = 0, l = this.padding; i < l; i++) {
      out += "  ";
    }

    out += string + "\n";
    return out;
  };

  PrintVisitor.prototype.Program = function (program) {
    var out = "",
      body = program.body,
      i = undefined,
      l = undefined;

    if (program.blockParams) {
      var blockParams = "BLOCK PARAMS: [";
      for (i = 0, l = program.blockParams.length; i < l; i++) {
        blockParams += " " + program.blockParams[i];
      }
      blockParams += " ]";
      out += this.pad(blockParams);
    }

    for (i = 0, l = body.length; i < l; i++) {
      out += this.accept(body[i]);
    }

    this.padding--;

    return out;
  };

  PrintVisitor.prototype.MustacheStatement = function (mustache) {
    return this.pad("{{ " + this.SubExpression(mustache) + " }}");
  };
  PrintVisitor.prototype.Decorator = function (mustache) {
    return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
  };

  PrintVisitor.prototype.BlockStatement =
    PrintVisitor.prototype.DecoratorBlock = function (block) {
      var out = "";

      out += this.pad(
        (block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:",
      );
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++;
        }
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--;
        }
      }
      this.padding--;

      return out;
    };

  PrintVisitor.prototype.PartialStatement = function (partial) {
    var content = "PARTIAL:" + partial.name.original;
    if (partial.params[0]) {
      content += " " + this.accept(partial.params[0]);
    }
    if (partial.hash) {
      content += " " + this.accept(partial.hash);
    }
    return this.pad("{{> " + content + " }}");
  };
  PrintVisitor.prototype.PartialBlockStatement = function (partial) {
    var content = "PARTIAL BLOCK:" + partial.name.original;
    if (partial.params[0]) {
      content += " " + this.accept(partial.params[0]);
    }
    if (partial.hash) {
      content += " " + this.accept(partial.hash);
    }

    content += " " + this.pad("PROGRAM:");
    this.padding++;
    content += this.accept(partial.program);
    this.padding--;

    return this.pad("{{> " + content + " }}");
  };

  PrintVisitor.prototype.ContentStatement = function (content) {
    return this.pad("CONTENT[ '" + content.value + "' ]");
  };

  PrintVisitor.prototype.CommentStatement = function (comment) {
    return this.pad("{{! '" + comment.value + "' }}");
  };

  PrintVisitor.prototype.SubExpression = function (sexpr) {
    var params = sexpr.params,
      paramStrings = [],
      hash = undefined;

    for (var i = 0, l = params.length; i < l; i++) {
      paramStrings.push(this.accept(params[i]));
    }

    params = "[" + paramStrings.join(", ") + "]";

    hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";

    return this.accept(sexpr.path) + " " + params + hash;
  };

  PrintVisitor.prototype.PathExpression = function (id) {
    var path = id.parts.join("/");
    return (id.data ? "@" : "") + "PATH:" + path;
  };

  PrintVisitor.prototype.StringLiteral = function (string) {
    return '"' + string.value + '"';
  };

  PrintVisitor.prototype.NumberLiteral = function (number) {
    return "NUMBER{" + number.value + "}";
  };

  PrintVisitor.prototype.BooleanLiteral = function (bool) {
    return "BOOLEAN{" + bool.value + "}";
  };

  PrintVisitor.prototype.UndefinedLiteral = function () {
    return "UNDEFINED";
  };

  PrintVisitor.prototype.NullLiteral = function () {
    return "NULL";
  };

  PrintVisitor.prototype.Hash = function (hash) {
    var pairs = hash.pairs,
      joinedPairs = [];

    for (var i = 0, l = pairs.length; i < l; i++) {
      joinedPairs.push(this.accept(pairs[i]));
    }

    return "HASH{" + joinedPairs.join(", ") + "}";
  };
  PrintVisitor.prototype.HashPair = function (pair) {
    return pair.key + "=" + this.accept(pair.value);
  };
  /* eslint-enable new-cap */
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2NvbXBpbGVyL3ByaW50ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdPLFdBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUN6QixXQUFPLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3ZDOztBQUVNLFdBQVMsWUFBWSxHQUFHO0FBQzdCLFFBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0dBQ2xCOztBQUVELGNBQVksQ0FBQyxTQUFTLEdBQUcseUJBQWEsQ0FBQzs7QUFFdkMsY0FBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBUyxNQUFNLEVBQUU7QUFDNUMsUUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUViLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsU0FBRyxJQUFJLElBQUksQ0FBQztLQUNiOztBQUVELE9BQUcsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQzs7QUFFRixjQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFTLE9BQU8sRUFBRTtBQUNqRCxRQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ1YsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJO1FBQ25CLENBQUMsWUFBQTtRQUNELENBQUMsWUFBQSxDQUFDOztBQUVKLFFBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUN2QixVQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQyxXQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFD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TUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekM7O0FBRUQsV0FBTyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7R0FDL0MsQ0FBQztBQUNGLGNBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQy9DLFdBQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDakQsQ0FBQyIsImZpbGUiOiJwcmludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuaW1wb3J0IFZpc2l0b3IgZnJvbSAnLi92aXNpdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50KGFzdCkge1xuICByZXR1cm4gbmV3IFByaW50VmlzaXRvcigpLmFjY2VwdChhc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJpbnRWaXNpdG9yKCkge1xuICB0aGlzLnBhZGRpbmcgPSAwO1xufVxuXG5QcmludFZpc2l0b3IucHJvdG90eXBlID0gbmV3IFZpc2l0b3IoKTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5wYWQgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgbGV0IG91dCA9ICcnO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5wYWRkaW5nOyBpIDwgbDsgaSsrKSB7XG4gICAgb3V0ICs9ICcgICc7XG4gIH1cblxuICBvdXQgKz0gc3RyaW5nICsgJ1xcbic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLlByb2dyYW0gPSBmdW5jdGlvbihwcm9ncmFtKSB7XG4gIGxldCBvdXQgPSAnJyxcbiAgICBib2R5ID0gcHJvZ3JhbS5ib2R5LFxuICAgIGksXG4gICAgbDtcblxuICBpZiAocHJvZ3JhbS5ibG9ja1BhcmFtcykge1xuICAgIGxldCBibG9ja1BhcmFtcyA9ICdCTE9DSyBQQVJBTVM6IFsnO1xuICAgIGZvciAoaSA9IDAsIGwgPSBwcm9ncmFtLmJsb2NrUGFyYW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgYmxvY2tQYXJhbXMgKz0gJyAnICsgcHJvZ3JhbS5ibG9ja1BhcmFtc1tpXTtcbiAgICB9XG4gICAgYmxvY2tQYXJhbXMgKz0gJyBdJztcbiAgICBvdXQgKz0gdGhpcy5wYWQoYmxvY2tQYXJhbXMpO1xuICB9XG5cbiAgZm9yIChpID0gMCwgbCA9IGJvZHkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb3V0ICs9IHRoaXMuYWNjZXB0KGJvZHlbaV0pO1xuICB9XG5cbiAgdGhpcy5wYWRkaW5nLS07XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuTXVzdGFjaGVTdGF0ZW1lbnQgPSBmdW5jdGlvbihtdXN0YWNoZSkge1xuICByZXR1cm4gdGhpcy5wYWQoJ3t7ICcgKyB0aGlzLlN1YkV4cHJlc3Npb24obXVzdGFjaGUpICsgJyB9fScpO1xufTtcblByaW50VmlzaXRvci5wcm90b3R5cGUuRGVjb3JhdG9yID0gZnVuY3Rpb24obXVzdGFjaGUpIHtcbiAgcmV0dXJuIHRoaXMucGFkKCd7eyBESVJFQ1RJVkUgJyArIHRoaXMuU3ViRXhwcmVzc2lvbihtdXN0YWNoZSkgKyAnIH19Jyk7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLkJsb2NrU3RhdGVtZW50ID0gUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5EZWNvcmF0b3JCbG9jayA9IGZ1bmN0aW9uKFxuICBibG9ja1xuKSB7XG4gIGxldCBvdXQgPSAnJztcblxuICBvdXQgKz0gdGhpcy5wYWQoXG4gICAgKGJsb2NrLnR5cGUgPT09ICdEZWNvcmF0b3JCbG9jaycgPyAnRElSRUNUSVZFICcgOiAnJykgKyAnQkxPQ0s6J1xuICApO1xuICB0aGlzLnBhZGRpbmcrKztcbiAgb3V0ICs9IHRoaXMucGFkKHRoaXMuU3ViRXhwcmVzc2lvbihibG9jaykpO1xuICBpZiAoYmxvY2sucHJvZ3JhbSkge1xuICAgIG91dCArPSB0aGlzLnBhZCgnUFJPR1JBTTonKTtcbiAgICB0aGlzLnBhZGRpbmcrKztcbiAgICBvdXQgKz0gdGhpcy5hY2NlcHQoYmxvY2sucHJvZ3JhbSk7XG4gICAgdGhpcy5wYWRkaW5nLS07XG4gIH1cbiAgaWYgKGJsb2NrLmludmVyc2UpIHtcbiAgICBpZiAoYmxvY2sucHJvZ3JhbSkge1xuICAgICAgdGhpcy5wYWRkaW5nKys7XG4gICAgfVxuICAgIG91dCArPSB0aGlzLnBhZCgne3tefX0nKTtcbiAgICB0aGlzLnBhZGRpbmcrKztcbiAgICBvdXQgKz0gdGhpcy5hY2NlcHQoYmxvY2suaW52ZXJzZSk7XG4gICAgdGhpcy5wYWRkaW5nLS07XG4gICAgaWYgKGJsb2NrLnByb2dyYW0pIHtcbiAgICAgIHRoaXMucGFkZGluZy0tO1xuICAgIH1cbiAgfVxuICB0aGlzLnBhZGRpbmctLTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5QYXJ0aWFsU3RhdGVtZW50ID0gZnVuY3Rpb24ocGFydGlhbCkge1xuICBsZXQgY29udGVudCA9ICdQQVJUSUFMOicgKyBwYXJ0aWFsLm5hbWUub3JpZ2luYWw7XG4gIGlmIChwYXJ0aWFsLnBhcmFtc1swXSkge1xuICAgIGNvbnRlbnQgKz0gJyAnICsgdGhpcy5hY2NlcHQocGFydGlhbC5wYXJhbXNbMF0pO1xuICB9XG4gIGlmIChwYXJ0aWFsLmhhc2gpIHtcbiAgICBjb250ZW50ICs9ICcgJyArIHRoaXMuYWNjZXB0KHBhcnRpYWwuaGFzaCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMucGFkKCd7ez4gJyArIGNvbnRlbnQgKyAnIH19Jyk7XG59O1xuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5QYXJ0aWFsQmxvY2tTdGF0ZW1lbnQgPSBmdW5jdGlvbihwYXJ0aWFsKSB7XG4gIGxldCBjb250ZW50ID0gJ1BBUlRJQUwgQkxPQ0s6JyArIHBhcnRpYWwubmFtZS5vcmlnaW5hbDtcbiAgaWYgKHBhcnRpYWwucGFyYW1zWzBdKSB7XG4gICAgY29udGVudCArPSAnICcgKyB0aGlzLmFjY2VwdChwYXJ0aWFsLnBhcmFtc1swXSk7XG4gIH1cbiAgaWYgKHBhcnRpYWwuaGFzaCkge1xuICAgIGNvbnRlbnQgKz0gJyAnICsgdGhpcy5hY2NlcHQocGFydGlhbC5oYXNoKTtcbiAgfVxuXG4gIGNvbnRlbnQgKz0gJyAnICsgdGhpcy5wYWQoJ1BST0dSQU06Jyk7XG4gIHRoaXMucGFkZGluZysrO1xuICBjb250ZW50ICs9IHRoaXMuYWNjZXB0KHBhcnRpYWwucHJvZ3JhbSk7XG4gIHRoaXMucGFkZGluZy0tO1xuXG4gIHJldHVybiB0aGlzLnBhZCgne3s+ICcgKyBjb250ZW50ICsgJyB9fScpO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5Db250ZW50U3RhdGVtZW50ID0gZnVuY3Rpb24oY29udGVudCkge1xuICByZXR1cm4gdGhpcy5wYWQoXCJDT05URU5UWyAnXCIgKyBjb250ZW50LnZhbHVlICsgXCInIF1cIik7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLkNvbW1lbnRTdGF0ZW1lbnQgPSBmdW5jdGlvbihjb21tZW50KSB7XG4gIHJldHVybiB0aGlzLnBhZChcInt7ISAnXCIgKyBjb21tZW50LnZhbHVlICsgXCInIH19XCIpO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5TdWJFeHByZXNzaW9uID0gZnVuY3Rpb24oc2V4cHIpIHtcbiAgbGV0IHBhcmFtcyA9IHNleHByLnBhcmFtcyxcbiAgICBwYXJhbVN0cmluZ3MgPSBbXSxcbiAgICBoYXNoO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcGFyYW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHBhcmFtU3RyaW5ncy5wdXNoKHRoaXMuYWNjZXB0KHBhcmFtc1tpXSkpO1xuICB9XG5cbiAgcGFyYW1zID0gJ1snICsgcGFyYW1TdHJpbmdzLmpvaW4oJywgJykgKyAnXSc7XG5cbiAgaGFzaCA9IHNleHByLmhhc2ggPyAnICcgKyB0aGlzLmFjY2VwdChzZXhwci5oYXNoKSA6ICcnO1xuXG4gIHJldHVybiB0aGlzLmFjY2VwdChzZXhwci5wYXRoKSArICcgJyArIHBhcmFtcyArIGhhc2g7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLlBhdGhFeHByZXNzaW9uID0gZnVuY3Rpb24oaWQpIHtcbiAgbGV0IHBhdGggPSBpZC5wYXJ0cy5qb2luKCcvJyk7XG4gIHJldHVybiAoaWQuZGF0YSA/ICdAJyA6ICcnKSArICdQQVRIOicgKyBwYXRoO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5TdHJpbmdMaXRlcmFsID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiAnXCInICsgc3RyaW5nLnZhbHVlICsgJ1wiJztcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuTnVtYmVyTGl0ZXJhbCA9IGZ1bmN0aW9uKG51bWJlcikge1xuICByZXR1cm4gJ05VTUJFUnsnICsgbnVtYmVyLnZhbHVlICsgJ30nO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5Cb29sZWFuTGl0ZXJhbCA9IGZ1bmN0aW9uKGJvb2wpIHtcbiAgcmV0dXJuICdCT09MRUFOeycgKyBib29sLnZhbHVlICsgJ30nO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5VbmRlZmluZWRMaXRlcmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnVU5ERUZJTkVEJztcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuTnVsbExpdGVyYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdOVUxMJztcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuSGFzaCA9IGZ1bmN0aW9uKGhhc2gpIHtcbiAgbGV0IHBhaXJzID0gaGFzaC5wYWlycyxcbiAgICBqb2luZWRQYWlycyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcGFpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgam9pbmVkUGFpcnMucHVzaCh0aGlzLmFjY2VwdChwYWlyc1tpXSkpO1xuICB9XG5cbiAgcmV0dXJuICdIQVNIeycgKyBqb2luZWRQYWlycy5qb2luKCcsICcpICsgJ30nO1xufTtcblByaW50VmlzaXRvci5wcm90b3R5cGUuSGFzaFBhaXIgPSBmdW5jdGlvbihwYWlyKSB7XG4gIHJldHVybiBwYWlyLmtleSArICc9JyArIHRoaXMuYWNjZXB0KHBhaXIudmFsdWUpO1xufTtcbi8qIGVzbGludC1lbmFibGUgbmV3LWNhcCAqL1xuIl19
