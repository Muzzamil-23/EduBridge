import Header from './Header';
// import StatsCard from './StatsCard';
import Recommendations from './Recommendations';
import FeeInsights from './FeeInsights';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useAuthStore } from '../../store/useAuthStore';
import Scholarships from './Scholarship';

const Dashboard = () => {
  const { recommendations } = useDashboardStore();
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        {/* Recommendations */}
        <div className="mt-14">
          <Recommendations />
        </div>

        {/* Fee Insights */}
        <div className="mt-12">
          <div className="flex items-center gap-4">
            <img
              src="https://img.icons8.com/?size=100&id=Nyz7uic92NRd&format=png&color=000000"
              alt="dollar-icon"
              className="w-10 h-10"
            />
            <h2 className="text-xl font-semibold">Fee Insights</h2>
          </div>
          <div>
            <FeeInsights programs={recommendations?.map((r) => r.programs) || []} />
          </div>
        </div>

        {/* Scholarships */}
        <div className="mt-12 mb-6">
          <Scholarships />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

