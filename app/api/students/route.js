import { parse } from "path";

let profiles = [
    { id: 1, name: "First Last", major: "Computer Science", year: 2, gpa: 3.5 },
    { id: 2, name: "John Deere", major: "CGT", year: 3, gpa: 3.2 },
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let result = profiles;

    const major = searchParams.get("major");
    const year = searchParams.get("year");
    const q = searchParams.get("q");

    if (major) result = result.filter(p => p.major.toLowerCase() === major.toLowerCase());
    if (year) result = result.filter(p => p.year === parseInt(year));
    if (q) result = result.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

    return Response.json(result);
};

export async function POST(request) {
    const body = await request.json();
    const { name, major, year, gpa } = body;

    if (
        !name || typeof name !== "string" ||
        !major || typeof major !== "string" ||
        typeof year !=="number" || year < 1 || year > 4 ||
        typeof gpa !=="number" || gpa < 0 || gpa > 4
    ) {
        return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const newProfile = { id: Date.now(), name, major, year, gpa };
    profiles.push(newProfile);

    return Response.json(newProfile, { status: 201 });
};

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const index = profiles.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    profiles.splice(index, 1);
    return Response.json({ message: "Profile deleted" }, { status: 200 });
};

export async function PUT(request) {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
        return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const profile = profiles.find(p => p.id === Number(id));
    if (!profile) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    Object.assign(profile, updates);

    return Response.json({ message: "Updated successfully", data: profile },{ status: 200 });
};