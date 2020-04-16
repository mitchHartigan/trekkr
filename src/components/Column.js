import React, { Component } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
`;

const ColumnWrapper = styled.div`
  max-width: 25vw;
  min-width: 20vw;
  margin: 0px 10px 0px 10px;
  border: 2px solid grey;
  height: 40vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDraggingOver ? "#95BD99" : "white")};
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
  border: 2px solid #7dab87;
  border-radius: 2px;
  padding: 8px;
  background-color: white;
  cursor: pointer;
  &: hover {
    border: 3px solid #598d5e;
    transition: border 0.1s ease-out;
  }
  font-size: 15pt;
`;

const PlusButton = (props) => {
  return <Button onClick={props.onClick}>+</Button>;
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
              <PlusButton onClick={this.props.handleAddTask} />
            </ColumnWrapper>
          )}
        </Droppable>
      </Container>
    );
  }
}
