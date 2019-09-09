import { ProfileItem } from "@oauth-everything/profile";
import { UserData } from "./ApiData/UserData";

export function buildPhotos(json: UserData): ProfileItem[] {

    const photos: ProfileItem[] = [];

    if (json.channel_details.avatar) {
        photos.push({
            value: json.channel_details.avatar,
            primary: true,
            type: "avatar"
        });
    }

    if (json.channel_details.thumbnails) {

        const thumbs = json.channel_details.thumbnails;
        const thumbTypes = Object.getOwnPropertyNames(thumbs) as Array<keyof typeof thumbs>;

        for(const thunbType of thumbTypes) {
            photos.push({
                value: thumbs[thunbType],
                type: `channel_thumbnail_${thunbType}`
            });
        }

    }

    if (json.channel_details.description_panels) {

        const panels = json.channel_details.description_panels;

        for(const panel of panels) {

            if(panel.image) {
                photos.push({
                    value: panel.image,
                    type: `panel_${panel.position}_image`
                });
            }

        }

    }

    return photos;

}
