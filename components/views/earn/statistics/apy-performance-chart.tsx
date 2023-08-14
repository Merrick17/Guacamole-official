'use client';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '',
    pv: 2.9,
  },
  {
    name: '19:00',

    pv: 3.25,
  },
  {
    name: '22:00',

    pv: 2.7,
  },
  {
    name: '01:00',

    pv: 2.2,
  },
  {
    name: '04:00',

    pv: 3.2,
  },
  {
    name: '07:00',

    pv: 3.1,
  },
  {
    name: '10:00',

    pv: 2.6,
  },
  {
    name: '13:00',

    pv: 2.7,
  },
  {
    name: '16:00',
    pv: 2.9,
  },
];
const ApyPerformanceChart = () => {
  return (
    <ResponsiveContainer width={'100%'} height={355}>
      <LineChart width={500} height={355} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#9CA3AF " />
        <YAxis domain={['auto', 'auto']} stroke="#9CA3AF" />
        <Tooltip />
        <Line
          type="linear"
          dataKey="pv"
          stroke="#4E8341"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ApyPerformanceChart;
