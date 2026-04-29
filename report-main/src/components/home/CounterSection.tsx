'use client';

import CountUp from 'react-countup';
import { PlatformStat } from '@/types';

interface CounterSectionProps {
  stats: PlatformStat[];
}

export default function CounterSection({ stats }: CounterSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                <CountUp end={stat.value} start={0} duration={2.5} autoAnimate/>
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}