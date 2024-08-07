import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';
import React from 'react';

const RevenueGraph = (props) => {
  NoDataToDisplay(Highcharts);
  const RevenueConfig = {
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
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Revenue',
        color: '#22C55E',
        data: props.data?.map((x) => x?.count)
      },
    ],
    lang: {
      noData: 'No Data',
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030',
      },
    },
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={RevenueConfig} />
    </div>
  )
}

export default RevenueGraph
