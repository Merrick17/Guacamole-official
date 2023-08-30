import StatisticsCardContainer from './statistics-card-container';

import dynamic from 'next/dynamic';

const LiquidityAllocationChart = dynamic(
  () => import('./liquidity-allocation-chart'),
  { ssr: false }
);

const LiquidityAllocation = () => {
  return (
    <StatisticsCardContainer className="flex flex-col gap-6">
      <header className="text-lg font-semibold">Liquidity Allocation</header>
      <div className="flex flex-row items-center justify-between gap-4">
        <ul className="flex flex-col  w-full gap-3">
          {list.map((item, index) => (
            <LiquidityItem key={index} {...item} />
          ))}
        </ul>
        <LiquidityAllocationChart data={list} />
      </div>
      <div className="border-t border-[#E5E7EB] pt-4 flex items-center gap-4 ">
        <Icon />{' '}
        <p className="text-sm text-muted-foreground font-medium">
          Finding the best yield
        </p>
      </div>
    </StatisticsCardContainer>
  );
};

export default LiquidityAllocation;

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clip-path="url(#clip0_1285_3952)">
        <path
          d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
          stroke="black"
          stroke-opacity="0.1"
          stroke-width="2"
        />
        <path
          d="M13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7Z"
          stroke="#FCFCFC"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="37.7 37.7"
        />
      </g>
      <defs>
        <clipPath id="clip0_1285_3952">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const LiquidityItem = ({ name, value, color }) => {
  return (
    <li className=" w-full flex flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 capitalize">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <span className="">{name}</span>
      </div>
      <span className="uppercase">
        {new Intl.NumberFormat('en-US').format(value)} SOL
      </span>
    </li>
  );
};

const list = [
  {
    name: 'Francium',
    value: 11082.62,
    color: '#832941',
  },
  {
    name: 'Tulip',
    value: 6383.58,
    color: '#E74267',
  },
  {
    name: 'Vault Reserve',
    value: 2537.33,
    color: '#FF6901',
  },
  {
    name: 'Frakt ABC',
    value: 2228.24,
    color: '#FDB703',
  },
  {
    name: 'Frakt DeGods',
    value: 2228.24,
    color: '#18DFB4',
  },
  {
    name: 'Others',
    value: 8275.92,
    color: '#24AEEF',
  },
];
