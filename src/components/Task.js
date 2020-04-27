import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin-bottom: 8px;
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? "#E3E1DB" : "#E3E1DB")};
  box-sizing: border-box;
`;

const TaskTitle = styled.p`
  font-family: Open Sans Condensed;
  font-weight: light;
  font-size: 18px;
  color: #343633;
  text-align: left;
  border-bottom: 1px solid transparent;
  &: hover {
    border-bottom: 1px solid #415a77;
    transition: border-bottom 0.2s ease;
  }
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
            <TaskTitle isDragging={snapshot.isDragging}>
              {this.props.task.content}
            </TaskTitle>
          </Container>
        )}
      </Draggable>
    );
  }
}
