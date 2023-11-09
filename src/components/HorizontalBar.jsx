import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const HorizontalBar = ({ dataset }) => {
  const valueFormatter = (value) => `${value}mm`;
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'go_label'}]}
      series={[{ dataKey: 'bar_charge', label: '-log(p_value)', valueFormatter }]}
      layout="horizontal"
      width={dataset.length * 50}
      height={dataset.length * 50}
    />
  );
}

export { HorizontalBar };
