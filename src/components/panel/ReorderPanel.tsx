import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box, Typography, Paper } from '@mui/material';
import styled from 'styled-components';

export interface BlockCategory {
  static: string[];
  public: string[];
  private: string[];
}

interface ReorderPanelProps {
  blocks: BlockCategory;
  onReorder: (newBlocks: BlockCategory) => void;
  setMonacoValue: (value: string) => void;
}

interface DraggableItemProps {
  isDragging: boolean;
}

const Container = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const DraggableItem = styled(Box)<DraggableItemProps>`
  user-select: none;
  padding: 16px;
  margin-bottom: 12px;
  background-color: ${(props) => (props.isDragging ? '#e3f2fd' : '#ffffff')};
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: ${(props) => (props.isDragging ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.05)')};
  transition: background-color 0.3s, box-shadow 0.3s;
`;

const ReorderPanel: React.FC<ReorderPanelProps> = ({ blocks, onReorder, setMonacoValue }) => {
  const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(blocks[source.droppableId as keyof BlockCategory], source.index, destination.index);
      onReorder({
        ...blocks,
        [source.droppableId]: items,
      });
    } else {
      const sourceClone = Array.from(blocks[source.droppableId as keyof BlockCategory]);
      const destClone = Array.from(blocks[destination.droppableId as keyof BlockCategory]);
      const [removed] = sourceClone.splice(source.index, 1);
      destClone.splice(destination.index, 0, removed);

      onReorder({
        ...blocks,
        [source.droppableId]: sourceClone,
        [destination.droppableId]: destClone,
      });
    }

    // Update the Monaco editor instance with the reordered blocks
    const newCode = [
      ...blocks.static,
      ...blocks.public,
      ...blocks.private,
    ].join('\n\n');
    setMonacoValue(newCode);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(blocks).map((category) => (
        <Droppable droppableId={category} key={category}>
          {(provided: DroppableProvided) => (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: '#333',
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '10px',
                  marginBottom: '15px',
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} Methods
              </Typography>
              {blocks[category as keyof BlockCategory].map((block, index) => (
                <Draggable key={block} draggableId={block} index={index}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <DraggableItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      className="ripple-effect"
                    >
                      <pre style={{
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        color: '#333',
                      }}>{block}</pre>
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default ReorderPanel;