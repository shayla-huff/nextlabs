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

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, title, email, bio, image_url } = body;

        if (!id) {
            return Response.json({ error: "ID is required" },{ status: 400 });
        }

        const updatedProfile = await prisma.profiles.update({
            where: { id: Number(id) },
            data: {
                name,
                title,
                email,
                bio,
                image_url,
            },
        });

        return Response.json(updatedProfile, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.profiles.delete({
            where: { id: Number(id) },
        });

        return Response.json({ message: "Profile deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}