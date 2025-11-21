"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Profile = {
    id: number;
    name: string;
    title: string;
    email: string;
    bio: string;
    image_url: string;
};

export default function EditProfile({ params }: any) {
    const id = params.id;
    const router = useRouter();

    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetch(`/api/profiles?id=${id}`)
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await fetch("/api/profiles", {
            method: "PUT",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({
                id: Number(id),
                name: profile!.name,
                title: profile!.title,
                email: profile!.email,
                bio: profile!.bio,
                image_url: profile!.image_url,
            }),
        });

        router.push(`/profile/${id}`);
    };

    if (!profile) return <p>Loading...</p>;

    return (
        <main>
            <h1>Edit Profile</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </label>

                <label>Title:
                    <input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                </label>

                <label>Email:
                    <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                </label>

                <label>Bio:
                    <input value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                </label>

                <label>Image URL:
                    <input value={profile.image_url} onChange={(e) => setProfile({ ...profile, image_url: e.target.value })}
                    />
                </label>

                <button type="submit">Save</button>
            </form>
        </main>
    );
}