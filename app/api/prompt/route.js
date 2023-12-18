import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request) => {
    noStore();
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store', // or other directives
                'Content-Type': 'application/json',
              },
        });
    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 500});
    }
}