import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export async function saveCourse(course) {
  const savedCourse = await courseApi.saveCourse(course);
  // hey dispatcher, go tell all the stores that a course just used
  dispatcher.dispatch({
    actionType: course.id
      ? actionTypes.UPDATE_COURSE
      : actionTypes.CREATE_COURSE,
    course: savedCourse
  });
}

export async function loadCourses() {
  const courses = await courseApi.getCourses();
  // hey dispatcher, go tell all the stores that a course just used
  dispatcher.dispatch({
    actionType: actionTypes.LOAD_COURSES,
    courses: courses
  });
}

export async function deleteCourse(id) {
  await courseApi.deleteCourse(id).then(() => {
    toast.success("Delete Success");
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
