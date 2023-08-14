'use client';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const LiquidityAllocationChart = ({
  data,
}: {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}) => {
  return (
    <div className="w-max flex items-center justify-center">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default LiquidityAllocationChart;
