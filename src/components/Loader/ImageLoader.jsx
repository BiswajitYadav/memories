import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'

const ImageLoader = (props) => {

    const { src } = props
    const [imageLoader, setImageLoader] = useState(true)

    return (
        <>
            {
                imageLoader ?
                    <div className='h-[150px] md:h-[250px] w-full bg-slate-100 flex justify-center items-center dark:bg-[#1C1132] rounded'>
                        <CircularProgress />
                    </div>
                    :
                    null
            }

            <img className={imageLoader ? 'hidden' : 'w-full object-contain min-h-full max-h-[60vh] rounded-md'} src={src} alt="Image" onLoad={() => setImageLoader(false)} />
            
        </>
    )
}

export default ImageLoader