
import { Node } from '@xyflow/react';

// Common data interface for all node types
export interface NodeData {
  onDeleteNode: (id: string) => void;
  label?: string;
  message?: string;
  imageUrl?: string;
  caption?: string;
  question?: string;
  options?: Array<{ text: string; id: string; }>;
  duration?: string;
}

// This defines the expected props for our custom nodes
export type CustomNodeProps = {
  id: string;
  data: NodeData;
};
