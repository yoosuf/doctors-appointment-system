import React, { useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment'
const NewCustomerGraph = (props) => {
  useEffect(() => {
    NoDataToDisplay(Highcharts);
  }, [])

  const NewCustomerConfig = {
    chart: {
      type: 'column',
      backgroundColor: '#18181B',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: props.data?.map((x) => moment(x?.createdAt).format('DD-MM-YYYY')),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      labels: {
        format: '{value}',
      },
      gridlineColor: '#363636',
      gridLineWidth: 0.2,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        showInLegend: false,
      },
    },
    credits: {
      enabled: false,
    },
    lang: {
      noData: 'No Data',
    },
    noData: {
      position: {
        "x": 0,
        "y": 0,
        "align": "center",
        "verticalAlign": "middle"
      },
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030',
      },
    },
    series: [
      {
        name: 'New Customer',
        color: '#14B8A6',
        data: props.data?.map((x) => x?.count)
      },
    ],

  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={NewCustomerConfig} />
    </div>
  )
}

export default NewCustomerGraph
