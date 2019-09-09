/** A channel’s description panel */
export interface DescriptionPanel {

    /** The description panel’s title */
    title: string;

    /** The description panel’s body */
    body: string;

    /** The description panel’s attached image URL, if it exists */
    image: string;

    /** The attached image’s link, if the image is set. */
    image_link: string;

    /** The button’s text, if enabled */
    button_text: string;

    /** The button’s url, if enabled (can be an email) */
    button_link: string;

    /** The order at which this is sorted (just for convenience, can just use array index) */
    position: number;

}
