import React, { FC } from 'react'
import type { NodeProps } from '@/app/components/workflow/types'
import type { CustomNodeType } from './types'

const NodeComponent: FC<NodeProps<CustomNodeType>> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded bg-white shadow text-sm font-medium">
      {data.selectedFunction || '选择函数'}
    </div>
  )
}

export default NodeComponent
