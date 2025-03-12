
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Image } from 'lucide-react';
import BaseNode from './BaseNode';
import { NodeData } from './types';

const ImageNode = ({ id, data }: NodeProps<NodeData>) => {
  return (
    <BaseNode className="node-image" nodeId={id} onDeleteNode={data.onDeleteNode}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-2">
        <Image size={18} className="text-node-image mt-0.5" />
        <div>
          <h3 className="font-medium text-sm">Image</h3>
          <div className="mt-2 bg-gray-100 rounded h-20 w-full flex items-center justify-center">
            {data.imageUrl ? (
              <img 
                src={data.imageUrl} 
                alt="Preview" 
                className="max-h-full max-w-full object-contain rounded" 
              />
            ) : (
              <p className="text-xs text-gray-500">Image Preview</p>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {data.caption || "Image caption"}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
};

export default ImageNode;
