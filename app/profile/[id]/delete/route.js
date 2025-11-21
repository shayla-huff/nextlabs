import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function POST(request, {params}) {
    const id = Number(params.id);

    await prisma.profiles.delete({
        where: { id },
    });

    redirect("/");
}