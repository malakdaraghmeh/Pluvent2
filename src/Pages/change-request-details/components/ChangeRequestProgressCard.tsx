import { Chart } from 'primereact/chart';
import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';
import type { ChangeRequestProgressCardProps } from '../../../../utils/types/change-request-details.types';

export default function ChangeRequestProgressCard({
    progress,
    title,
    description,
    overallLabel,
    startColor,
    endColor,
    titleColor,
    className = '',
}: ChangeRequestProgressCardProps) {
    const data: ChartData<'doughnut'> = {
        datasets: [
            {
                data: [progress, 100 - progress],
                borderWidth: 0,
                hoverOffset: 0,
                spacing: 0,
                backgroundColor: (context: ScriptableContext<'doughnut'>) => {
                    if (context.dataIndex === 1) return '#EEF3F8';
                    const { ctx, chartArea } = context.chart;
                    if (!chartArea) return startColor;
                    const gradient = ctx.createLinearGradient(
                        0,
                        chartArea.bottom,
                        0,
                        chartArea.top
                    );
                    gradient.addColorStop(0, startColor);
                    gradient.addColorStop(1, endColor);
                    return gradient;
                },
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '82%',
        rotation: 135,
        circumference: 360,
        animation: false,
        events: [],
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <section
            className={`flex w-full flex-col items-center gap-5 rounded-[16px] border border-[#E8EAEF] bg-white p-6 sm:flex-row ${className}`}
        >
            <div className="relative flex h-[165px] w-[165px] shrink-0 items-center justify-center">
                <div className="h-[154px] w-[154px]">
                    <Chart
                        type="doughnut"
                        data={data}
                        options={options}
                        className="h-full w-full"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[2.2px]">
                    <strong className="font-['Sora'] text-[26.4px] font-extrabold leading-none text-[#1E293B]">
                        {progress}%
                    </strong>

                    <span className="font-['Sora'] text-[9.9px] font-semibold leading-none text-[#64748B]">
                        {overallLabel}
                    </span>
                </div>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-start">
                <h2
                    className="font-['Sora'] text-[16px] font-semibold leading-none"
                    style={{ color: titleColor }}
                >
                    {title}
                </h2>

                <p className="mt-4 break-words font-['Sora'] text-[14px] font-normal leading-[140%] text-[#6B7280]">
                    {description}
                </p>
            </div>
        </section>
    );
}
