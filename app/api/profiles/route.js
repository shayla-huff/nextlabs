import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const profiles = await prisma.profiles.findMany();
        return Response.json(profiles);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, title, email, bio, image_url } = body;

        const newProfile = await prisma.profiles.create({
            data: {
                name,
                title,
                email,
                bio,
                image_url
            },
        });

        return Response.json(newProfile, { status: 201 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}