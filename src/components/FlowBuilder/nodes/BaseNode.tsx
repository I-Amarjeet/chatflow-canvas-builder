
import React from 'react';
import { Trash2 } from 'lucide-react';

interface BaseNodeProps {
  children: React.ReactNode;
  className: string;
  nodeId: string;
  onDeleteNode: (id: string) => void;
}

const BaseNode = ({ children, className, nodeId, onDeleteNode }: BaseNodeProps) => {
  return (
    <div className={`p-3 min-w-[180px] ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-medium text-gray-500">{nodeId}</div>
        <button 
          onClick={() => onDeleteNode(nodeId)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {children}
    </div>
  );
};

export default BaseNode;
