import Chart from 'react-apexcharts';

const dadosPadrao = [
  { rotulo: 'Seg', valor: 120 },
  { rotulo: 'Ter', valor: 150 },
  { rotulo: 'Qua', valor: 180 },
  { rotulo: 'Qui', valor: 140 },
  { rotulo: 'Sex', valor: 250 },
  { rotulo: 'Sáb', valor: 450 },
  { rotulo: 'Dom', valor: 300 },
];

const GraficoFinanceiro = ({ dados }) => {
  const pontos = dados && dados.length ? dados : dadosPadrao;

  const chartData = {
    series: [
      {
        name: 'Receita',
        data: pontos.map((p) => Number(p.valor)),
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: '#ececec' },
      xaxis: {
        categories: pontos.map((p) => p.rotulo),
        labels: { style: { colors: '#6b7280', fontSize: '13px' } },
      },
      yaxis: {
        labels: {
          formatter: (val) => 'R$ ' + val,
          style: { colors: '#6b7280', fontSize: '13px' },
        },
      },
      tooltip: { theme: 'light' },
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
