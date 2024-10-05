import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample parsed code for blocks (static, public, private functions)
const initialBlocks = {
  static: ['static void staticMethod1() {}', 'static int staticVar1;'],
  public: ['public void publicMethod1() {}', 'public String publicVar1;'],
  private: ['private void privateMethod1() {}', 'private int privateVar1;'],
};

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CodeBlocks = () => {
  const [blocks, setBlocks] = useState(initialBlocks);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    // Dropped outside the list
    if (source.droppableId !== destination.droppableId) {
      // Move between categories (if needed)
      const sourceClone = Array.from(blocks[source.droppableId]);
      const destClone = Array.from(blocks[destination.droppableId]);
      const [removed] = sourceClone.splice(source.index, 1);
      destClone.splice(destination.index, 0, removed);
      
      setBlocks({
        ...blocks,
        [source.droppableId]: sourceClone,
        [destination.droppableId]: destClone,
      });
    } else {
      // Reorder within the same category
      const items = reorder(
        blocks[source.droppableId],
        source.index,
        destination.index
      );
      setBlocks({
        ...blocks,
        [source.droppableId]: items,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(blocks).map((category, idx) => (
        <Droppable droppableId={category} key={category}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ margin: '10px' }}>
              <h3>{category} functions</h3>
              {blocks[category].map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '16px',
                        margin: '0 0 8px 0',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        border: '1px solid lightgrey',
                      }}
                    >
                      <pre>{item}</pre>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default CodeBlocks;