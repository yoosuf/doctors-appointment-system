import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TrendsGraph = () => {
  const TrendsObj = {
    chart: {
      type: 'spline',
      height: '300px',
      backgroundColor: '#18181B',
    },
    itemCheckboxStyle: {
      width: '10px',
      height: '13px',
      position: 'absolute',
    },
    title: {
      text: 'Trends',
      align: 'left',
      verticalAlign: 'top',
      backgroundColor: '#FFF',

      style: {
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
      },
      y: 15,
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      floating: true,
      shadow: false,
      color: '#FFF',
      backgroundColor: 'white',
      style: {
        color: 'white',
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      title: {
        text: 'Time',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: 'value',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
        },
      },
    },

    plotOptions: {
      spline: {
        stacking: 'normal',
        lineWidth: 2,
      },

      series: {
        marker: {
          enabled: false,
        },
      },
    },

    series: [
      {
        name: 'Waitlisted',
        lineColor: '#22C55E',
        data: [
          0, 7, 4, 11, 20, 14, 30, 10, 7, 17, 20, 8, 13, 9, 15, 26, 17, 13, 19,
          20, 14, 22, 13, 4, 10, 15, 12, 24, 14, 16, 12,
        ],
      },
      {
        name: 'Bookings',
        lineColor: '#14B8A6',
        data: [
          0, 7, 4, 11, 20, 14, 30, 10, 7, 17, 20, 8, 13, 9, 15, 26, 17, 13, 19,
          20, 14, 22, 13, 4, 10, 15, 12, 24, 14, 16, 12,
        ],
      },
      {
        name: 'Served',
        lineColor: '#FACC15',
        data: [
          0, 7, 4, 11, 20, 14, 30, 10, 7, 17, 20, 8, 13, 9, 15, 26, 17, 13, 19,
          20, 14, 22, 13, 4, 10, 15, 12, 24, 14, 16, 12,
        ],
      },
      {
        name: 'No Shows',
        lineColor: '#DC2626',
        data: [
          0, 7, 4, 11, 20, 14, 30, 10, 7, 17, 20, 8, 13, 9, 15, 26, 17, 13, 19,
          20, 14, 22, 13, 4, 10, 15, 12, 24, 14, 16, 12,
        ],
      },
    ],
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={TrendsObj} />
    </div>
  )
}

export default TrendsGraph
