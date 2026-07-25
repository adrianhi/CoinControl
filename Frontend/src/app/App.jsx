import { HomePage } from '../pages/home';
import { DashboardPage } from '../pages/dashboard';
import { ProtectedRoute } from './providers/ProtectedRoute';

export function App() {
  return <ProtectedRoute fallback={<HomePage />}><DashboardPage /></ProtectedRoute>;
}
