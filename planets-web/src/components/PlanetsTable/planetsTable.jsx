/* eslint-disable react/prop-types */
import { planetColumns, conditionalRowStyles } from '../../utils/configData'
import DataTable from 'react-data-table-component'
import PlanetDetails from '../PlanetDetails/PlanetDetails'
import Select from 'react-select'
import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const PlanetsTable = ({ planets, currentPage, totalPages, fetchPlanets }) => {
  const [hiddenColumns, setHiddenColumns] = useState([])
  const general = useSelector((state) => state.general)

  // looks for the saved hidden columns on localStorage and load them
  useEffect(() => {
    const savedHiddenColumnsRaw = localStorage.getItem(_.upperCase(general.CONQUEROR_NAME))
    if (!_.isNil(savedHiddenColumnsRaw)) {
      setHiddenColumns(JSON.parse(savedHiddenColumnsRaw))
    }
  }, [])

  // ask for the next page with the current filters
  const handleTableChange = (page) => {
    fetchPlanets(page)
  }

  // builds the columns and each cell, in case of the content a number, it will be formatted
  const columns = useMemo(() => {
    return Object.keys(planetColumns).map((key) => ({
      name: planetColumns[key],
      value: key,
      selector: (row) => row[key],
      cell: (row) => _.isInteger(Number(row[key])) ? Number(row[key]).toLocaleString('en-US') : row[key]
    }))
  }, [])

  // builds the columns to be showed on the hidden column component
  const options = useMemo(() => {
    return columns.map((column) => ({
      label: column.name,
      value: column.value
    }))
  }, [columns])

  // updates the selected hidden columns on the component and on the localStorage for that conqueror name
  const handleChangeColumns = selectedOptions => {
    const selectedColumns = selectedOptions.map(option => option.value)
    setHiddenColumns(selectedColumns)

    localStorage.setItem(_.upperCase(general.CONQUEROR_NAME), JSON.stringify(selectedColumns))
  }

  return (
    <div className='container planets-table col-md-12'>
      <div className='hidden-columns-container'>
        <label>Hidden Columns:</label>
        <Select
          isMulti
          options={options}
          value={hiddenColumns.map(column => ({ label: _.upperCase(column), value: column }))}
          onChange={handleChangeColumns}
          placeholder="Select columns to hide..."
        />
      </div>
      <DataTable
        title='Planets'
        columns={columns.filter(column => !hiddenColumns.includes(column.value))}
        data={planets}
        pagination
        paginationServer
        expandableRowsComponent={(row) => <PlanetDetails row={row} />}
        expandableRows
        paginationTotalRows={totalPages * planets.length}
        onChangePage={page => handleTableChange(page)}
        paginationDefaultPage={currentPage}
        subHeader
        conditionalRowStyles={conditionalRowStyles}
        highlightOnHover
        dense
        noHeader
        expandableRowsComponentMemo
      />
    </div>
  )
}

export default PlanetsTable
