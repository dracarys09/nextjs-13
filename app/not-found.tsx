import Link from "next/link";

// By default, this is going to get rendered by nextjs everytime we go to a route that doesn't exist
export default function NotFound() {
  return (
    <main className='text-center'>
      <h2 className='text-3xl'>There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href='/'>Dashboard</Link>.
      </p>
    </main>
  );
}
