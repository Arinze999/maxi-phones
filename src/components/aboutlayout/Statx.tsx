import React from 'react';
import StatxCard from './StatxCard';

const data = [
  {
    src: '/imgs/stat1.png',
    title: '10.5k',
    subtitle: 'Sallers active on our site',
  },
  { src: '/imgs/stat4.png', title: '33k', subtitle: 'Monthly Produduct Sale' },
  {
    src: '/imgs/stat3.png',
    title: '45.5k',
    subtitle: 'Customer active in our site',
  },
  {
    src: '/imgs/stat4.png',
    title: '10.5k',
    subtitle: 'Anual gross sale in our site',
  },
];

const Statx = () => {
  return (
    <div className="py-10 flex flex-wrap flex-col md:flex-row justify-center md:justify-between items-center gap-5">
      {data.map((item, index) => (
        <StatxCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Statx;
