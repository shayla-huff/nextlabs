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

  if (!profile) return <p>Profile not found</p>;

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.email}</p>
      <p>{profile.bio}</p>
      <img src={profile.image_url} width={150} />

      <br />
      <br />

      <Link href={`/profile/${numericId}/edit`}>
        <button className="edit-btn">Edit</button>
      </Link>

      <br />
      <br />

      <form action={`/profile/${numericId}/delete`} method="POST">
        <button type="submit" className="delete-btn">
          Delete
        </button>
      </form>
    </main>
  );
}



