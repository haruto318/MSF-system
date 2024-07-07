'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Dashboard() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const querySnapshot = await getDocs(collection(db, 'answers'));
      const answersData = querySnapshot.docs.map(doc => doc.data());
      setAnswers(answersData);
    };

    fetchAnswers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{JSON.stringify(answer)}</li>
        ))}
      </ul>
    </div>
  );
}
