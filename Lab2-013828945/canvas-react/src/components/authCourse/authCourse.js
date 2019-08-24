import React, { Component } from "react";
//import axios from "axios";
import CreateCourse from "./createCourse";
import GenerateCode from "./generateCode";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class AuthCourse extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Create Course</Tab>
          <Tab>Generate Code</Tab>
        </TabList>

        <TabPanel>
          <CreateCourse />
        </TabPanel>
        <TabPanel>
          <GenerateCode />
        </TabPanel>
      </Tabs>
    );
  }
}

export default AuthCourse;
