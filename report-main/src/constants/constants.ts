interface Projects {
  name: string;
  desc: string;
  mail: string[];
  start_date: string;
  end_date: string;
}

export interface clientProps {
  name: string;
  contact: string;
  date: string;
  type: string;
  projects: Projects[];
}

export const clients: clientProps[] = [
  {
    name: 'Michael Carter',
    contact: '+14435551234',
    date: 'Feb 12, 2026',
    type: 'Crypto Investment Recovery',
    projects: [
      {
        name: 'BTC Recovery Case #1042',
        desc: '',
        mail: ['michael.carter@email.com'],
        start_date: 'Feb 15, 2026',
        end_date: 'Feb 15, 2026',
      },
    ],
  },
];
