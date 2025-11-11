export default async function ProfilePage({ params }) {
    const { id } = await params;
    const profile = await getProfileById(id);

    return (
        <section>
            <h1>{profile.name}</h1>
            <p>{profile.description}</p>
        </section>
    );
}