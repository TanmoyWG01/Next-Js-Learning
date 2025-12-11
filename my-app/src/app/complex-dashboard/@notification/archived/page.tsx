import { Card } from "@/components/card";
import Link from "next/link";

export default function ArchivedNotifications(){
    return (
        <Card>
            <div>Notifications Page</div>
            <div>
                <Link href="/complex-dashboard">Default</Link>
            </div>
        </Card>
    );
}