import { gql } from "apollo-boost";

const login = gql`
  query login($userid: String, $password: String) {
    login(userid: $userid, password: $password) {
      success
      userData {
        userId
        email
        type
      }
    }
  }
`;

const profile = gql`
  query profile($userid: String) {
    profile(userid: $userid) {
      success
      userData {
        userId
        email
        type
        name
        aboutMe
        country
        city
        gender
        hometown
        school
        company
        language
        phone
      }
    }
  }
`;

const course = gql`
  query course($courseid: String) {
    course(courseid: $courseid) {
      success
      courseData {
        coursename
        department
        description
        room
        waitlist
        term
      }
    }
  }
`;

const updateProfileMutation = gql`
  mutation(
    $name: String
    $email: String
    $phonenumber: String
    $aboutme: String
    $city: String
    $country: String
    $company: String
    $school: String
    $language: String
    $hometown: String
    $gender: String
  ) {
    udpateProfile(
      name: $name
      email: $email
      phonenumber: $phonenumber
      aboutme: $aboutme
      city: $city
      country: $country
      company: $company
      school: $school
      language: $language
      hometown: $hometown
      gender: $gender
    ) {
      success
    }
  }
`;

const mycourses = gql`
  query mycourses($userid: String, $type: String) {
    mycourses(userid: $userid, type: $type) {
      success
      courseData {
        courseid
        coursename
        department
        term
        description
      }
    }
  }
`;

const allcourses = gql`
  query allcourses($userid: String) {
    allcourses(userid: $userid) {
      success
      courseData {
        courseid
        coursename
        description
        department
        term
      }
    }
  }
`;

const signUpMutation = gql`
  mutation(
    $name: String!
    $type: String!
    $email: String!
    $password: String!
  ) {
    signUpUser(name: $name, type: $type, email: $email, password: $password) {
      success
      duplicateUser
      userData {
        userId
      }
    }
  }
`;

const enrollCourseMutation = gql`
  mutation($userid: String!, $courseid: String!) {
    enrollCourse(userid: $userid, courseid: $courseid) {
      success
      message
    }
  }
`;

const createCourseMutation = gql`
  mutation(
    $courseid: String!
    $coursename: String!
    $department: String!
    $description: String!
    $room: String!
    $waitlist: String!
    $term: String!
    $userId: String!
  ) {
    createCourse(
      courseid: $courseid
      coursename: $coursename
      department: $department
      description: $description
      room: $room
      waitlist: $waitlist
      term: $term
      userId: $userId
    ) {
      success
      message
    }
  }
`;

export {
  login,
  signUpMutation,
  profile,
  mycourses,
  createCourseMutation,
  updateProfileMutation,
  course,
  enrollCourseMutation,
  allcourses
};
