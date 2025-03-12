
import React, { useCallback, useRef, useState } from 'react';
import Sidebar from '@/components/FlowBuilder/Sidebar';
import Canvas from '@/components/FlowBuilder/Canvas';
import { ReactFlowProvider } from '@xyflow/react';
import { toast } from 'sonner';

let id = 0;
const getId = () => `node_${id++}`;

const Index = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Handle component drag start from sidebar
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over - needed to enable dropping
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop - create a new node at the drop position
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // Check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let newNode;
      
      // Create the appropriate node based on type
      switch (type) {
        case 'textNode':
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              message: 'Hello! This is a text message.',
              onDeleteNode: (id: string) => {
                // This will be passed to the node component
                // and handled in the Canvas component
              }
            },
          };
          break;
        case 'imageNode':
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              caption: 'Image caption',
              onDeleteNode: (id: string) => {}
            },
          };
          break;
        case 'optionsNode':
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              question: 'Please select an option:',
              options: [
                { text: "Option 1", id: "opt1" },
                { text: "Option 2", id: "opt2" },
                { text: "Option 3", id: "opt3" }
              ],
              onDeleteNode: (id: string) => {}
            },
          };
          break;
        case 'pollNode':
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              question: 'Please vote in this poll:',
              options: [
                { text: "Yes", id: "poll_yes" },
                { text: "No", id: "poll_no" },
                { text: "Maybe", id: "poll_maybe" }
              ],
              onDeleteNode: (id: string) => {}
            },
          };
          break;
        case 'delayNode':
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              duration: '30',
              onDeleteNode: (id: string) => {}
            },
          };
          break;
        default:
          return;
      }

      // Add the new node
      reactFlowInstance.addNodes(newNode);
      toast.success(`Added ${type.replace('Node', '')} node`);
    },
    [reactFlowInstance]
  );

  // Handle clearing the canvas
  const onClearCanvas = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.setNodes([]);
      reactFlowInstance.setEdges([]);
      toast.success('Canvas cleared');
      // Reset ID counter
      id = 0;
    }
  }, [reactFlowInstance]);

  return (
    <div className="flex h-screen w-full bg-gray-50 p-4 overflow-hidden">
      <ReactFlowProvider>
        <div className="flex gap-4 h-full w-full">
          <Sidebar onDragStart={onDragStart} onClearCanvas={onClearCanvas} />
          
          <div 
            className="flex-1 glass-panel animate-slide-in overflow-hidden"
            ref={reactFlowWrapper}
          >
            <Canvas onDrop={onDrop} onDragOver={onDragOver} />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Index;
