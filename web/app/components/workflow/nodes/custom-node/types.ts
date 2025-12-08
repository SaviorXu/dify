import type { CommonNodeType, ValueSelector, VarType } from '@/app/components/workflow/types'
import type {FunctionName} from "@/app/components/workflow/nodes/custom-node/use-config"

export type CustomNodeType = CommonNodeType & {
    selectedFunction: FunctionName | null   // ← 不能写 string
    inputs: { value: string }[]             // ← 输入应该是 value，不是 name
    outputs: { name: string }[]
}
