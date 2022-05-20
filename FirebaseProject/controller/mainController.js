const { Request, Response } = require("express");
const db = require("../firebaseConfig");
const User = require("../models/user");
// const userConverter = require("../models/user")
// const { getFirestore, collection, getDocs } = require('firebase/firestore')
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  where,
  query,
  setDoc,
  deleteDoc,
} = require("firebase/firestore");
const { getDatabase, ref, get, child } = require("firebase/database");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// const firebase = require('firebase')

class mainController {
  async create(Request, Response) {
    try {
      const data = Request.body;
      // const user = await addDoc(collection(db, "users"), {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      // });
      const userRef = collection(db, "users");
      const user = await setDoc(doc(userRef, "2"), {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
      });
      console.log(user);
      Response.status(200).send({
        // Details: { userId: user.id, userDetail: user },
        message: "User added successfully",
      });
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }
  async get(Request, Response) {
    try {
      let userinfo = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        userinfo.push({ id: doc.id, details: doc.data() });
      });
      console.log(userinfo);
      return Response.status(200).send(userinfo);
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }
  async getbyId(Request, Response) {
    try {
      const docRef = doc(db, "users", Request.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return Response.send(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }
  async update(Request, Response) {
    try {
      const updateUserRef = doc(db, "users", Request.params.id);
      // console.log(Request.body)
      const body = Request.body;

      await setDoc(updateUserRef, body, { merge: true });
      Response.status(200).send({
        message: "User has been updated successfully",
      });
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }

  async delete(Request, Response) {
    try {
      await deleteDoc(doc(db, "users", Request.params.id));
      Response.status(200).send({
        message: "User has been deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }

  //projects
  async create_project(Request, Response) {
    try {
      const data = Request.body;
      const project = await addDoc(collection(db, "projects"), {
        title: data.title,
        description: data.description,
      });
      Response.status(200).send({
        Details: { projectId: project.id, projectDetail: project },
        message: "project added successfully",
      });
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }

  async fetchProjects(Request, Response) {
    try {
      let userinfo = [];
      const junctions = await getDocs(
        collection(db, "junction_user_project"),
        where("projectId", "==", Request.params.id)
      );
      console.log(junctions.docs[0].data())
      const users = await Promise.all(
        junctions.docs
          .filter(doc => doc.exists)
          // .map(doc => db.doc(`users/${doc.data().userId}`).get()
          .map((docu)=>{
            console.log(docu.data())
            const docRef = doc(db, "users", docu.data().userId);
            const users2 = getDoc(doc(db, "users", docRef.id)).then(docSnap => {
              if (docSnap.exists()) {
                 userinfo.push(docSnap.data())
                //  return docSnap.data();
                // console.log("Document data:", docSnap.data());
              } else {
                console.log("No such document!");
              }
            })
            // console.log(users2)

          })
      );
      console.log(users)

          return Response.status(200).send({Details:userinfo});
     
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }

    // return courses
    //   .filter((doc) => doc.exists)
    //   .map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async userJoinProject(Request, Response) {
    // const junctionRef = db.doc(
    //   `junction_student_course/${studentId}_${courseId}`
    // );
    // await junctionRef.set({ studentId, courseId });
    console.log(Request.body);
    try {
      const junctionRef = await addDoc(
        collection(db, "junction_user_project"),
        Request.body
      );
      Response.status(200).send({
        message: "User joined project successfully",
      });
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }

    // await setDoc(doc(junctionRef),Request.body)
  }
}

module.exports = new mainController();
