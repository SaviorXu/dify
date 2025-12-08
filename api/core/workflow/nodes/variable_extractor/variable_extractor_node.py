'''
变量提取器节点，给定一个json类型的response变量
可以使用response["data"] 或者 response["data"]["display_data_list"][0]["storeCode"]提取出对应的结点内容
'''
from collections.abc import Mapping
from typing import Any

from core.workflow.enums import ErrorStrategy, NodeType
from core.workflow.nodes.base.entities import BaseNodeData, RetryConfig
from core.workflow.nodes.base.node import Node

from .entities import VariableExtractorNodeData


class VariableExtractorNode(Node):
    node_type = NodeType.VARIABLE_EXTRACTOR

    _node_data: VariableExtractorNodeData

    def init_node_data(self, data: Mapping[str, Any]):
        self._node_data = VariableExtractorNodeData.model_validata(data)
    
    def _get_error_strategy(self) -> ErrorStrategy | None:
        return self._node_data.error_strategy
    
    def _get_retry_config(self) -> RetryConfig:
        return self._node_data.retry_config

    def _get_title(self) -> str:
        return self._node_data.title

    def _get_description(self) -> str | None:
        return self._node_data.desc

    def _get_default_value_dict(self) -> dict[str, Any]:
        return self._node_data.default_value_dict

    def get_base_node_data(self) -> BaseNodeData:
        return self._node_data
    
    @classmethod
    def version(cls) -> str:
        return "1"
    
    def _run(self) -> NodeRunResult:
        pass