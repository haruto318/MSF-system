// import先は適宜置き換えてください。
import InputForm from "./components/InputForm";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreateGroup from "./create_group/page";

export default function Home() {
  return (
    <main>
      <div>
        {/* <InputForm /> */}
        {/* <Link href="/commons">here</Link> */}
        <CreateGroup />
      </div>
    </main>
  );
}
