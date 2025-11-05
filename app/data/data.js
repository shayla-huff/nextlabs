export const profiles = [
    { id: 1, name: "Joana Doe", description: "Frontend Developer" },
    { id: 2, name: "Shayla Hufford", description: "UX Designer" },
    { id: 3, name: "Tyler Joseph", description: "Singer/Songwriter" },
];

export async function getProfiles() {
    return profiles;
}

export async function getProfileById(id) {
    return profiles.find((p) => p.id == id);
}