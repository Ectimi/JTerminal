/**
 * This component is for solving the below problem:
 * 
 * when using strict mode with react-beautiful-dnd,
 * !it will leads to the frustrating “Unable to find draggable with id: […]” warning, 
 * leaving you with just the drag of finding out what the problem is.
 * 
 * You can fix this problem naïvely by removing strict mode from your application.
 * However, that leaves you without strict mode, getting those proactive messages about incorrectly set up 
 * lifecycles or detecting unexpected side-effects in your code feel frustrating to pass up.
 * 
 * *The other better solution is use this compoent to replace <Droppable /> of react-beautiful-dnd
 */

import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};
