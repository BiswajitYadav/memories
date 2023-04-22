import ReplayIcon from '@mui/icons-material/Replay';
import React from 'react'
import PostReportComponent from '../components/PostReport/PostReportComponent';

const PostReport = () => {
    return (
        <>
            <div className='w-full h-full pt-5 pb-10 flex justify-center'>
                <div className='w-[90%] h-full shadow-xl border rounded-lg px-2'>
                    <div className='flex justify-between px-6 py-3 rounded-t-lg'>
                        <div className='font-semibold text-lg'>Post Report</div>
                        <button >
                            <ReplayIcon className='' />
                        </button>
                    </div>
                    <div className='overflow-y-auto h-[73vh] px-2'>
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                        <PostReportComponent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostReport