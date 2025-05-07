import React from 'react';
import TeamCard from './TeamCard';

const data = [
  {
    src: '/imgs/team1.png',
    title: 'John Obi',
    subtitle: 'Founder & Chairman',
  },
  {
    src: '/imgs/team2.png',
    title: 'Cindy Modupe',
    subtitle: 'Managing Director',
  },
  {
    src: '/imgs/team3.png',
    title: 'Lisa Peterson',
    subtitle: 'Product Designer',
  },
];

const Team = () => {
  return (
    <div className="py-10 flex flex-col flex-wrap md:flex-row justify-center items-center gap-5">
      {data.map((item, index) => (
        <TeamCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Team;
