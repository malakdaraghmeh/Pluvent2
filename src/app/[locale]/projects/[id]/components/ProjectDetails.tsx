'use client'
import React from 'react'
import { useLocale } from 'next-intl';

export default function ProjectDetails({ params }: { params: { id: string } }) {
    const _lang = useLocale();

    const { id: _id } = params

    // const { data, isLoading, error, isFetching } = useGetProjectByIdQuery({ lang, id }, {
    //     refetchOnMountOrArgChange: true,
    // });

    // const projectIdData = data?.data;
    // const about = projectIdData?.about;
    // const info = projectIdData?.hero;
    // const scopeOfWork = projectIdData?.scope_of_work;
    // const challengeSolution = projectIdData?.challenges_and_solutions;

    // if (isLoading || isFetching) {
    //     return <DetailsSkeleton />;
    // }

    // if (error) {
    //     return <ErrorComp message={"Something went wrong"} onRetry={() => window.location.reload()} />;
    // }

    return (
        <div className='pb-5 md:pb-20'>
            product
        </div>
    )
}
