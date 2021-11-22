import autobind from "autobind-decorator";
import * as React from 'react';
import { Template, Plugin, TemplateConnector, Getter, } from '@devexpress/dx-react-core';
import { TableCell, IconButton, Tooltip } from '@material-ui/core';
import { Table, VirtualTable, TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function makeDictionary(values, getKey) {
    return values.reduce((acc, v) => { acc[getKey(v)] = v; return acc; }, {});
}
const pluginDependencies = [
    { name: 'Table' },
];
let ActionColumnsBase = /** @class */ (() => {
    var ActionColumnsBase_1;
    let ActionColumnsBase = ActionColumnsBase_1 = class ActionColumnsBase extends React.PureComponent {
        render() {
            const { actionColumns } = this.props;
            const columnDictionary = makeDictionary(actionColumns, i => i.columnName);
            return (React.createElement(Plugin, { name: "ActionColumn", dependencies: pluginDependencies },
                React.createElement(Getter, { name: "tableColumns", computed: this.computeColumns.bind(null, columnDictionary) }),
                React.createElement(Template, { name: "tableCell", predicate: this.isActionTableHeader.bind(null) }, (params) => (React.createElement(TemplateConnector, null, (getters, actions) => {
                    const actionColumn = columnDictionary[params.tableColumn.column.name];
                    return (React.createElement(TableCell, null, actionColumn.title));
                }))),
                React.createElement(Template, { name: "tableCell", predicate: this.isActionTableCell.bind(null) }, (params) => (React.createElement(TemplateConnector, null, (getters, actions) => {
                    const actionColumn = columnDictionary[params.tableColumn.column.name];
                    const button = (React.createElement(IconButton, { size: "small", "aria-label": actionColumn.label, style: { verticalAlign: "middle" }, onClick: actionColumn.onClick.bind(null, params.tableRow.row) }, actionColumn.icon));
                    if (actionColumn.label) {
                        return (React.createElement(TableCell, { align: "right" },
                            React.createElement(Tooltip, { title: actionColumn.label }, button)));
                    }
                    else {
                        return (React.createElement(TableCell, { align: "right" }, button));
                    }
                })))));
        }
        computeColumns(actionColumns, getters) {
            const tableColumns = getters.tableColumns;
            const columns = tableColumns.map(tableColumn => {
                if (!tableColumn.column || !actionColumns[tableColumn.column.name]) {
                    return tableColumn;
                }
                return Object.assign(Object.assign({}, tableColumn), { type: ActionColumnsBase_1.ACTION_COLUMN_TYPE, width: 60 });
            });
            return columns;
        }
        isActionTableCell(params) {
            if ((params.tableRow.type === Table.ROW_TYPE || params.tableRow.type === VirtualTable.ROW_TYPE) && params.tableColumn.type === ActionColumnsBase_1.ACTION_COLUMN_TYPE) {
                return true;
            }
            return false;
        }
        isActionTableHeader(params) {
            if ((params.tableRow.type === TableHeaderRow.ROW_TYPE) && params.tableColumn.type === ActionColumnsBase_1.ACTION_COLUMN_TYPE) {
                return true;
            }
            return false;
        }
    };
    ActionColumnsBase.ACTION_COLUMN_TYPE = Symbol("ACTION_COLUMN");
    ActionColumnsBase = ActionColumnsBase_1 = __decorate([
        autobind
    ], ActionColumnsBase);
    return ActionColumnsBase;
})();
export const ActionColumns = ActionColumnsBase;
