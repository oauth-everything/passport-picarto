import { ChatLevel } from "./ChatLevel";

/** Chat settings for this channel */
export interface ChatSettings {

    /** If guest (unregistered) users can talk in chat */
    guest_chat: boolean;

    /** If links are to be parsed for this channel */
    links: boolean;

    /** The chat level this chat uses. */
    level: ChatLevel;

}
