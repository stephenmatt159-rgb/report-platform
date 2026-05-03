import ShowView from '@/components/show-view';
import { clients } from '@/constants/constants';
import React from 'react';
// adjust path if needed

const isCloseToExpiry = (endDate: string) => {
  if (!endDate) return false;
  const expiry = new Date(endDate);
  const today = new Date();
  const diffDays = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 150 && diffDays >= 0;
};

const latestClients = [...clients]
  .map((client) => {
    const farthestExpiry = client.projects
      .map((p) => p?.end_date)
      .filter(Boolean)
      .sort(
        (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
      )[0];

    return {
      ...client,
      _farthestExpiry: farthestExpiry ? new Date(farthestExpiry).getTime() : 0,
    };
  })
  .sort((a, b) => b._farthestExpiry - a._farthestExpiry)
  .slice(0, 8);

const clientsWithMoreProjects = [...clients]
  .filter((c) => c.projects.length > 1)
  .sort((a, b) => b.projects.length - a.projects.length);

const clientsWithExpiringProjects = clients
  .filter((client: any) =>
    client.projects.some((p: any) => isCloseToExpiry(p.end_date))
  )
  .map((client: any) => {
    // get the earliest expiry date for this client
    const nearestExpiry = client.projects
      .map((p: any) => p.end_date)
      .filter(Boolean)
      .sort(
        (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
      )[0];
    return {
      ...client,
      _nearestExpiry: nearestExpiry
        ? new Date(nearestExpiry).getTime()
        : Infinity,
    };
  })
  .sort((a: any, b: any) => a._nearestExpiry - b._nearestExpiry); // soonest first

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className=" p-4 rounded-xl shadow">
    <h2 className="font-semibold mb-3">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

const ClientTile = ({ client }: { client: any }) => {
  const nextExpiry = client.projects
    .map((p: any) => p.end_date)
    .filter(Boolean)
    .sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    )[0];

  return (
    <div className="border border-primary rounded-lg p-4  shadow-sm">
      <div className="flex justify-between items-start">
        <p className="font-semibold capitalize">{client.name}</p>
        <span className="text-xs bg-gray-900 px-2 py-1 rounded">
          {client.type}
        </span>
      </div>

      <p className="text-sm  mt-1">📞 {client.contact || 'No contact'}</p>

      <p className="text-sm ">📁 {client.projects.length} project(s)</p>

      <p className="text-sm ">⏳ Next expiry: {nextExpiry || 'N/A'}</p>
    </div>
  );
};

const page = () => {
  return (
    <div className="dashboard-padder space-y-6">
      <Card
        title={`⏳ Projects Close to Expiry: ${clientsWithExpiringProjects.length}`}
      >
        {clientsWithExpiringProjects.map((c: any) => (
          <ClientTile key={c.name} client={c} />
        ))}
      </Card>

      <Card title={`🕒 Latest Clients: ${latestClients.length}`}>
        {latestClients.map((c) => (
          <ClientTile key={c.name} client={c} />
        ))}
      </Card>

      <Card
        title={`📈 Clients with More Projects: ${clientsWithExpiringProjects.length}`}
      >
        {clientsWithMoreProjects.map((c) => (
          <ClientTile key={c.name} client={c} />
        ))}
      </Card>

      <ShowView when={false}>
        <Card title={`👥 All Clients: ${clients.length}`}>
          {clients.map((c: any) => (
            <ClientTile key={c.name} client={c} />
          ))}
        </Card>
      </ShowView>
    </div>
  );
};

export default page;
