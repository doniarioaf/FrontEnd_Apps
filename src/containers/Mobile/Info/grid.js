import React, {useState, useEffect} from 'react';
import Paper                        from '@material-ui/core/Paper';
import {
    PagingState,
    SortingState,
    IntegratedSorting,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
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
import {useTranslation}             from 'react-i18next';
import {useHistory}                 from 'react-router-dom';
import Tooltip                      from '@material-ui/core/Tooltip';
import IconButton                   from '@material-ui/core/IconButton';
import IconView from '../../../components/Icons/iconView';
import EditIcon from '@material-ui/icons/Edit';
import IconAdd from '../../../components/Icons/IconAdd';
import * as pathmenu           from '../../shared/pathMenu';
import {Loading}                    from '../../../components/Common/Loading';

const FilterIcon = ({type, ...restProps}) => {
    return <TableFilterRow.Icon type={type} {...restProps} />;
};
const StatusFormatter = ({value}) => (
    <b>
        {value.id === 300 ? <span className="ml-auto circle bg-success circle-lg"/> : null}
        {value.id === 100 ? <span className="ml-auto circle bg-warning circle-lg"/> : null}
        {value.value}
    </b>
);

const FilterCell = props => {
    if (props.column.name === "statuss")
        return <TableCell className={props.className}/>;
    else return <TableFilterRow.Cell {...props} />;
};

const AddButton = ({onExecute}) => {
    const history = useHistory();
    const i18n = useTranslation('translations');
    return (
        <div style={{textAlign: 'center'}} title={i18n.t('Add')}>
            <Tooltip title={i18n.t('Add')}>
                <IconButton color={'primary'} onClick={() => history.push(pathmenu.addinfo)} >
                    <IconAdd/>
                </IconButton>
            </Tooltip>
            {/*<Button*/}
                {/*color="primary"*/}
                {/*onClick={() => history.push('/member/add')}*/}
            {/*>*/}
                {/*{i18n.t('grid.ADD')}*/}
            {/*</Button>*/}
        </div>
    );
};

const CellComponent = ({children, row, ...restProps}) => {
    const {i18n} = useTranslation('translations');
    const history = useHistory();
    // const dispatch = useDispatch();
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
            <Tooltip title={i18n.t('Edit')}>
                <IconButton color={'primary'} 
                            onClick={() => history.push(pathmenu.editcustomertype +'/'+ row.id)}
                >
                    <IconView/>
                </IconButton>
            </Tooltip>
        </TableEditColumn.Cell>
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


const InfoGrid = props => {
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
                <FilteringState defaultFilters={[]}/>
                <IntegratedFiltering/>
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
                <TableColumnVisibility
                    hiddenColumnNames={hiddenColumnNames}
                />
                <TableFilterRow
                    showFilterSelector
                    cellComponent={FilterCell}
                    iconComponent={FilterIcon}
                    messages={filterRowMessages}
                />
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
export default InfoGrid;