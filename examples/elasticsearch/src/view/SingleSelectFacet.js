import PropTypes from "prop-types";
import React from "react";
import Select, { components } from "react-select";
import { FacetValue } from "@elastic/react-search-ui-views/es/types";
import { getFilterValueDisplay } from "@elastic/react-search-ui-views/es/view-helpers";
import { appendClassName } from "@elastic/react-search-ui-views/es/view-helpers";

function Option(props) {
  return /*#__PURE__*/React.createElement(components.Option, props, /*#__PURE__*/React.createElement("span", {
    className: "sui-select__option-label"
  }, props.data.label), /*#__PURE__*/React.createElement("span", {
    className: "sui-select__option-count"
  }, props.data.count.toLocaleString("en")));
}

Option.propTypes = {
  data: PropTypes.object.isRequired
};

function toSelectBoxOption(filterValue) {
  return {
    value: filterValue.value,
    label: getFilterValueDisplay(filterValue.value),
    count: filterValue.count
  };
}

var setDefaultStyle = {
  option: function option() {
    return {};
  },
  control: function control() {
    return {};
  },
  dropdownIndicator: function dropdownIndicator() {
    return {};
  },
  indicatorSeparator: function indicatorSeparator() {
    return {};
  }
};

function SingleSelectFacet(_ref) {
  var className = _ref.className,
      label = _ref.label,
      _onChange = _ref.onChange,
      options = _ref.options;
  var selectedSelectBoxOption;
  var isSelectedSelectBoxOptionSet = false;
  var selectBoxOptions = options.map(function (option) {
    var selectBoxOption = toSelectBoxOption(option); // There should never be multiple filters set for this facet because it is single select,
    // but if there is, we use the first value.

    if (option.selected && !isSelectedSelectBoxOptionSet) {
      selectedSelectBoxOption = selectBoxOption;
      isSelectedSelectBoxOptionSet = true;
    }

    return selectBoxOption;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: appendClassName("sui-facet", className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "sui-facet__title"
  }, label), /*#__PURE__*/React.createElement(Select, {
    className: "sui-select",
    classNamePrefix: "sui-select",
    components: {
      Option: Option
    },
    value: selectedSelectBoxOption,
    onChange: function onChange(o) {
      return _onChange(o.value);
    },
    options: selectBoxOptions,
    isSearchable: false,
    styles: setDefaultStyle,
    placeholder: "选择..."
  }));
}

SingleSelectFacet.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(FacetValue).isRequired,
  className: PropTypes.string
};
export default SingleSelectFacet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TaW5nbGVTZWxlY3RGYWNldC5qcyJdLCJuYW1lcyI6WyJQcm9wVHlwZXMiLCJSZWFjdCIsIlNlbGVjdCIsImNvbXBvbmVudHMiLCJGYWNldFZhbHVlIiwiZ2V0RmlsdGVyVmFsdWVEaXNwbGF5IiwiYXBwZW5kQ2xhc3NOYW1lIiwiT3B0aW9uIiwicHJvcHMiLCJkYXRhIiwibGFiZWwiLCJjb3VudCIsInRvTG9jYWxlU3RyaW5nIiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInRvU2VsZWN0Qm94T3B0aW9uIiwiZmlsdGVyVmFsdWUiLCJ2YWx1ZSIsInNldERlZmF1bHRTdHlsZSIsIm9wdGlvbiIsImNvbnRyb2wiLCJkcm9wZG93bkluZGljYXRvciIsImluZGljYXRvclNlcGFyYXRvciIsIlNpbmdsZVNlbGVjdEZhY2V0IiwiY2xhc3NOYW1lIiwib25DaGFuZ2UiLCJvcHRpb25zIiwic2VsZWN0ZWRTZWxlY3RCb3hPcHRpb24iLCJpc1NlbGVjdGVkU2VsZWN0Qm94T3B0aW9uU2V0Iiwic2VsZWN0Qm94T3B0aW9ucyIsIm1hcCIsInNlbGVjdEJveE9wdGlvbiIsInNlbGVjdGVkIiwibyIsInN0cmluZyIsImZ1bmMiLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsSUFBaUJDLFVBQWpCLFFBQW1DLGNBQW5DO0FBRUEsU0FBU0MsVUFBVCxRQUEyQixTQUEzQjtBQUNBLFNBQVNDLHFCQUFULFFBQXNDLGdCQUF0QztBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsZ0JBQWhDOztBQUVBLFNBQVNDLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQ3JCLHNCQUNFLG9CQUFDLFVBQUQsQ0FBWSxNQUFaLEVBQXVCQSxLQUF2QixlQUNFO0FBQU0sSUFBQSxTQUFTLEVBQUM7QUFBaEIsS0FBNENBLEtBQUssQ0FBQ0MsSUFBTixD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O0FBT0EsZUFBZVgsaUJBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0LCB7IGNvbXBvbmVudHMgfSBmcm9tIFwicmVhY3Qtc2VsZWN0XCI7XG5cbmltcG9ydCB7IEZhY2V0VmFsdWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0RmlsdGVyVmFsdWVEaXNwbGF5IH0gZnJvbSBcIi4vdmlldy1oZWxwZXJzXCI7XG5pbXBvcnQgeyBhcHBlbmRDbGFzc05hbWUgfSBmcm9tIFwiLi92aWV3LWhlbHBlcnNcIjtcblxuZnVuY3Rpb24gT3B0aW9uKHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGNvbXBvbmVudHMuT3B0aW9uIHsuLi5wcm9wc30+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdWktc2VsZWN0X19vcHRpb24tbGFiZWxcIj57cHJvcHMuZGF0YS5sYWJlbH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdWktc2VsZWN0X19vcHRpb24tY291bnRcIj5cbiAgICAgICAge3Byb3BzLmRhdGEuY291bnQudG9Mb2NhbGVTdHJpbmcoXCJlblwiKX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2NvbXBvbmVudHMuT3B0aW9uPlxuICApO1xufVxuXG5PcHRpb24ucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0Qm94T3B0aW9uKGZpbHRlclZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdmFsdWU6IGZpbHRlclZhbHVlLnZhbHVlLFxuICAgIGxhYmVsOiBnZXRGaWx0ZXJWYWx1ZURpc3BsYXkoZmlsdGVyVmFsdWUudmFsdWUpLFxuICAgIGNvdW50OiBmaWx0ZXJWYWx1ZS5jb3VudFxuICB9O1xufVxuXG5jb25zdCBzZXREZWZhdWx0U3R5bGUgPSB7XG4gIG9wdGlvbjogKCkgPT4gKHt9KSxcbiAgY29udHJvbDogKCkgPT4gKHt9KSxcbiAgZHJvcGRvd25JbmRpY2F0b3I6ICgpID0+ICh7fSksXG4gIGluZGljYXRvclNlcGFyYXRvcjogKCkgPT4gKHt9KVxufTtcblxuZnVuY3Rpb24gU2luZ2xlU2VsZWN0RmFjZXQoeyBjbGFzc05hbWUsIGxhYmVsLCBvbkNoYW5nZSwgb3B0aW9ucyB9KSB7XG4gIGxldCBzZWxlY3RlZFNlbGVjdEJveE9wdGlvbjtcbiAgbGV0IGlzU2VsZWN0ZWRTZWxlY3RCb3hPcHRpb25TZXQgPSBmYWxzZTtcblxuICBjb25zdCBzZWxlY3RCb3hPcHRpb25zID0gb3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICBjb25zdCBzZWxlY3RCb3hPcHRpb24gPSB0b1NlbGVjdEJveE9wdGlvbihvcHRpb24pO1xuICAgIC8vIFRoZXJlIHNob3VsZCBuZXZlciBiZSBtdWx0aXBsZSBmaWx0ZXJzIHNldCBmb3IgdGhpcyBmYWNldCBiZWNhdXNlIGl0IGlzIHNpbmdsZSBzZWxlY3QsXG4gICAgLy8gYnV0IGlmIHRoZXJlIGlzLCB3ZSB1c2UgdGhlIGZpcnN0IHZhbHVlLlxuICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgJiYgIWlzU2VsZWN0ZWRTZWxlY3RCb3hPcHRpb25TZXQpIHtcbiAgICAgIHNlbGVjdGVkU2VsZWN0Qm94T3B0aW9uID0gc2VsZWN0Qm94T3B0aW9uO1xuICAgICAgaXNTZWxlY3RlZFNlbGVjdEJveE9wdGlvblNldCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RCb3hPcHRpb247XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2FwcGVuZENsYXNzTmFtZShcInN1aS1mYWNldFwiLCBjbGFzc05hbWUpfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VpLWZhY2V0X190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgY2xhc3NOYW1lPVwic3VpLXNlbGVjdFwiXG4gICAgICAgIGNsYXNzTmFtZVByZWZpeD1cInN1aS1zZWxlY3RcIlxuICAgICAgICBjb21wb25lbnRzPXt7IE9wdGlvbiB9fVxuICAgICAgICB2YWx1ZT17c2VsZWN0ZWRTZWxlY3RCb3hPcHRpb259XG4gICAgICAgIG9uQ2hhbmdlPXtvID0+IG9uQ2hhbmdlKG8udmFsdWUpfVxuICAgICAgICBvcHRpb25zPXtzZWxlY3RCb3hPcHRpb25zfVxuICAgICAgICBpc1NlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICBzdHlsZXM9e3NldERlZmF1bHRTdHlsZX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cblNpbmdsZVNlbGVjdEZhY2V0LnByb3BUeXBlcyA9IHtcbiAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKEZhY2V0VmFsdWUpLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2luZ2xlU2VsZWN0RmFjZXQ7XG4iXX0=