
import { NodeTypes as FlowNodeTypes } from '@xyflow/react';
import TextNode from './nodes/TextNode';
import ImageNode from './nodes/ImageNode';
import OptionsNode from './nodes/OptionsNode';
import PollNode from './nodes/PollNode';
import DelayNode from './nodes/DelayNode';

// Export all node components individually for potential direct imports
export { TextNode, ImageNode, OptionsNode, PollNode, DelayNode };

// Export the nodeTypes object for ReactFlow
export const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode,
  optionsNode: OptionsNode,
  pollNode: PollNode,
  delayNode: DelayNode,
} as FlowNodeTypes;
