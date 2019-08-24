import React, { Component } from "react";
//import axios from "axios";
import ViewCourses from "./viewCourses";
import AddCode from "./addCode";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DropCourse from "./dropCourse";
class Enroll extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Enroll Course</Tab>
          <Tab>Drop Course</Tab>
          <Tab>Add Code</Tab>
        </TabList>

        <TabPanel>
          <ViewCourses />
        </TabPanel>
        <TabPanel>
          <DropCourse />
        </TabPanel>
        <TabPanel>
          <AddCode />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Enroll;
