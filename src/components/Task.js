import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? "#343633" : "#343633")};
  transition: background-color 0.3s ease;
`;

const TaskTitle = styled.p`
  font-family: Open Sans Condensed;
  font-weight: light;
  font-size: 18px;
  color: white;
  text-align: left;
`;

export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <TaskTitle>{this.props.task.content}</TaskTitle>
          </Container>
        )}
      </Draggable>
    );
  }
}
