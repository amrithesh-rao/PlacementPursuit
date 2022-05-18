import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { ToggleButton } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { isEmpty } from "lodash";
import { async } from "@firebase/util";

export default function PracticeItems() {
  const [practiceItem, setPracticeItem] = useState([]);
  const { id, sid } = useParams();
  const { user } = useUserAuth();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    try {
      const colRef = collection(
        db,
        "infodb",
        id,
        "subTopic",
        sid,
        "practiceItems"
      );
      getDocs(query(colRef, orderBy("practiceItemNumber"))).then((snapshot) => {
        setPracticeItem(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
      if (practiceItem.length !== 0) {
        setTrackDoc(practiceItem.length);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, sid]);

  const setTrackDoc = async (length) => {
    const docRef = doc(
      db,
      "userdb",
      user?.uid,
      "practice",
      id,
      "subTopic",
      sid
    );
    const payload = {
      track: Array(length).fill(false),
    };
    await setDoc(docRef, payload);
  };

  const changeCheck = async (index) => {
    const docRef = doc(
      db,
      "userdb",
      user?.uid,
      "practice",
      id,
      "subTopic",
      sid
    );
  if(checked[index] === false){
    const temp = checked;
    temp[index] = true;
    setChecked(temp);
    console.log(temp);
   await updateDoc(docRef,{
  track : checked
})
  }
else{
  const temp = checked;
  temp[index] = false;
  setChecked(temp);
  console.log(temp);
 await updateDoc(docRef,{
track : checked
})
}
  };

  useEffect(() =>
    onSnapshot(
      doc(db, "userdb", user?.uid, "practice", id, "subTopic", sid),
      (doc) => {
        setChecked(doc.data().track);
      }
    )
  );

  return (
    <>
      <NavBar />
      <div className="p-5 mx-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Question name</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {practiceItem?.map((practiceItem) => (
              <tr>
                <td>{practiceItem.data.practiceItemNumber}</td>
                <td>
                  <a
                    href={practiceItem.data.practiceItemLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {practiceItem.data.practiceItemName}
                  </a>
                </td>
                <td>
                  <ToggleButton
                    className="mb-2"
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={checked[practiceItem.data.practiceItemNumber-1]}
                    value="1"
                    onChange={(e) => changeCheck(practiceItem.data.practiceItemNumber-1)}
                  >
                    Checked
                  </ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Footbar class="footBar-bottom" />
    </>
  );
}
