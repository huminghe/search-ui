import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import PropTypes from "prop-types";
import React from "react";
import { appendClassName } from "@elastic/react-search-ui-views/es/view-helpers";

function Facets(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ["children", "className"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: appendClassName("sui-facet-container", className)
  }, rest), children);
}

Facets.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
export default Facets;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GYWNldHMuanMiXSwibmFtZXMiOlsiUHJvcFR5cGVzIiwiUmVhY3QiLCJhcHBlbmRDbGFzc05hbWUiLCJGYWNldHMiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInJlc3QiLCJwcm9wVHlwZXMiLCJub2RlIiwiaXNSZXF1aXJlZCIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUVBLFNBQVNDLGVBQVQsUUFBZ0MsZ0JBQWhDOztBQUVBLFNBQVNDLE1BQVQsT0FBa0Q7QUFBQSxNQUFoQ0MsUUFBZ0MsUUFBaENBLFFBQWdDO0FBQUEsTUFBdEJDLFNBQXNCLFFBQXRCQSxTQUFzQjtBQUFBLE1BQVJDLElBQVE7O0FBQ2hELHNCQUNFO0FBQ0UsSUFBQSxTQUFTLEVBQUVKLGVBQWUsQ0FBQyxxQkFBRCxFQUF3QkcsU0FBeEI7QUFENUIsS0FFTUMsSUFGTixHQUlHRixRQUpILENBREY7QUFRRDs7QUFFREQsTUFBTSxDQUFDSSxTQUFQLEdBQW1CO0FBQ2pCSCxFQUFBQSxRQUFRLEVBQUVKLFNBQVMsQ0FBQ1EsSUFBVixDQUFlQyxVQURSO0FBRWpCSixFQUFBQSxTQUFTLEVBQUVMLFNBQVMsQ0FBQ1U7QUFGSixDQUFuQjtBQUtBLGVBQWVQLE1BQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IGFwcGVuZENsYXNzTmFtZSB9IGZyb20gXCIuL3ZpZXctaGVscGVyc1wiO1xuXG5mdW5jdGlvbiBGYWNldHMoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2FwcGVuZENsYXNzTmFtZShcInN1aS1mYWNldC1jb250YWluZXJcIiwgY2xhc3NOYW1lKX1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuRmFjZXRzLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmFjZXRzO1xuIl19