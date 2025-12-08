import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { NodePanelProps } from '@/app/components/workflow/types'
import type { CustomNodeType } from './types'
import useConfig from './use-config'
import Select from '@/app/components/base/select'
import Input from '@/app/components/base/input'
import type {FunctionName} from "@/app/components/workflow/nodes/custom-node/use-config"

const Panel: FC<NodePanelProps<CustomNodeType>> = ({ id, data }) => {
    const { t } = useTranslation()

    const {
        readOnly,
        functionList,
        selectedFunction,
        inputParams,
        outputParams,
        handleSelectFunction,
        updateInputValue,
    } = useConfig(id, data)

    return (
        <div className="space-y-4">

            {/* 1️⃣ 函数选择 */}
            <div>
                <div className="text-sm font-medium mb-1">选择函数</div>
                <Select
                    disabled={readOnly}
                    items={functionList}
                    defaultValue={selectedFunction ?? ''}
                    onSelect={(item) => handleSelectFunction(item.value as FunctionName)}
                />



            </div>

            {/* 2️⃣ 输入参数 */}
            <div>
                <div className="text-sm font-medium mb-1">输入参数</div>
                <div className="space-y-2">
                    {inputParams.map((param, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500 w-12">
                                {`in_${idx}`}
                            </div>
                            <Input
                                disabled={readOnly}
                                value={param.value}
                                placeholder="请输入值"
                                onChange={(e: any) => updateInputValue(idx, e.target ? e.target.value : e)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 3️⃣ 输出变量（只读展示） */}
            <div>
                <div className="text-sm font-medium mb-1">输出变量</div>
                <div className="space-y-2">
                    {outputParams.map((param, idx) => (
                        <div
                            key={idx}
                            className="text-xs text-gray-500"
                        >
                            {`out_${idx}`}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Panel
