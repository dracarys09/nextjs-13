import Link from "next/link";
import { Ticket } from "../types";

// NOTE: all this fetch logic is going to run on the server because this is a server-side rendered page
// setting the revalidate to 0 will prevent the nextjs from doing static rendering of this page
async function getTickets() {
  // imitate delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      // revalidate: 30, // revalidate every 30 seconds
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  // this returns a promise
  return res.json();
}

export default async function TicketList() {
  // Fetch the data (we have to use await because getTickets() returns a promise)
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className='card my-5'>
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className='text-center'>There are no open tickets, yay!</p>
      )}
    </>
  );
}
