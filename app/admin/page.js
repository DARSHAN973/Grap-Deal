import AdminPanel from '@/components/admin/AdminPanel';
import AdminRoute from '@/components/admin/AdminRoute';

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminPanel />
    </AdminRoute>
  );
}