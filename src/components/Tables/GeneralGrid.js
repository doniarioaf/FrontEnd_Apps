import React, {useState} from 'react';
import {
    PagingState,
    SortingState,
    IntegratedSorting,
    DataTypeProvider,
    EditingState,
    FilteringState,
    IntegratedFiltering
}                        from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow,TableBandHeader,PagingPanel,
    TableColumnVisibility, TableEditColumn,TableEditRow,TableFilterRow,
}                        from '@devexpress/dx-react-grid-material-ui';
import Paper             from '@material-ui/core/Paper';
import Tooltip                      from '@material-ui/core/Tooltip';
import {ActionColumns}   from '../../components/Common/ActionColumn';
import {useTranslation}             from 'react-i18next';
import { IconButton } from '@material-ui/core';
import CheckBoxIcon                    from '@material-ui/icons/Done';
import {Container,Card, CardBody} from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import {useHistory}                 from 'react-router-dom';
import IconAdd from '../../components/Icons/IconAdd';
import IconView from '../../components/Icons/iconView';
import {useDispatch}   from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Loading } from '../../components/Common/Loading';

const FilterIcon = ({type, ...restProps}) => {
    return <TableFilterRow.Icon type={type} {...restProps} />;
};

const FilterCell = props => {
    if (props.column.name === "statuss")
        return <TableCell className={props.className}/>;
    else return <TableFilterRow.Cell {...props} />;
};

const BalanceFormatter = ({value}) => (
    value < 0 ?
        <b style={{color: 'red'}}>
            {value}
        </b>
        :
        <b style={{color: 'darkblue'}}>
            {value}
        </b>
);

const BalanceTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BalanceFormatter}
        {...props}
    />
);

const StatusFormatter = ({value}) => (
    
    <b>
        
        {value !== '' ? <IconButton color={'primary'}> <CheckBoxIcon/></IconButton> : null}
        {/* {value !== '' ? <span className="ml-auto circle bg-success circle-lg"/> : null} */}
        {/* {value.paiddate === 100 ? <span className="ml-auto circle bg-warning circle-lg"/> : null} */}
        {value}
    </b>
);

const StatusTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={StatusFormatter}
        {...props}
    />
);
const cellStyles = theme => ({
    icon: {
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
      verticalAlign: 'middle',
    },
  });

const BandCellBase = ({
    children, tableRow, tableColumn, column, classes, ...restProps
  }) => {
    // let icon = null;
    // if (column.title === 'Population') icon = <People className={classes.icon} />;
    // if (column.title === 'Nominal GDP') icon = <Equalizer className={classes.icon} />;
    // if (column.title === 'By Sector') icon = <PieChart className={classes.icon} />;
    return (
      <TableBandHeader.Cell
        {...restProps}
        column={column}
      >
          <div style={{marginLeft:'41%'}}>
        <strong>
          {children}
          {/* {icon} */}
        </strong>
        </div>
      </TableBandHeader.Cell>
    );
  };
  const BandCell = withStyles(cellStyles, { name: 'BandCell' })(BandCellBase);

  const GeneralGrid = props => {
    const i18n = useTranslation('translations');
    const [rows] = useState([]);
    // const [loading, setLoading] = useState(props.loading);
    const [sorting,setSorting] = useState(props.sorting?props.sorting:[]);
    const [columns] = useState(props.columns?props.columns:[]);
    const [sortingStateColumnExtensions] = useState(props.ColumnExtensions?props.ColumnExtensions:[]);
    const [tableColumnExtensions] = useState(props.tableColumnExtensions?props.tableColumnExtensions:[]);
    const [columnBands] = useState(props.columnBands?props.columnBands:[]);
    const [statusColumn] = useState(props.statusColumn?props.statusColumn:[]);
    const [balanceColumns] = useState(props.balanceColumns?props.balanceColumns:[]);
    const [hiddenColumnNames] = useState(props.hiddenColumnNames?props.hiddenColumnNames:[]);
    const [editingStateColumnExtensions] = useState(props.editingStateColumnExtensions?props.editingStateColumnExtensions:[]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSizes] = useState([10, 25, 50]);

    const history = useHistory();

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

    const showFilterButton = (type,value) => {
        let flag = true;
        if(type == 'edit'){
            //hidden={props.showedit !== undefined ? props.showedit:true }
            if(props.showedit !== undefined && props.showedit !== null){
                flag = props.showedit;
                if(!props.showedit){
                    if(props.filtershowedit !== undefined && props.filtershowedit !== null){
                        if(value !== undefined && value !== null){
                            if(props.filtershowedit.length > 0){
                                if(props.filtershowedit.indexOf(value) > -1){
                                    flag = false;
                                }else{
                                    flag = true;
                                }
                            }
                        }
                    }
                }
            }
        }else if(type == 'delete'){
            //hidden={props.handleSubstractList == undefined || props.showdelete !== undefined?props.showdelete:true}
            if(props.showdelete !== undefined && props.showdelete !== null){
                flag = props.showdelete;
                if(!props.showdelete){
                    if(props.filtershowdelete !== undefined && props.filtershowdelete !== null){
                        if(value !== undefined && value !== null){
                            if(props.filtershowdelete.indexOf(value) > -1){
                                flag = false;
                            }else{
                                flag = true;
                            }
                        }
                    }
                }
            }
        }else if(type == 'add'){
            if(props.showadd !== undefined && props.showadd !== null){
                flag = props.showadd;
            }
        }else if(type == 'view'){
            if(props.showview !== undefined && props.showview !== null){
                flag = props.showview;
            }
        }
        return flag;
    }

    const CellComponent = ({children, row, ...restProps}) => {
        const {i18n} = useTranslation('translations');
        const history = useHistory();
        const dispatch = useDispatch();
        return (
            <TableEditColumn.Cell row={row} {...restProps}>
                {children}
                <Tooltip title={i18n.t('View')}>
                    <IconButton color={'primary'} 
                                onClick={() => props.handleShowViewAction(row.id)}
                                hidden={showFilterButton('view',row.filtershowview) }
                    >
                        <IconView/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={i18n.t('Edit')}>
                    <IconButton color={'primary'} ///MobileUser/detail
                        onClick={() => props.handleShowEditColumn(row.id)}
                        hidden={showFilterButton('edit',row.filtershowedit) }
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                
                <Tooltip title={i18n.t('Delete')}>
                    <IconButton color={'primary'} ///MobileUser/detail
                        onClick={() => props.handleSubstractList(row.id)}
                        hidden={showFilterButton('delete',row.filtershowdelete) }
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>

                {/* <Tooltip title={i18n.t('label_WAIVED_CHARGES')}>
                    <IconButton color={'primary'} ///MobileUser/detail
                        onClick={() => props.handleWaive(row.id)}
                        // hidden={row.id == 1}
                        hidden={props.showwaivechargesbasedcharge !== undefined?props.showwaivechargesbasedcharge(row.datacharge):true}
                    >
                        <FlagIcon/>
                    </IconButton>
                </Tooltip> */}

            </TableEditColumn.Cell>
        );
    };

    const AddButton = ({onExecute}) => {
        const history = useHistory();
        const i18n = useTranslation('translations');
        return (
            <div style={{textAlign: 'center'}} title={i18n.t('grid.ADD')}>
                <Tooltip title={i18n.t('grid.ADD')}>
                    <IconButton color={'primary'} 
                    hidden={showFilterButton('add','') }
                    onClick={() => props.handleAddAction()}
                    >
                        <IconAdd/>
                    </IconButton>
                </Tooltip>
                {/* <Button */}
                    {/*color="primary"*/}
                    {/*onClick={() => history.push('/member/add')}*/}
                {/*>*/}
                    {/*{i18n.t('grid.ADD')}*/}
                {/*</Button> */}
            </div>
        );
    };
    const commandComponents = {
        add: AddButton,
    };
    //id: 'add' | 'edit' | 'delete' | 'commit' | 'cancel';
    const Command = ({id, onExecute}) => {
        const CommandButton = commandComponents[id];
        return (
            <CommandButton
                onExecute={onExecute}
            />
        );
    };

    const [actionColumns] = useState([
        // {
        //     columnName: "view",
        //     label: "View Receipt",
        //     onClick: handleViewReceipt,
        //     icon: <IconReceipt color="primary"/>,
        // }
    ]);
    const widthGrid = () => {
        let count = 0;
        if(props.showedit !== undefined){
            if(!props.showedit){
                count = count + 1;
            }
        }
        if(props.showdelete !== undefined){
            if(!props.showdelete){
                count = count + 1;
            }
        }
        if(props.showview !== undefined){
            if(!props.showview){
                count = count + 1;
            }
        }
        return count * 80;
    }

    return (
        // <ContentWrapper>
        //     <Container>
        //     <Card>
        //     <CardBody>
            <Paper style={{position: 'relative'}}>
            <Grid
                 rows={props.rows}
                 columns={props.columns}
             >
            <BalanceTypeProvider for={balanceColumns}/>
            <StatusTypeProvider
                for={statusColumn}
            />
            <EditingState 
            // columnExtensions={editingStateColumnExtensions}
            onCommitChanges={() => {}}
            />
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
                columnExtensions={sortingStateColumnExtensions}
            />
            <IntegratedSorting/>
            
            <Table
                columnExtensions={tableColumnExtensions}
            />
            <TableHeaderRow showSortingControls/>
            
            <TableColumnVisibility hiddenColumnNames={hiddenColumnNames}/>
            {
                props.showfilter?
                (<TableFilterRow
                    showFilterSelector
                    cellComponent={FilterCell}
                    iconComponent={FilterIcon}
                    messages={filterRowMessages}
                />):''
            }
            
            <TableEditRow/>
            <TableEditColumn
                showAddCommand
            //  showEditCommand
                // showDeleteCommand
                cellComponent={CellComponent}
                commandComponent={Command}
                width={widthGrid()}
                // messages={editColumnMessages}
            />
            <ActionColumns actionColumns={actionColumns}/>
                 
            {/* <TableHeaderRow /> */}
            <TableBandHeader
            columnBands={columnBands}
            cellComponent={BandCell}
            />
            <PagingPanel
                pageSizes={pageSizes}
                messages={pagingPanelMessages}
            />
            </Grid>
            {props.loading && <Loading/>}
            </Paper>
            // </CardBody>
            // </Card>
            // </Container>
            
        // </ContentWrapper>
        
    );
  }
  export default GeneralGrid;