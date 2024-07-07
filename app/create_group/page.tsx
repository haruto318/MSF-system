'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupNum, setGroupNum] = useState('');
  const router = useRouter();

  const handleCreateGroup = async () => {
    const docRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      number: groupNum
    });
    router.push(`/form/${docRef.id}`); // FirestoreのドキュメントIDをURLに使用
  };

  return (
    <div>
      <h1>Create Group</h1>
      <div>
        <input
          type="text"
          value={groupNum}
          placeholder='チーム数'
          onChange={(e) => setGroupNum(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={groupName}
          placeholder='部屋名'
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <button onClick={handleCreateGroup}>Create</button>
    </div>
  );
}
