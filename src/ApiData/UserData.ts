import { ChannelDetails } from "./ChannelDetails";

/** Information about an account */
export interface UserData {

    /** Details about a channel */
    channel_details: ChannelDetails;

    /** The email address of the user */
    email: string;

    /** The date of the channel’s creation */
    creation_date: string;

    /** The user’s key to watch their private stream */
    private_key: string;

    /** If this user has enabled NSFW content on the site */
    nsfw_enabled: boolean;

    /** If this user can see NSFW content in-app */
    nsfw_app: boolean;

}
