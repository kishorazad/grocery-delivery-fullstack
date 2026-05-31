import { useState } from "react";

import api from "../../config/api";

import toast from "react-hot-toast";

import {
    BellIcon,
    ImageIcon,
    SendIcon,
} from "lucide-react";

export default function SendNotification() {

    const [title, setTitle] =
        useState("");

    const [body, setBody] =
        useState("");

    const [image, setImage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSend =
        async () => {

            if (!title || !body) {

                toast.error(
                    "Please fill all fields"
                );

                return;
            }

            try {

                setLoading(true);

                await api.post(
                    "/admin/send-notification",
                    {
                        title,
                        body,
                        image,
                    }
                );

                toast.success(
                    "Notification Sent Successfully"
                );

                setTitle("");
                setBody("");
                setImage("");

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to send notification"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="p-6 max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl border border-app-border shadow-sm overflow-hidden">

                <div className="p-6 border-b border-app-border flex items-center gap-3">

                    <div className="size-12 rounded-2xl bg-blue-100 text-blue-600 flex-center">

                        <BellIcon className="size-6" />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-zinc-900">
                            Send Notifications
                        </h1>

                        <p className="text-sm text-zinc-500 mt-1">
                            Send offers, new products,
                            and feature updates to all users
                        </p>

                    </div>
                </div>

                <div className="p-6 space-y-5">

                    <div>

                        <label className="text-sm font-medium text-zinc-700">
                            Notification Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter notification title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                w-full
                                border
                                border-app-border
                                rounded-xl
                                p-3
                                outline-none
                            "
                        />
                    </div>

                    <div>

                        <label className="text-sm font-medium text-zinc-700">
                            Notification Message
                        </label>

                        <textarea
                            placeholder="Enter notification message"
                            value={body}
                            onChange={(e) =>
                                setBody(
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                w-full
                                border
                                border-app-border
                                rounded-xl
                                p-3
                                h-32
                                outline-none
                            "
                        />
                    </div>

                    <div>

                        <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">

                            <ImageIcon className="size-4" />

                            Notification Image URL

                        </label>

                        <input
                            type="text"
                            placeholder="https://example.com/banner.jpg"
                            value={image}
                            onChange={(e) =>
                                setImage(
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                w-full
                                border
                                border-app-border
                                rounded-xl
                                p-3
                                outline-none
                            "
                        />
                    </div>

                    {
                        image && (

                            <div>

                                <p className="text-sm font-medium text-zinc-700 mb-2">
                                    Image Preview
                                </p>

                                <img
                                    src={image}
                                    alt="preview"
                                    className="
                                        w-full
                                        h-64
                                        object-cover
                                        rounded-2xl
                                        border
                                    "
                                />

                            </div>
                        )
                    }

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-4
                            rounded-2xl
                            font-semibold
                            transition
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        <SendIcon className="size-5" />

                        {
                            loading
                                ? "Sending..."
                                : "Send Notification"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}