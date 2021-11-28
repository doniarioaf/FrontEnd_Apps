import React, {useState, useEffect} from 'react';
import Paper                        from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging,
    EditingState,
    TableColumnVisibility
}                                   from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    TableFilterRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    VirtualTable,
}                                   from '@devexpress/dx-react-grid-material-ui';
import TableCell                    from "@material-ui/core/TableCell";
import {Loading}                    from '../../../components/Common/Loading';
import {useTranslation}             from 'react-i18next';
import {useHistory}                 from 'react-router-dom';
import Tooltip                      from '@material-ui/core/Tooltip';
import IconButton                   from '@material-ui/core/IconButton';
import {useDispatch}   from 'react-redux';
// import { isGetPermissions } from '../../../../shared/maskFunc';
// import { addSettingFrequentPosting } from '../../../../shared/PermissionForFeatures';
import DeleteIcon from '@material-ui/icons/Delete';

const AddButton = ({onExecute}) => {
    const history = useHistory();
    const i18n = useTranslation('translations');
    return (
        <div style={{textAlign: 'center'}} title={i18n.t('grid.ADD')}>
            {/* <Tooltip title={i18n.t('grid.ADD')}>
                <IconButton hidden={isGetPermissions(addSettingFrequentPosting)} color={'primary'} onClick={() => history.push(pathmenu.addFormAccountingRules)}>
                    <IconAdd/>
                </IconButton>
            </Tooltip> */}
            {/*<Button*/}
                {/*color="primary"*/}
                {/*onClick={() => history.push('/member/add')}*/}
            {/*>*/}
                {/*{i18n.t('grid.ADD')}*/}
            {/*</Button>*/}
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

const GridListPermissions = props => {
    const {i18n} = useTranslation();
    const [hiddenColumnNames] = useState(['id']);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState([]);
    const [pageSizes] = useState([10, 25, 50]);
    const [loading, setLoading] = useState(props.loading);
    const [integratedSortingColumnExtensions] = useState([]);
    const [tableColumnExtensions] = useState(props.columnextension);

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
                {/* <Tooltip title={i18n.t('tooltip.UNLOCKMOBILEUSER')}>
                <IconButton color={'primary'}
                    onClick={() => isUnlockMobileUser(row.id,dispatch)}
                >
                        <LockOpen/>
                </IconButton>
                </Tooltip> */}
                {/* <Tooltip title={i18n.t('tooltip.DELETEUSER')}>
                <IconButton color={'primary'}
                    onClick={() => isDeleteAlert(row.id,row.name,dispatch,i18n)}
                >
                        <IconDelete/>
                </IconButton>
                </Tooltip> */}
                <Tooltip title={i18n.t('grid.DELETE')}>
                    <IconButton color={'primary'} ///MobileUser/detail
                        onClick={() => props.handleSubstractList(row.id)}
                        hidden={props.handleSubstractList?false:true}
                                // onClick={() => history.push('/member/saving-data-detail/' + row.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </TableEditColumn.Cell>
        );
    };

    return (
        <Paper style={{position: 'relative'}}>
            <Grid
                rows={props.rows}
                columns={props.columns}
                
            >
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
                {/* <SortingState
                    sorting={sorting}
                    onSortingChange={setSorting}
                />
                <IntegratedSorting
                    columnExtensions={integratedSortingColumnExtensions}
                /> */}
                <IntegratedPaging/>
                <VirtualTable
                    noDataCellComponent={noDataCell}
                    columnExtensions={tableColumnExtensions}
                />
                {/* <TableHeaderRow showSortingControls/> */}
                <TableHeaderRow/>
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
                    width={props.handleSubstractList?100:0}
                    // messages={editColumnMessages}
                />
                <PagingPanel
                    pageSizes={pageSizes}
                    messages={pagingPanelMessages}
                />
            </Grid>
                    {props.loading && <Loading/>}
        </Paper>

    )
}
export default GridListPermissions;