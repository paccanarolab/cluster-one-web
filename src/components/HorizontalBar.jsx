import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const HorizontalBar = ({ dataset }) => {
  // Set minimum height to ensure adequate bar size for small datasets
  const height = dataset.length < 15 ? Math.max(dataset.length * 50, 150) : dataset.length * 25;

  const getDataByIndex = (index) => {
    return dataset[index];
  }

  return (
    <BarChart
      dataset={dataset}
      yAxis={[
          { 
            scaleType: 'band',
            dataKey: 'term',
            order: 'original',
            padding: 0.3,
            labelFontSize: 12,
          }
      ]}
      series={[
          { 
            dataKey: 'bar_charge',
          },
      ]}
      slotProps={{ legend: { hidden: true } }}
      layout="horizontal"
      width={2000}
      height={height}
      margin={{
        right: 1000,
        left: 500,
      }}
      grid={{ vertical: true }}
      onItemClick={
        (event, item) => {
          window.open(`https://www.ebi.ac.uk/QuickGO/GTerm?id=${getDataByIndex(item.dataIndex).go_id}`, '_blank');
        }}
      bottomAxis={null}
      topAxis={{
        label: '-log(p_value)',
        labelFontSize: 12,
      }}
      rightAxis={{}}
      leftAxis={null}
    />
  );
}

export { HorizontalBar };