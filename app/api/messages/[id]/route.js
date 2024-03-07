import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    }

    //can't mark as read if not recipient
    if (message.recipient.toString() !== userId) {
      return new Response("Not authorized", { status: 401 });
    }

    //update message as read or unread depending on current status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    }

    //can't mark as read if not recipient
    if (message.recipient.toString() !== userId) {
      return new Response("Not authorized", { status: 401 });
    }

    //delete message
    await message.deleteOne();

    return new Response("Message deleted", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
