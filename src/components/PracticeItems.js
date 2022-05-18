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
  merge,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { ToggleButton } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { async } from "@firebase/util";
import { truncate } from "lodash";

export default function PracticeItems() {
  const [practiceItem, setPracticeItem] = useState([]);
  const { id, sid } = useParams();
  const { user } = useUserAuth();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const setTrackDoc = async (length) => {
      var ref = doc(
        db,
        "userdb",
        user?.uid,
        "practice",
        id,
        "subTopic",
        sid,
        "track",
        "1"
      );
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
      } else {
        for (let i = 1; i <= length; i++) {
          const docRef = doc(
            db,
            "userdb",
            user?.uid,
            "practice",
            id,
            "subTopic",
            sid,
            "track",
            i.toString()
          );
          const payload = {
            checked: false,
            priority: i,
          };
          await setDoc(docRef, payload);
        }
      }
    };

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
      const colRef2 = collection(
        db,
        "userdb",
        user?.uid,
        "practice",
        id,
        "subTopic",
        sid,
        "track"
      );
      getDocs(query(colRef2, orderBy("priority"))).then((snapshot) => {
        setChecked(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [id, practiceItem.length, sid, user]);

  console.log(user);
  //   const changeCheck = async (index) => {
  //     const docRef = doc(
  //       db,
  //       "userdb",
  //       user?.uid,
  //       "practice",
  //       id,
  //       "subTopic",
  //       sid
  //     );
  //   if(checked[index] === false){
  //     const temp = checked;
  //     temp[index] = true;
  //     setChecked(temp);
  //     console.log(temp);
  //    await updateDoc(docRef,{
  //   track : checked
  // })
  //   }
  // else{
  //   const temp = checked;
  //   temp[index] = false;
  //   setChecked(temp);
  //   console.log(temp);
  //  await updateDoc(docRef,{
  // track : checked
  // })
  // }
  //   };

  // useEffect(() =>
  //   get(
  //     doc(db, "userdb", user?.uid, "practice", id, "subTopic", sid),
  //     (doc) => {
  //       setChecked(doc.data().track);
  //     }
  //   )
  // );

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
                  {checked.length !== 0 ? (
                    <ToggleButton
                      className="mb-2"
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-primary"
                      checked={
                        checked[practiceItem.data.practiceItemNumber - 1].data
                          .checked
                      }
                      value={practiceItem.data.practiceItemNumber}
                      //  onChange={(e) =>
                      //   // setChecked(...checked, e.currentTarget.value)
                      //   console.log(e)
                      //  }
                      //  //checked[practiceItem.data.practiceItemNumber-1].data.checked =
                      onClick = {() => {


                        const docRef = doc(
                          db,
                          "userdb",
                          user?.uid,
                          "practice",
                          id,
                          "subTopic",
                          sid,
                          "track",
                          practiceItem.data.practiceItemNumber.toString()
                        );
                    console.log(practiceItem.data.practiceItemNumber);
                        if(checked[practiceItem.data.practiceItemNumber-1].data.checked === true){ 
                          const payload = {
                            checked: false,
                            priority: practiceItem.data.practiceItemNumber,
                          };
                          setDoc(docRef, payload);
                        }
                        else{
                          const payload = {
                            checked: true,
                            priority: practiceItem.data.practiceItemNumber,
                          };
                          setDoc(docRef, payload);
                    
                          const colRef2 = collection(
                            db,
                            "userdb",
                            user?.uid,
                            "practice",
                            id,
                            "subTopic",
                            sid,
                            "track"
                          );
                          getDocs(query(colRef2, orderBy("priority"))).then((snapshot) => {
                            setChecked(
                              snapshot.docs.map((doc) => ({
                                data: doc.data(),
                              }))
                            );
                          });
                        }
                      }}
                    >
                      Checked
                    </ToggleButton>
                  ) : (
                    ""
                  )}
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
