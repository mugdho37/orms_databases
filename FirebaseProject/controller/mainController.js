const { Request, Response, response } = require("express");
const db = require("../firebaseConfig")
const User = require('../models/user')
// const { getFirestore, collection, getDocs } = require('firebase/firestore')
const { collection, addDoc,getDocs,getDoc,doc, where,query} = require("firebase/firestore"); 
const { getDatabase,ref,get, child } = require("firebase/database");
// const firebase = require('firebase')

class mainController {
  async create(Request, Response) {
    try {
      const data = Request.body;
      const user = await addDoc(collection(db, "users"), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      Response.status(200).send({
        Details: user.id,
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
        const citiesRef = await db.collection('users');
        const snapshot = await citiesRef.where('email', '==', true).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
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
      //   Response.status(200).send({Details: user.id, message: "User added successfully"})
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
      //   Response.status(200).send({Details: user.id, message: "User added successfully"})
    } catch (err) {
      console.log(err);
      return Response.status(500).send({
        Error: err,
        message: "Internal Server error",
      });
    }
  }
}

module.exports = new mainController();
