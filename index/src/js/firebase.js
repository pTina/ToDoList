// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
// import { getDatabase, ref, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import * as firebaseDatabase from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyATAELCgfrkQezEq38aZdG4s6UNyPShjkU",
    authDomain: "todolist-9b364.firebaseapp.com",
    databaseURL: "https://todolist-9b364-default-rtdb.firebaseio.com",
    projectId: "todolist-9b364",
    storageBucket: "todolist-9b364.appspot.com",
    messagingSenderId: "271888936560",
    appId: "1:271888936560:web:2262381eec44acbdb48eb5",
    measurementId: "G-18G84RDB3H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebase = firebaseDatabase;
export const GetAuth = getAuth;
// export const GetDatabase = getDatabase;
// export const Ref = ref;
// export const Set = set;
// export const OnValue = onValue;
// export const Update = update;
// export const Remove = remove;

/*
function update(ref, values) {
    validateFirebaseMergeDataArg('update', values, ref._path, false);
    const deferred = new Deferred();
    repoUpdate(ref._repo, ref._path, values, deferred.wrapCallback(() => { }));
    return deferred.promise;
}

function ref(db, path) {
    db = getModularInstance(db);
    db._checkNotDeleted('ref');
    return path !== undefined ? child(db._root, path) : db._root;
}

function remove(ref) {
    validateWritablePath('remove', ref._path);
    return set(ref, null);
}

function getModularInstance(service) {
    if (service && service._delegate) {
        return service._delegate;
    }
    else {
        return service;
    }
}

function query(query, ...queryConstraints) {
    let queryImpl = getModularInstance(query);
    for (const constraint of queryConstraints) {
        queryImpl = constraint._apply(queryImpl);
    }
    return queryImpl;
}
*/

