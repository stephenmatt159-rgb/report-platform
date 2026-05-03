const people = () => '/people';
const peopleId = (id: string = '') => `${people()}/${id}`;
const analytics = () => '/track/analytics';
const visitors = () => '/track/visitors';

export const apiRoutes = {
  people,
  peopleId,
  analytics,
  visitors,
};
