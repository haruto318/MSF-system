'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupNum, setGroupNum] = useState('');
  const [judge, setJudge] = useState("IT会社の社長");
  const router = useRouter();

  const handleCreateGroup = async () => {
    const docRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      number: groupNum,
      judge: judge
    });
    router.push(`/form/${docRef.id}`); // FirestoreのドキュメントIDをURLに使用
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">新規部屋フォーム</h1>
        
        <form className="space-y-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Teams</label>
            <input 
              type="text" 
              name="team_num" 
              value={groupNum}
              onChange={(e) => setGroupNum(e.target.value)}
              placeholder='チーム数'
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mt-2">Judge</label>
            <select 
              value={judge} 
              onChange={(e) => setJudge(e.target.value)} 
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="IT会社の社長">IT会社の社長</option>
              <option value="お笑い芸人">お笑い芸人</option>
              <option value="Life is Tech社員">Life is Tech社員</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input 
              type="text"
              value={groupName}
              placeholder='部屋名'
              onChange={(e) => setGroupName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button type="button" onClick={handleCreateGroup} className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
