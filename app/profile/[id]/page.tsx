import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProfileDetail({ params }: any) {
    const id = Number(params.id);
    const profile = await prisma.profile.findUnique({
        where: { id },
    });

    if (!profile) return <p>Profile not found</p>;

    return (
        <main>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
            <p>{profile.email}</p>
            <p>{profile.bio}</p>
            <img src={profile.image_url} width={150} />

            <br /><br />

            <Link href ={`/profile/${id}/edit`}>
                <button>Edit</button>
            </Link>

            <form action={`/profile/${id}/delete`} method="POST">
                <button type="submit">Delete</button>
            </form>
        </main>
    );
}