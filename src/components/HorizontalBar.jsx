import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const HorizontalBar = ({ dataset, height }) => {
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
      series={[
          { 
            dataKey: 'bar_charge',
          },
        ]
      }
      layout="horizontal"
      width={600}
      height={height}
      margin={{
        top: 20,
        left: 100,
      }}
      grid={{ vertical: true }}
      onItemClick={(event, data) => {
        console.log(data);
      } }
      // topAxis={{
      //   label: '-log(p_value)',
      //   labelFontSize: 12,
      // }}
    />
  );
}

export { HorizontalBar };
