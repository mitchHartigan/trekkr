import React, { Component } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import AddATask from "./AddATask";

const Container = styled.div`
  margin: 8px;
`;

const ColumnWrapper = styled.div`
  max-width: 25vw;
  min-width: 20vw;
  margin: 0px 10px 0px 10px;
  box-shadow: 3px 5px 5px #a4a29b;
  height: 40vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDraggingOver ? "#F1EFE8" : "#E3E1DB")};
  box-shadow: ${props =>
    props.isDraggingOver ? "3px 5px 5px #6E8168" : "5px 7px 5px #a4a29b"};
  transition: background-color 0.3s ease;
`;

const Title = styled.h3`
  padding: 2px;
  padding-top: 4px;
  margin-left: 8px;
  font-size: 24pt;
  font-family: Amatic SC;
  text-align: left;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const Button = styled.button`
  margin: -8px 8px 8px 8px;
  border: 2px solid #415a77;
  border-radius: 0px;
  padding: 8px;
  cursor: pointer;
  background-color: ${props => (props.isDraggingOver ? "red" : "#415a77")};
  color: white;
  &: hover {
    box-shadow: 2px 2px 2px #2e3843;
    transition: background-color 0.1s ease;
    transition: color 0.06s ease-out;
    transition: box-shadow 0.1s ease-out;
  }
  font-size: 14pt;
  font-family: Open Sans Condensed;
`;

const PlusButton = props => {
  return <AddATask />;
};

export default class Column extends Component {
  render() {
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <ColumnWrapper
              isDraggingOver={snapshot.isDraggingOver}
              height={this.props.height}
            >
              <Title>{this.props.column.title}</Title>
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.tasks.map((task, index) => {
                  return <Task key={task.id} task={task} index={index} />;
                })}
              </TaskList>
              <PlusButton
                onClick={this.props.handleAddTask}
                isDraggingOver={snapshot.isDraggingOver}
              />
            </ColumnWrapper>
          )}
        </Droppable>
      </Container>
    );
  }
}
