import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProfileDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;
  const numericId = Number(id);

  const profile = await prisma.profiles.findUnique({
    where: { id: numericId },
  });

  if (!profile) return <main><p>Profile not found</p></main>;

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.email}</p>
      <p>{profile.bio}</p>
      <img src={profile.image_url} width={150} />

      <div style={{ marginTop: "1rem" }}>

        <Link href={`/profile/${numericId}/edit`} className="btn btn-edit">
          Edit
        </Link>

        <form
          action={`/profile/${numericId}/delete`}
          method="POST"
          style={{ display: "inline-block", marginLeft: "0.5rem" }}
        >
          <button type="submit" className="btn btn-delete">
            Delete
          </button>
        </form>
      </div>
    </main>
  );
}





