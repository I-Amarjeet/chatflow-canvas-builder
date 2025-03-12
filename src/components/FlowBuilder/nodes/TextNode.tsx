
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import BaseNode from './BaseNode';
import { NodeData } from './types';

const TextNode = ({ id, data }: NodeProps<NodeData>) => {
  return (
    <BaseNode className="node-text" nodeId={id} onDeleteNode={data.onDeleteNode}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-2">
        <MessageSquare size={18} className="text-node-text mt-0.5" />
        <div>
          <h3 className="font-medium text-sm">Text Message</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {data.message || "Enter your message here"}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
};

export default TextNode;
