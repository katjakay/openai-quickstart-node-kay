import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [eventInput, setEventInput] = useState('');
  const [result, setResult] = useState();
  const [successCopy, setSuccessCopy] = useState(false);
  const router = useRouter();

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(result);
      setSuccessCopy(true);

      router.replace(`https://ka-sama-community-building-app.fly.dev/create`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setSuccessCopy(false);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: eventInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setEventInput('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Ka-sama AI helper</title>
        <link rel="icon" href="/icon.svg " />
      </Head>

      <main className="mt-20 mb-4 m-4">
        <h3 className="text-yellow text-left">Event description</h3>
        <h1 className="text-4xl mt-4">
          AI event <p className="text-beige">creator helper</p>
        </h1>
        <p className="mt-4 mb-4">
          Simply provide us with a few prompts and we'll create a captivating
          event description for you.
        </p>
        <form onSubmit={onSubmit}>
          <input
            name="event"
            className="input input-bordered input-md w-full"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
          />

          <button
            className="btn border-transparent text-white bg-brown text-white font-regular text-sm rounded mt-4 min-w-full h-11"
            value="Generate"
          >
            Submit
          </button>
        </form>
        <p className="text-blue mt-4">Here's your event description:</p>
        <p className="mt-6">{result}</p>
        <button
          className="btn border-transparent text-white bg-blue-500 font-bold text-xs rounded mt-2 py-1 px-2 mt-4"
          onClick={copyToClipboard}
        >
          Copy to clipboard
        </button>
        <div className="text-blue text-xs">
          {!!successCopy && <p>Great! Your text has been copied.</p>}
        </div>
      </main>
    </div>
  );
}
