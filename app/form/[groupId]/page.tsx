'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SurveyForm from '../../components/SurveyForm';
import { useParams } from 'next/navigation';

export default function SurveyPage() {
  const { groupId } = useParams(); // URLパラメータからgroupIdを取得

  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // ドキュメントリファレンスを取得
        const docRef = doc(db, 'groups', groupId); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGroupData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    fetchGroupData();
  }, [groupId]);

  return groupData ? <SurveyForm groupId={groupId} groupNum={groupData.number} /> : <div>Loading...</div>;
}
