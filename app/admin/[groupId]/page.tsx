'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

type CommonPointEvaluation = {
  team_name: string;
  common_point: string;
  rate: number;
  comment: string;
};

export default function GroupPage() {
  const { groupId } = useParams(); // URLパラメータからgroupIdを取得

  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
  
  const [answers, setAnswers] = useState([]);

  const [evaluations, setEvaluations] = useState<CommonPointEvaluation[]>([]);
  const router = useRouter();

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

  const createPrompt = (answers, judge) => {
    return `
    役割：あなたはイベントの審査員です。
    目的：以下についてそれぞれ「共通点の希少性を10点満点で評価せよ」希少性が高いものを10点とし、低いものは1点とせよ。
    前提：あなたがつけた評価点数は他チームの共通点と重複しないようにせよ。レスポンスはjson形式にせよ。json形式のレスポンスには"results"を含まない。チームごとに「チーム名、共通点、審査員の点数、審査員のコメント」の配列を返却せよ。審査員は「${judge}」とし、その人物像をもとに本人が言いそうなコメントや、IT系会社の社長の名言のような形式で評価せよ。審査員がミッキーマウスならディズニーなど、関連性が高いものについては、贔屓の点数をつけて良い。審査員のコメントはバラエティー的に面白くしてほしい。
    リクエスト：
    {
      ${answers.map(answer => {
        return `
        {
          チーム名: "${answer.team}",
          共通点: "${answer.answers.answer}"
        },`
      })}
    }
    レスポンス例：
    [
      {
        チーム名: "A",
        共通点: "英語が嫌い",
        審査員の点数: 1
        審査員のコメント: "英語が嫌いだと！それだと将来活躍できなくなるぞ"
      },
      {
        チーム名: "B",
        共通点: "メンバー全員MacBookを使っている",
        審査員の点数: 6
        審査員のコメント: "MacBookは優秀だ！ただし用途によって使い分けが大事"
      },
    ]
    `;
  };

  const handleEvaluate = async () => {
    if (answers.length != data.number){ 
      console.log("not enough answers")
      return 
    }

    const prompt = createPrompt(answers, data.judge);

    try {
      const response = await axios.post('/api/chatgpt', { prompt });
      console.log('Response data:', response.data);

      // レスポンスデータを配列形式に変換
      const transformedEvaluations: CommonPointEvaluation[] = response.data.map((item: any) => ({
        team_name: item.チーム名,
        common_point: item.共通点,
        rate: item.審査員の点数,
        comment: item.審査員のコメント,
        isAll: answers != undefined ? answers.find(answer => answer.team == item.チーム名).selectedIsAll : false
      }));

      setEvaluations(transformedEvaluations);
      resultHandleClick(transformedEvaluations);
    } catch (error) {
      console.error('Error evaluating common points:', error);
    }
  };

  console.log(evaluations);
  const resultHandleClick = (evaluations: CommonPointEvaluation[]) => {
    router.push(`/result?data=${encodeURIComponent(JSON.stringify(evaluations))}`);
  };

  // アルファベットの配列を作成
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <div>
      <div className="container mx-auto p-6">
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
          onClick={() => router.push('/')}
        >
          戻る
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">AI共通点ゲーム</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: data.number }, (_, index) => {
              const answer = answers.find(answer => answer.team === alphabet[index]);
              return (
                <div key={index} className="relative flex items-center space-x-5 p-4">
                  <div className="text-3xl font-semibold mb-2">
                    <h3>{alphabet[index]}</h3>
                  </div>
                  {answer ? (
                    <div className="border-2 border-rose-600 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                      <h3 className="text-base break-words line-clamp-2 text-center">{answer.answers.answer}</h3>
                      {answer.selectedIsAll && (
                        <div className="absolute -top-2 -right-3 w-14 h-14 rounded-full bg-[#FF4278] flex items-center justify-center">
                          <p className="text-white text-xs">全員一致</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-rose-600 bg-gray-200 rounded-lg p-4 w-full h-24 max-h-24 overflow-hidden flex items-center justify-center">
                      <h3 className="text-base break-words line-clamp-2 text-center">Thinking</h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button 
            type="button" 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
            onClick={handleEvaluate}
          >採点</button>
        </div>
      </div>
    </div>
  );
}
