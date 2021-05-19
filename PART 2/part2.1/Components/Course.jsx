import React from "react";
import Header from "./Header";

import Content from "./Content";

const Course = ({ courses }) =>
  courses.map(({ name, id, parts }) => (
    <React.Fragment key={id}>
      <Header course={name} />
      <Content parts={parts} />
      
    </React.Fragment>
  ));

export default Course;