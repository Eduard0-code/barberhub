// components/GraficoFinanceiro.jsx

import Chart from 'react-apexcharts';

const GraficoFinanceiro = () => {
  const chartData = {
    series: [
      {
        name: 'Receita',
        data: [120, 150, 180, 140, 250, 450, 300],
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },

        zoom: {
          enabled: false,
        },
      },

      stroke: {
        curve: 'smooth',
        width: 3,
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: '#ececec',
      },

      xaxis: {
        categories: [
          'Seg',
          'Ter',
          'Qua',
          'Qui',
          'Sex',
          'Sáb',
          'Dom',
        ],

        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '13px',
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '13px',
          },
        },
      },

      tooltip: {
        theme: 'light',
      },

      colors: ['#1f2937'],
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={320}
    />
  );
};

export default GraficoFinanceiro;