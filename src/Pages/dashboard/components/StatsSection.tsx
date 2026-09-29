import { dashboardStats } from '../data/dashboardStats';
import StatCard from './StatCard';

const StatsSection = () => {
    return (
        <section className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 3xl:gap-6 4xl:gap-8">
            {dashboardStats.map(stat => (
                <StatCard key={stat.id} {...stat} />
            ))}
        </section>
    );
};

export default StatsSection;
