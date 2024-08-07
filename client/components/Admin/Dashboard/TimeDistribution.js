import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const TimeDistributionGraph = () => {
  const TimeDistribution = {
    chart: {
      type: 'column',
      backgroundColor: '#18181B',
    },
    itemCheckboxStyle: {
      width: '10px',
      height: '13px',
      position: 'absolute',
    },
    title: {
      text: ' Wait Time Distribution',
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
        '< 4min',
        ' 5-9 min',
        ' 10-14 min',
        '15-19 min',
        '20-24 min',
        '25-29 min',
        '30-44 min',
        ' >35 min',
      ],
      lineColor: 'yellow',
      lineWidth: 1,
      title: {
        text: 'Wait Time',
        backgroundColor: '#FFF',
        style: {
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
        },
        y: 15,
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
      column: {
        showInLegend: false,
      },

      series: {
        pointWidth: 1,
      },
    },
    series: [
      {
        name: 'Waitlisted',
        lineColor: 'green',
        data: [0, 7, 4, 11, 20, 14, 30, 10],
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={TimeDistribution} />
    </div>
  )
}

export default TimeDistributionGraph
