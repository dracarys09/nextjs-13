import { Ticket } from "@/app/types";
import { notFound } from "next/navigation";

interface TicketDetailsProps {
  params: {
    id: string;
  };
}

// default value is true --> nextjs will generate the page for a dynamic route which is not already fetched
// false --> it will throw a 404 error if the page is not already fetched
// export const dynamicParams = false;

// setting revalidate to 0 in getTicket() will make getStaticParams() redundant
export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();
  return tickets.map((ticket: Ticket) => ({
    params: {
      id: ticket.id.toString(),
    },
  }));
};

const getTicket = async (id: string) => {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

export default async function TicketDetails({ params }: TicketDetailsProps) {
  const ticket: Ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
