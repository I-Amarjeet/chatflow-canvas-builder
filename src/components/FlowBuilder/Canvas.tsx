
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  BackgroundVariant,
  ConnectionMode,
  applyEdgeChanges,
  applyNodeChanges,
  OnConnectStartParams,
  Panel,
  NodeDragHandler,
  OnSelectionChangeParams
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './NodeTypes';
import { edgeTypes } from './EdgeTypes';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Unique ID generator
let id = 0;
const getId = () => `node_${id++}`;

interface CanvasProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onDrop, onDragOver }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [connectingNode, setConnectingNode] = useState<OnConnectStartParams | null>(null);
  const isMobile = useIsMobile();

  // Handle node deletion
  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
    toast.success("Node removed");
  }, [setNodes, setEdges]);

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
      // Create edge with custom type
      const newEdge = {
        ...params,
        type: 'custom',
        animated: true,
        style: { stroke: '#999' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: '#999',
        },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      toast.success('Connection established');
    },
    [setEdges]
  );

  // Handle connection start
  const onConnectStart = useCallback(
    (_, params: OnConnectStartParams) => {
      setConnectingNode(params);
    },
    []
  );

  // Handle connection end
  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!connectingNode || !reactFlowInstance) {
        return;
      }

      const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');
      if (targetIsPane) {
        // Connection ended on empty space, do nothing
        setConnectingNode(null);
        return;
      }

      setConnectingNode(null);
    },
    [connectingNode, reactFlowInstance]
  );

  // Handle selection change
  const onSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams) => {
      if (nodes.length > 0) {
        // Optional: Do something when node(s) are selected
      }
    },
    []
  );

  // Handle node drag
  const onNodeDragStop: NodeDragHandler = useCallback(
    (event, node) => {
      // Optional: Do something when node drag stops
    },
    []
  );

  useEffect(() => {
    // Initialize with a welcome node if the canvas is empty
    if (nodes.length === 0) {
      const initialNode = {
        id: getId(),
        type: 'textNode',
        position: { x: 250, y: 100 },
        data: { 
          message: 'Welcome to WhatsApp Chatflow Builder!',
          onDeleteNode 
        },
      };
      
      setNodes([initialNode]);
      toast.success('Chatflow canvas ready');
    }
  }, []);

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onSelectionChange={onSelectionChange}
        onNodeDragStop={onNodeDragStop}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true,
          style: { stroke: '#999' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: '#999',
          },
        }}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={2}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          color="#e0e0e0" 
          gap={isMobile ? 15 : 20} 
          size={1} 
        />
        <Controls 
          showInteractive={false}
          className="animate-fade-in" 
          position={isMobile ? "bottom-center" : "bottom-right"}
        />
        <Panel position="top-right" className="animate-fade-in">
          <div className="glass-panel p-2 text-xs text-gray-500">
            Drag components from the sidebar onto the canvas to build your flow
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canvas;
