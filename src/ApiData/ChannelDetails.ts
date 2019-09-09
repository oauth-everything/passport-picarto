import { AccountType } from "./AccountType";
import { DescriptionPanel } from "./DescriptionPanel";
import { ChatSettings } from "./ChatSettings";
import { MultiParticipant } from "./MultiParticipant";
import { Language } from "./Language";

/** Details about a channel */
export interface ChannelDetails {

    /** The channel’s user ID */
    user_id: number;

    /** The name of the channel */
    name: string;

    /** The URI of the user’s avatar */
    avatar: string;

    /** If the channel is online */
    online: boolean;

    /** The number of current viewers watching this stream (0 if offline) */
    viewers: number;

    /** The total number of viewers this channel has had since the beginning of time */
    viewers_total: number;

    /** The thumbnail URIs for the channel */
    thumbnails: {
        web: string;
        web_large: string;
        mobile: string;
        tablet: string;
    };

    /** The total number of people following this streamer */
    followers: number;

    /** The total number of people subscribed to this streamer */
    subscribers: number;

    /** If this channel is an adult channel */
    adult: boolean;

    /** The name of the category this stream is in */
    category: string;

    /** The account type of the channel */
    account_type: AccountType;

    /** If this channel is accepting commissions */
    commissions: boolean;

    /** If recordings are enabled and videos are accessible */
    recordings: boolean;

    /** This channel’s title */
    title: string;

    /** This channel’s description panels */
    description_panels: DescriptionPanel[];

    /** If this channel is in private mode */
    private: boolean;

    /** The message to display if in private mode */
    private_message: string;

    /** If this channel is in game mode */
    gaming: boolean;

    /** Chat settings for this channel */
    chat_settings: ChatSettings;

    /** The date/time this user was last live */
    last_live: string;

    /** A list of tags */
    tags: string[];

    /** A list of channels we are multistreaming with */
    multistream: MultiParticipant[];

    /** A list of languages */
    languages: Language[];

    /** Whether following or not - only included if provided with a valid bearer token */
    following?: boolean;

}
