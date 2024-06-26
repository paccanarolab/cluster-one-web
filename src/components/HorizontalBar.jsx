import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const HorizontalBar = ({ dataset, height }) => {
  const valueFormatter = (value) => `${value}mm`;
  const sortedDataset = dataset.slice().sort((a, b) => b.bar_charge - a.bar_charge);
  return (
    <BarChart
      dataset={sortedDataset}
      yAxis={
        [
          { 
            scaleType: 'band',
            dataKey: 'go_id',
            order: 'original',
            padding: 0.3,
            labelFontSize: 12,
          }
        ]
      }
      series={
        [
          { 
            dataKey: 'bar_charge', 
            label: '-log(p_value)', 
            valueFormatter,
          },
        ]
      }
      layout="horizontal"
      width={1500}
      height={height}
      margin={{
        top: 100,
        right: 100,
        bottom: 100,
        left: 700,
      }}
    />
  );
}

export { HorizontalBar };
