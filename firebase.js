var firebase = require('firebase/app')
require('firebase/firestore');


var firebaseConfig = {
    apiKey: "AIzaSyCLFHRMO1u-6UREh6q3FbzXBLpxFUUojGU",
    authDomain: "todo-list-a6588.firebaseapp.com",
    projectId: "todo-list-a6588",
    storageBucket: "todo-list-a6588.appspot.com",
    messagingSenderId: "1044997501729",
    appId: "1:1044997501729:web:c6a8edae1baaf822220460"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timeStamp = firebase.firestore.FieldValue.serverTimestamp;


// const getData = (city, bloodGroup) => {
//     // console.log("city", city, "bloodgroup", bloodGroup);

//     return new Promise((reject, resolve) => {
//         const collectionRef = projectFirestore.collection('donorData')
//         collectionRef.where("cityName", "==", city).get().then((snapshot) => {
//             if (snapshot.docs.length) {
//                 var data = snapshot.docs.map((donordata) => (
//                     {
//                         donorDetails: donordata.data()
//                     }
//                 ))
//                 // console.log("data in firebase", data);
//                 resolve(data)
//             }
//             else {
//                 reject("no data")
//             }
//         }).catch((err) => reject("error occured in getting data"))
//     })

// }


const getData = (city, bloodGroup) => {
    var data = []
    return new Promise((resolve, reject) => {
        // console.log("dbName", dbName, "id:", senderId);
        const collectionRef = projectFirestore.collection("donorData");


        collectionRef.where('cityName', '==', city).where('bloodGroup','==',bloodGroup).get().then((querySnapshot) => {
            if (querySnapshot.docs.length) {
                querySnapshot.forEach((doc) => {
                    data.push({ name: doc.data().firstName, mobileNo: doc.data().mobileNo })
                })
                // console.log("data", data);
                resolve(data)
            }
            else
                reject("no data found")
        }).catch((error) => {
            console.log("Error getting document:", error);
        });



    })



    // snapshot.forEach((doc) => {
    //     console.log("doc :",doc.data());
    //     console.log("doc exist",doc.exists);
    // });

    // return doc.data().status

}


module.exports = { projectFirestore, timeStamp, getData };