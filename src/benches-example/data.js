
export default function getBenches() {
  return Promise.resolve([
    {
      id: 1,
      description: 'Astoria',
      latitude: 40.766302,
      longitude: -73.941133,
    },
    {
      id: 2,
      description: 'Dutch Kills',
      latitude: 40.755314,
      longitude: -73.949630,
    },
    {
      id: 3,
      description: 'Astoria Park',
      latitude: 40.778130,
      longitude: -73.923267,
    },
  ]);
}
