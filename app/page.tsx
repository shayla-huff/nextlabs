import { getProfiles } from "@/app/data/data";

export default async function HomePage() {
  const profiles = await getProfiles();

  return (
    <main>
      <h1>Profiles</h1>
      <form>
        <input type="text" placeholder="Filter by name..." />
      </form>
      <ul>
        {profiles.map((p) => (
          <li key={p.id}>
            <a href={`/profile/${p.id}`}>{p.name}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
