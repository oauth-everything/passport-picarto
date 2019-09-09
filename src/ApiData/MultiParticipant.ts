/** A channel we are multistreaming with */
export interface MultiParticipant {

    /** The user ID of the channel */
    user_id: number;

    /** The channel name */
    name: string;

    /** If the channel is live or not */
    online: boolean;

    /** If this channel is an adult channel */
    adult: boolean;

}
