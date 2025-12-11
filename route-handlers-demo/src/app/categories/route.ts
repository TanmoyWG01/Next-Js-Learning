export const dynamic = 'force-dynamic';

export async function GET() {

    const categories = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Health" },
        { id: 3, name: "Finance" },
        { id: 4, name: "Travel" },
        { id: 5, name: "Food" },
    ]

  return Response.json(categories);
}