import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';

const AppointmentGraph = (props) => {
  NoDataToDisplay(Highcharts);
  const AppointmentConfig = {
    chart: {
      type: 'areaspline',
      backgroundColor: '#18181B',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: props.data?.map((x) => moment(x?.createdAt).format('DD-MM-YYYY')),
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
      areaspline: {
        fillOpacity: 0.01,
        stacking: 'normal',
        marker: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Appointment',
        lineColor: '#22C55E',
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#16A34A'],
            [1, '#18181B'],
          ],
        },

        data: props.data?.map((x) => x?.count)
      },
      // {
      //   name: 'Cance]led',
      //   lineColor: '#FACC15',
      //   color: {
      //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      //     stops: [
      //       [0, '#FACC15'],
      //       [1, '#18181B'],
      //     ],
      //   },
      //   data: [10, 20, 30, 17, 10, 18, 15, 16, 19, 22, 24, 26],
      // },
      // {
      //   name: 'No shows',
      //   lineColor: '#DC2626',
      //   color: {
      //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      //     stops: [
      //       [0, '#DC2626'],
      //       [1, '#18181B'],
      //     ],
      //   },
      //   data: [10, 20, 30, 17, 10, 8, 5, 6, 7, 6, 4, 2],
      // },
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
      <HighchartsReact highcharts={Highcharts} options={AppointmentConfig} />
    </div>
  )
}
export default AppointmentGraph
