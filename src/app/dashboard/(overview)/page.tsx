import LatestItems from "@/app/ui/dashboard/latest-items";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<>latest items skeleton</>}>
        <LatestItems />
      </Suspense>
    </main>
  );
}
