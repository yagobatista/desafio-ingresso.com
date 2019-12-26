export interface IState{
    name: string;
    uf?: string,
    cities: ICity[];
};
export interface ICity{
    id: number;
    name: string;
    uf?: string;
    state?: string;
    urlKey?: string;
    timeZone?: string;
};
export interface ITrailer {
    type: string,
    url: string,
    embeddedUrl: string
};

export interface IThumb {
    url: string,
    type: string
};

export interface IMovie {
    id: string,
    title: string,
    city: string,
    siteURL: string,
    images: IThumb[],
    genres: string[],
    trailers: ITrailer[]
    tags: any[];
};

