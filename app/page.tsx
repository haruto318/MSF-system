// import先は適宜置き換えてください。
import InputForm from "./components/InputForm";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <main>
      <div>
        <InputForm />
        <Link href="/result">here</Link>
      </div>
    </main>
  );
}
