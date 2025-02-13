import LatestItems from "@/app/ui/dashboard/latest-items";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<>latest items skeleton</>}>
      <LatestItems />
    </Suspense>
  );
}
