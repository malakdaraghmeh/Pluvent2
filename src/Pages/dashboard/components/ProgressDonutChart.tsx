import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import type { ProgressDonutChartProps } from '../../../../utils/types/dashboard.types';

const ProgressDonutChart = ({ progress, overallLabel, projectLabel }: ProgressDonutChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const safeProgress = Math.min(100, Math.max(0, progress));
        const gradient = context.createLinearGradient(0, 0, 0, 154);

        gradient.addColorStop(0, '#39E1D7');
        gradient.addColorStop(1, '#3634C7');

        const chart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [safeProgress, 100 - safeProgress],
                        backgroundColor: [gradient, '#F1F5F9'],
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: context => (context.dataIndex === 0 ? 16 : 0),
                        spacing: 0,
                        hoverOffset: 0,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                animation: false,
                cutout: '78%',
                rotation: 135,
                circumference: 360,
                events: [],
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [progress]);

    return (
        <div className="relative flex h-[154px] w-[154px] shrink-0 items-center justify-center">
            <canvas ref={canvasRef} width={154} height={154} className="h-[154px] w-[154px]" />

            <div className="pointer-events-none absolute flex w-[60px] flex-col items-center justify-center gap-[2.2px] text-center">
                <span className="text-[26.4px] font-extrabold leading-[26.4px] text-[#1E293B]">
                    {progress}%
                </span>

                <span className="text-[9.9px] font-semibold leading-[9.9px] text-[#64748B]">
                    {overallLabel}
                    <br />
                    {projectLabel}
                </span>
            </div>
        </div>
    );
};

export default ProgressDonutChart;




