import { Sparkles } from 'lucide-react'
import React from 'react'

const NoMessage = () => {
  return (
    <div className='h-[40vh] flex justify-center items-center'>
        <div className='text-center m-auto'>
            <div className='flex justify-center mb-2'>
                <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h4>Ask our AI anything</h4>
        </div>
    </div>
  )
}

export default NoMessage