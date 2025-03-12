
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ListFilter } from 'lucide-react';
import BaseNode from './BaseNode';
import { NodeData } from './types';

const OptionsNode = ({ id, data }: NodeProps<NodeData>) => {
  const options = data.options || [
    { text: "Option 1", id: "opt1" },
    { text: "Option 2", id: "opt2" },
    { text: "Option 3", id: "opt3" }
  ];

  return (
    <BaseNode className="node-options" nodeId={id} onDeleteNode={data.onDeleteNode}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-2">
        <ListFilter size={18} className="text-node-options mt-0.5" />
        <div className="w-full">
          <h3 className="font-medium text-sm">Options</h3>
          <p className="text-xs text-gray-600 mt-1 mb-2">
            {data.question || "Select an option:"}
          </p>
          <div className="flex flex-col gap-1.5">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center">
                <div className="flex-1 text-xs py-1 px-2 bg-gray-100 rounded-md">
                  {option.text}
                </div>
                <Handle 
                  type="source" 
                  position={Position.Right} 
                  id={`option-${index}`}
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

export default OptionsNode;
