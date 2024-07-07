'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../firebase';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, 'groups'));
      const groupsData = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        docData: doc.data(),
      }));
      setGroups(groupsData);
      console.log(groupsData[0].docId)
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {groups.map((group, index) => (
        <div key={index}>
          <button type="button" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8 mb-6 rounded-lg"
            onClick={() => router.push(`/admin/${group.docId}?data=${encodeURIComponent(JSON.stringify(group.docData.number))}`)}>
              {group.docData.name}
          </button>
        </div>
      ))}
    </div>
  );
}
