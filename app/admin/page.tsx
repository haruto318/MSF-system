'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../firebase';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [url, setUrl] = useState('');
  const router = useRouter();
  console.log(url)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }

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

  const copyToClipboard = async (url: string) => {
    await global.navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {groups.map((group, index) => (
        <div key={index}>
          <button type="button" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8 mb-6 rounded-lg"
            onClick={() => router.push(`/admin/${group.docId}?data=${encodeURIComponent(JSON.stringify(group.docData))}`)}>
              {group.docData.name}
          </button>
          <button type="button" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8 mb-6 rounded-lg"
            onClick={() => copyToClipboard(url.replace("/admin", `/form/${group.docId}`))}>
              回答フォームURLをコピー
          </button>
        </div>
      ))}
    </div>
  );
}
