// Данный api вместо api на C#

let orders: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  orders.push(body);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  return new Response(JSON.stringify(orders), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
