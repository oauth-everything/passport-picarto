import { Strategy as OAuth2Strategy, StrategyOptions as OAuth2StrategyOptions, InternalOAuthError } from "passport-oauth2";
import { Profile as OAuth2Profile } from "@oauth-everything/profile";
import {
    ExtendableStrategyOptions,
    ExtendableStrategyOptionsWithRequest,
    OAuth2VerifyCallback,
    OAuth2VerifyFunction,
    OAuth2VerifyFunctionWithRequest,
    OAuth2VerifyFunctionWithResults,
    OAuth2VerifyFunctionWithRequestAndResults
} from "@oauth-everything/oauth2-types";

import { UserData } from "./ApiData/UserData";
import { Scope } from "./Scope";
import { buildPhotos } from "./Util";

export interface TokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export type Profile = OAuth2Profile<{}>;
export type StrategyOptions = ExtendableStrategyOptions<{}>;
export type StrategyOptionsWithRequest = ExtendableStrategyOptionsWithRequest<{}>;
export type VerifyCallback<TUser = object, TInfo = object> = OAuth2VerifyCallback<TUser, TInfo>;
export type VerifyFunction<TUser, TInfo> = OAuth2VerifyFunction<Profile, TUser, TInfo>;
export type VerifyFunctionWithRequest<TUser, TInfo> = OAuth2VerifyFunctionWithRequest<Profile, TUser, TInfo>;
export type VerifyFunctionWithResults<TUser, TInfo> = OAuth2VerifyFunctionWithResults<TokenResponse, Profile, TUser, TInfo>;
export type VerifyFunctionWithRequestAndResults<TUser, TInfo> = OAuth2VerifyFunctionWithRequestAndResults<TokenResponse, Profile, TUser, TInfo>;

export class Strategy<TUser = object, TInfo = object> extends OAuth2Strategy {

    public name = "picarto";

    constructor(
        options: StrategyOptions,
        verify: VerifyFunction<TUser, TInfo>
            | VerifyFunctionWithResults<TUser, TInfo>
    )

    constructor(
        options: StrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest<TUser, TInfo>
            | VerifyFunctionWithRequestAndResults<TUser, TInfo>
    )

    constructor(
        options: StrategyOptions
            | StrategyOptionsWithRequest,
        verify: VerifyFunction<TUser, TInfo>
            | VerifyFunctionWithResults<TUser, TInfo>
            | VerifyFunctionWithRequest<TUser, TInfo>
            | VerifyFunctionWithRequestAndResults<TUser, TInfo>
    ) {

        super(
            {
                authorizationURL: "https://oauth.picarto.tv/authorize",
                tokenURL: "https://oauth.picarto.tv/token",
                scope: [Scope.READPUB, Scope.READPRIV],
                ...options
            } as OAuth2StrategyOptions,
            verify as VerifyFunction<TUser, TInfo>
        );

    }

    public userProfile(accessToken: string, done: (err?: Error | null, profile?: Profile | null) => void): void {

        this._oauth2.useAuthorizationHeaderforGET(true);
        this._oauth2.get("https://api.picarto.tv/v1/user", accessToken, (error, result) => {

            if (error) return done(new InternalOAuthError("Failed to fetch user profile", error));

            let json: UserData;

            try {
                json = JSON.parse(result as string) as UserData;
            }
            catch (parseError) {
                return done(new InternalOAuthError("Failed to parse user profile", parseError));
            }

            if(!json.channel_details) return done(new InternalOAuthError("Unexpected user profile format", new Error("Property 'channel_details' is missing in response data.")));

            done(null, {
                provider: this.name,
                id: `${json.channel_details.user_id}`,
                username: json.channel_details.name,
                profileUrl: `https://www.picarto.tv/${json.channel_details.name}`,
                created: json.creation_date ? new Date(json.creation_date) : undefined,
                emails: json.email ? [{ value: json.email, primary: true }] : undefined,
                photos: buildPhotos(json),
                _raw: result as string,
                _json: json
            });

        });

    }

}
