
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Clock } from 'lucide-react';
import BaseNode from './BaseNode';
import { NodeData } from './types';

const DelayNode = ({ id, data }: NodeProps<NodeData>) => {
  return (
    <BaseNode className="node-delay" nodeId={id} onDeleteNode={data.onDeleteNode}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-2">
        <Clock size={18} className="text-node-delay mt-0.5" />
        <div>
          <h3 className="font-medium text-sm">Delay</h3>
          <p className="text-xs text-gray-600 mt-1">
            Wait for {data.duration || "30"} minutes before continuing
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
};

export default DelayNode;
