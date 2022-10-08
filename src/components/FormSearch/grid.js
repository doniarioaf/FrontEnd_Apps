import React, {useState, useEffect} from 'react';
import Paper                        from '@material-ui/core/Paper';
import {
    PagingState,
    SortingState,
    IntegratedSorting,
    IntegratedPaging,
    EditingState,
    TableColumnVisibility,
    SelectionState
}                                   from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    TableFilterRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    VirtualTable,
    TableSelection,
}                                   from '@devexpress/dx-react-grid-material-ui';
import TableCell                    from "@material-ui/core/TableCell";
import {Loading}                    from '../../components/Common/Loading'
import {useTranslation}             from 'react-i18next';
import {useHistory}                 from 'react-router-dom';
import IconButton                   from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import {useDispatch}   from 'react-redux';

const FilterIcon = ({type, ...restProps}) => {
    return <TableFilterRow.Icon type={type} {...restProps} />;
};

const FilterCell = props => {
    // if (props.column.name === "statuss")
        return <TableCell className={props.className}/>;
    // else return <TableFilterRow.Cell {...props} />;
};

const AddButton = ({onExecute}) => {
    const history = useHistory();
    const i18n = useTranslation('translations');
    return (
        <div style={{textAlign: 'center'}} title={i18n.t('grid.ADD')}>
           
        </div>
    );
};



const commandComponents = {
    add: AddButton,
};

const Command = ({id, onExecute}) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

const QuickSearchGrid = props => {
    const {i18n} = useTranslation();
    const [hiddenColumnNames] = useState(['id']);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState([]);
    const [pageSizes] = useState([10, 25, 50]);
    const [loading, setLoading] = useState(props.loading);
    const [integratedSortingColumnExtensions] = useState([]);
    const [tableColumnExtensions] = useState(props.columnextension);
    const [selection, setSelection] = useState([1]);

    const pagingPanelMessages = {
        showAll: i18n.t('grid.ALL'),
        rowsPerPage: i18n.t('grid.ROWS_PER_PAGE'),
        info: i18n.t('grid.INFO'),
    };
    const filterRowMessages = {
        contains: i18n.t('grid.CONTAINS'),
        notContains: i18n.t('grid.NOTCONTAINS'),
        startsWith: i18n.t('grid.STARTSWITH'),
        endsWith: i18n.t('grid.ENDSWITH'),
        equal: i18n.t('grid.EQUAL'),
        notEqual: i18n.t('grid.NOTEQUAL'),
        greaterThan: i18n.t('grid.GREATERTHAN'),
        greaterThanOrEqual: i18n.t('grid.GREATERTHANOREQUAL'),
        lessThan: i18n.t('grid.LESSTHAN'),
        lessThanOrEqual: i18n.t('grid.LESSTHANOREQUAL')
    };

    useEffect(() => {
        if (props.loading !== loading) {
            setLoading(props.loading);
        }
    }, [props.loading]);

    function noDataCell(props) {
        return loading
            ? <td className={'grid-nodata'} colSpan={7}>
                <div className={'grid-nodata--text-container'}>
                    <div style={{fontSize: 'larger'}}>
                        Loading...
                    </div>
                </div>
            </td>
            : <VirtualTable.NoDataCell {...props} />;
    }

    const CellComponent = ({children, row, ...restProps}) => {
        const {i18n} = useTranslation('translations');
        const history = useHistory();
        const dispatch = useDispatch();
        return (
            <TableEditColumn.Cell row={row} {...restProps}>
                {children}
                    <IconButton color={'primary'}
                        onClick={() =>props.handlesearch(row.data)}
                    >
                        <CheckIcon/>
                    </IconButton>
              
            </TableEditColumn.Cell>
        );
    };
    return (
        <Paper style={{position: 'relative'}}>
            <Grid
                rows={props.rows}
                columns={props.columns}
                
            >
                <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
                />
                <EditingState onCommitChanges={() => {
                }}/>
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                {/* <FilteringState defaultFilters={[]}/>
                <IntegratedFiltering/> */}
                <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
                <IntegratedSorting
                    columnExtensions={integratedSortingColumnExtensions}
                />
                <IntegratedPaging/>
                <VirtualTable
                    noDataCellComponent={noDataCell}
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow showSortingControls/>
                <TableSelection
                selectByRowClick
                highlightRow
                showSelectionColumn={false}
                />
                <TableColumnVisibility
                    hiddenColumnNames={hiddenColumnNames}
                />
                {/* <TableFilterRow
                    showFilterSelector
                    cellComponent={FilterCell}
                    iconComponent={FilterIcon}
                    messages={filterRowMessages}
                /> */}
                <TableEditRow/>
                <TableEditColumn
                    showAddCommand
                    // showEditCommand
                    // showDeleteCommand
                    cellComponent={CellComponent}
                    commandComponent={Command}
                    width={70}
                    // messages={editColumnMessages}
                />
                <PagingPanel
                    pageSizes={pageSizes}
                    messages={pagingPanelMessages}
                />
            </Grid>
                    {props.loading && <Loading/>}
        </Paper>
    );
};
export default QuickSearchGrid;