
import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import {
  MessageSquare,
  Image,
  ListFilter,
  BarChart,
  Clock,
  Trash2
} from 'lucide-react';

// Define interfaces for node data
interface NodeData {
  onDeleteNode: (id: string) => void;
  label?: string;
  message?: string;
  imageUrl?: string;
  caption?: string;
  question?: string;
  options?: Array<{ text: string; id: string; }>;
  duration?: string;
}

// Base Node component with common functionality
const BaseNode = ({ 
  children, 
  className, 
  nodeId, 
  onDeleteNode 
}: {
  children: React.ReactNode;
  className: string;
  nodeId: string;
  onDeleteNode: (id: string) => void;
}) => {
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

// Text message node
export const TextNode = ({ id, data }: NodeProps<NodeData>) => {
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

// Image node
export const ImageNode = ({ id, data }: NodeProps<NodeData>) => {
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

// Options node
export const OptionsNode = ({ id, data }: NodeProps<NodeData>) => {
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

// Poll node
export const PollNode = ({ id, data }: NodeProps<NodeData>) => {
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

// Delay node
export const DelayNode = ({ id, data }: NodeProps<NodeData>) => {
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

export const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode,
  optionsNode: OptionsNode,
  pollNode: PollNode,
  delayNode: DelayNode,
} as const;

