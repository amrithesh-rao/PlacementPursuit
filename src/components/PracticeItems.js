import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import SubPracticeCard from "./SubPracticeCard";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default function PracticeItems() {
  const [practiceItem, setPracticeItem] = useState([]);
  const { id, sid } = useParams();

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
    } catch (e) {
      console.log(e);
    }
  }, [id, sid]);
  console.log(id);
  return (
    <>
      <NavBar />
        <div className="p-5 mx-auto">
        <Table striped bordered hover >
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
        <td><a href={practiceItem.data.practiceItemLink} target="_blank" rel="noreferrer">{practiceItem.data.practiceItemName}</a></td>
        <td></td>
        </tr>
      ))}

        </tbody>
      </Table>
        </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
