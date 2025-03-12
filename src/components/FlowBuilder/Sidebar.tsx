
import React from 'react';
import { useCallback } from 'react';
import { 
  MessageSquare, 
  Image, 
  ListFilter, 
  BarChart, 
  Clock, 
  PanelRight,
  LayoutGrid,
  Save,
  Trash,
  RefreshCw
} from 'lucide-react';

interface SidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
  onClearCanvas: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragStart, onClearCanvas }) => {
  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    onDragStart(event, nodeType);
  }, [onDragStart]);

  return (
    <div className="h-full w-64 glass-panel animate-appear overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <PanelRight size={18} />
          Components
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-2 pl-2">MESSAGES</h3>
          <div className="space-y-2">
            <div 
              className="p-3 rounded-lg shadow-sm bg-white draggable-item sidebar-item-hover flex items-center gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, 'textNode')}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-node-text">
                <MessageSquare size={16} />
              </div>
              <span className="text-sm">Text Message</span>
            </div>
            
            <div 
              className="p-3 rounded-lg shadow-sm bg-white draggable-item sidebar-item-hover flex items-center gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, 'imageNode')}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-node-image">
                <Image size={16} />
              </div>
              <span className="text-sm">Image</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-2 pl-2">INTERACTIVE</h3>
          <div className="space-y-2">
            <div 
              className="p-3 rounded-lg shadow-sm bg-white draggable-item sidebar-item-hover flex items-center gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, 'optionsNode')}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-node-options">
                <ListFilter size={16} />
              </div>
              <span className="text-sm">Options</span>
            </div>
            
            <div 
              className="p-3 rounded-lg shadow-sm bg-white draggable-item sidebar-item-hover flex items-center gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, 'pollNode')}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-node-poll">
                <BarChart size={16} />
              </div>
              <span className="text-sm">Poll</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2 pl-2">FLOW CONTROL</h3>
          <div className="space-y-2">
            <div 
              className="p-3 rounded-lg shadow-sm bg-white draggable-item sidebar-item-hover flex items-center gap-3"
              draggable
              onDragStart={(event) => handleDragStart(event, 'delayNode')}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-node-delay">
                <Clock size={16} />
              </div>
              <span className="text-sm">Delay</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-3 flex flex-col gap-2">
        <button className="w-full py-2 px-3 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-sm font-medium rounded-lg border border-gray-200 transition-colors sidebar-item-hover">
          <Save size={16} />
          <span>Save Flow</span>
        </button>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 px-3 flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-sm text-gray-700 rounded-lg border border-gray-200 transition-colors sidebar-item-hover"
            onClick={onClearCanvas}
          >
            <Trash size={14} />
            <span>Clear</span>
          </button>
          
          <button className="flex-1 py-2 px-3 flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-sm text-gray-700 rounded-lg border border-gray-200 transition-colors sidebar-item-hover">
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
