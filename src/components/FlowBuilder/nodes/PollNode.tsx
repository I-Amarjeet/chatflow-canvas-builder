
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BarChart } from 'lucide-react';
import BaseNode from './BaseNode';
import { NodeData } from './types';

const PollNode = ({ id, data }: NodeProps<NodeData>) => {
  const options = data.options || [
    { text: "Yes", id: "poll_yes" },
    { text: "No", id: "poll_no" },
    { text: "Maybe", id: "poll_maybe" }
  ];

  return (
    <BaseNode className="node-poll" nodeId={id} onDeleteNode={data.onDeleteNode}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-2">
        <BarChart size={18} className="text-node-poll mt-0.5" />
        <div className="w-full">
          <h3 className="font-medium text-sm">Poll</h3>
          <p className="text-xs text-gray-600 mt-1 mb-2">
            {data.question || "Vote in this poll:"}
          </p>
          <div className="flex flex-col gap-1.5">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center">
                <div className="flex-1 text-xs py-1 px-2 bg-gray-100 rounded-md flex justify-between">
                  <span>{option.text}</span>
                  <span className="text-gray-400">0%</span>
                </div>
                <Handle 
                  type="source" 
                  position={Position.Right} 
                  id={`poll-${index}`}
                  className="!relative !transform-none !inset-auto ml-2" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default PollNode;
