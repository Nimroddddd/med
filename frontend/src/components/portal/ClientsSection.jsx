import { useEffect, useState } from 'react';
import { getClients } from '../../api/clients';

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError('Failed to load clients.');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Information</h2>
      {clients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No clients found.</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-primary/10 text-primary">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{client.name}</td>
                    <td className="px-4 py-2">{client.email}</td>
                    <td className="px-4 py-2">{client.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {clients.map(client => (
              <div key={client.id} className="bg-white rounded-lg shadow p-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-900">{client.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {client.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {client.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 