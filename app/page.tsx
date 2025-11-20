export default async function HomePage() {
  const res = await fetch("https://nextlabs-chi.vercel.app/api/profiles", {
    cache: "no-store",
  });

  const profiles = await res.json();

  return (
    <main>
      <ul>
        {profiles.map((p: any) => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.title}</p>
            <p>{p.email}</p>
            <img src={p.image_url} width={100} />
          </li>
        ))}
      </ul>
    </main>
  );
}
