'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type CommonPointEvaluation = {
  team_name: string;
  common_point: string;
  rate: number;
  comment: string;
};

const prompt = `
役割：あなたはイベントの審査員です。
目的：以下についてそれぞれ「共通点の希少性を10点満点で評価せよ」希少性が高いものを10点とし、低いものは1点とせよ。
前提：あなたがつけた評価点数は他チームの共通点と重複しないようにせよ。レスポンスはjson形式にせよ。チームごとに「チーム名、共通点、審査員の点数、審査員のコメント」の配列を返却せよ。審査員は「IT系会社の社長」とし、その人物像をもとに本人が言いそうなコメントや、IT系会社の社長の名言のような形式で評価せよ。審査員がミッキーマウスならディズニーなど、関連性が高いものについては、贔屓の点数をつけて良い。審査員のコメントはバラエティー的に面白くしてほしい。
リクエスト：
{
  {
    チーム名: "A",
    共通点: "タッチタイピングができる。"
  },
  {
    チーム名: "B",
    共通点: "使用しているOSがMacである。"
  },
}
`;

export default function Home() {
  const [evaluations, setEvaluations] = useState<CommonPointEvaluation[]>([]);
  const router = useRouter()

  const handleEvaluate = async () => {
    try {
      const response = await axios.post('/api/chatgpt', { prompt });
      console.log('Response data:', response.data);

      // レスポンスデータを配列形式に変換
      const transformedEvaluations: CommonPointEvaluation[] = response.data.map((item: any) => ({
        team_name: item.チーム名,
        common_point: item.共通点,
        rate: item.審査員の点数,
        comment: item.審査員のコメント,
      }));

      setEvaluations(transformedEvaluations);
      nextHandleClick(transformedEvaluations);
    } catch (error) {
      console.error('Error evaluating common points:', error);
    }
  };

  const nextHandleClick = (evaluations: CommonPointEvaluation[]) => {
    router.push(`/result?data=${encodeURIComponent(JSON.stringify(evaluations))}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>共通点の評価</h1>
      <button onClick={handleEvaluate}>評価を実行</button>
    </div>
  );
}