import { useCallback, useMemo } from 'react'
import { produce } from 'immer'
import useNodeCrud from '@/app/components/workflow/nodes/_base/hooks/use-node-crud'
import {
    useNodesReadOnly,
    useWorkflow,
} from '@/app/components/workflow/hooks'
import type { CustomNodeType } from './types'

/** 
 * 函数元信息：参数数量 + 输出数量 
 * 不需要名称，因为你只显示 in_0、in_1
 */
const functionMeta = {
    add: { inputs: 2, outputs: 1 },
    encode: { inputs: 1, outputs: 1 },
    split: { inputs: 2, outputs: 2 },
} as const

export type FunctionName = keyof typeof functionMeta

const useConfig = (id: string, payload: CustomNodeType) => {
    const { nodesReadOnly: readOnly } = useNodesReadOnly()
    const { handleOutVarRenameChange } = useWorkflow()

    const { inputs: nodeData, setInputs: setNodeData } =
        useNodeCrud<CustomNodeType>(id, payload)

    const selectedFunction = nodeData.selectedFunction
    const inputParams = nodeData.inputs || []
    const outputParams = nodeData.outputs || []

    // 下拉框函数列表
    const functionList = useMemo(() => {
        return (Object.keys(functionMeta) as FunctionName[]).map(fn => ({
            name: fn,
            value: fn,
        }))
    }, [])


    // 选择函数 ⇒ 动态生成 inputs / outputs
    const handleSelectFunction = useCallback(
        (fnName: keyof typeof functionMeta) => {
            const meta = functionMeta[fnName]

            const newNodeData = produce(nodeData, draft => {
                draft.selectedFunction = fnName

                // 生成输入参数（只有 value）
                draft.inputs = Array.from({ length: meta.inputs }).map(() => ({
                    value: '',
                }))

                // 输出参数自动命名为 out_0, out_1...
                draft.outputs = Array.from({ length: meta.outputs }).map(
                    (_, idx) => ({
                        name: `out_${idx}`,
                    }),
                )
            })

            setNodeData(newNodeData)
        },
        [nodeData, setNodeData],
    )

    // 更新输入值
    const updateInputValue = useCallback(
        (idx: number, value: string) => {
            const newNodeData = produce(nodeData, draft => {
                draft.inputs[idx].value = value
            })
            setNodeData(newNodeData)
        },
        [nodeData, setNodeData],
    )

    return {
        readOnly,
        selectedFunction,
        functionList,

        inputParams, // 数组 value
        outputParams, // 数组 name

        handleSelectFunction,
        updateInputValue,
    }
}

export default useConfig
