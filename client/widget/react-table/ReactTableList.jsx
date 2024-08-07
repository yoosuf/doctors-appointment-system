import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Loader from '../loader'
import Pagination from '../Pagination/Pagination'

class ReactTableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draw: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        draw: parseInt(this.props.page || 0, 10) + 1,
      })
    }
  }

  render() {
    const TableLength = this.props.data === 0 ? this.props.data : 5
    const {
      showPagination = false,
      tableLength = TableLength,
      hideHeight = false,
      paginator,
      module,
      data,
      setPaginator,
      setTableData,
      populate,
      setLoading,
      dataQueryOptions,
      loading,
    } = this.props

    return (
      <>
        <div className='relative animated fadeIn sh-table table-h-adj common-scrollbar'>
          <ReactTable
            minRows={this.props.minRows}
            getTrProps={(state, rowInfo, column, instance) => {
              if (
                state?.resolvedData?.length &&
                this.props.rowTrProps &&
                rowInfo
              ) {
                return {
                  onMouseEnter: e => {
                    this.setState({
                      // eslint-disable-next-line react/no-unused-state
                      hoveredRow: rowInfo.index,
                    })
                  },
                  onMouseLeave: e => {
                    this.setState({
                      // eslint-disable-next-line react/no-unused-state
                      hoveredRow: null,
                    })
                  },
                }
              }
              return {}
            }}
            columns={this.props.columns}
            manual
            className={this.props.className}
            pages={Math.ceil(this.props.recordsFiltered / TableLength)}
            data={this.props.data}
            pageSize={this.props?.tableLength || tableLength}
            showPagination={showPagination}
            showPageSizeOptions={false}
            loading={false}
            renderPageJump={({
              onChange,
              onBlur,
              onKeyPress,
              inputType,
              pageJumpText,
            }) => (
              <div className='-pageJump'>
                <input
                  aria-label={pageJumpText}
                  type={inputType}
                  min={1}
                  max={Math.ceil(this.props.recordsFiltered / TableLength)}
                  onChange={e => {
                    this.setState({
                      draw: e.target.value,
                    })
                    onChange(e)
                  }}
                  defaultValue={this.state.draw || 1}
                  onBlur={onBlur}
                  onKeyPress={onKeyPress}
                />
              </div>
            )}
            onFetchData={(state, instance) =>
              this.props.fetchData ? this.props.fetchData(state, instance) : ''
            }
            defaultPageSize={tableLength}
            sortable={false}
            previousText={'<'}
            nextText={'>'}>
            {(state, makeTable, instance) => (
              <div>
                {this.props.tableData
                  ? this.props.tableData(state, instance)
                  : ''}

                {this.props.makeTable && this.props.draggable
                  ? this.props.makeTable(state.data)
                  : null}
                <div>{this.props.sidebar}</div>
                <div
                  className={!hideHeight ? 'react-table-content' : ''}
                  hidden={this.props.makeTable && this.props.draggable}>
                  <div className={!hideHeight ? 'react-table-portlet' : ''}>
                    {this.props.chartData ? (
                      <div className='chart-data'>{this.props.chartData()}</div>
                    ) : (
                      ''
                    )}
                    {this.props.wrapperComponent}
                    {makeTable()}
                  </div>
                </div>
              </div>
            )}
          </ReactTable>
          {loading && <Loader customClass='absolute' />}
        </div>
        <Pagination
          paginator={paginator}
          module={module}
          setPaginator={setPaginator}
          setTableData={setTableData}
          populate={populate}
          setLoading={setLoading}
          dataQueryOptions={dataQueryOptions}
        />
      </>
    )
  }
}

/*
function propsAreEqual(prevProps, nextProps) {
  return prevProps.loading === nextProps.loading && nextProps.loading && prevProps.loading;
} */

export default ReactTableList
