import React from "react";
// https://github.com/clauderic/react-sortable-hoc
import { SortableContainer } from "react-sortable-hoc";
// allows for 2dimensional draggable sorting
import DraggableColorBox from "./DraggableColorBox";

// export default function DraggableColorList(props) {
const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        // in order for the component to be draggable, we need to provide the index for each element:
        <DraggableColorBox
          key={color.name}
          index={i}
          color={color.color}
          name={color.name}
          // passing in the click handler bound to color.name -- used to delete
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
