'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'next/navigation';

export default function GroupPage() {
  const { groupId } = useParams(); // URLパラメータからgroupIdを取得
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // クエリを作成してgroupIdが一致するドキュメントのみを取得
        const q = query(collection(db, 'answers'), where('groupId', '==', groupId));
        const querySnapshot = await getDocs(q);
        const answersData = querySnapshot.docs.map(doc => doc.data());
        setAnswers(answersData);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };
  
    if (groupId) {
      fetchAnswers();
    }
  }, [groupId]);

  return (
    <div>
      <h1>{groupId}</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{JSON.stringify(answer)}</li>
        ))}
      </ul>
    </div>
  );
}
