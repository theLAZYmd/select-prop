interface ParamsDictionary {
    [key: string]: string;
}
/**
 * If S is is a string extension of Tail,
 * ex: 'parse/csv' is an extension of '/csv'
 * return P, i.e. 'parse'
 * otherwise return S, i.e. 'parse/csv' (do nothing)
 */
declare type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
declare type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;
declare type RouteParameters<Route extends string> = string extends Route ? ParamsDictionary : Route extends `${string}(${string}` ? ParamsDictionary : Route extends `${string}.${infer Rest}` ? (GetRouteParameter<Rest> extends never ? ParamsDictionary : GetRouteParameter<Rest> extends `${infer ParamName}?` ? {
    [P in ParamName]?: string;
} : {
    [P in GetRouteParameter<Rest>]: string;
}) & (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown) : {};
/**
 * If the object contains an array where
 * the selector string could take multiple possible routes,
 * returns all those output possibilities.
 * Otherwise, returns just the singular matching object
 * */
declare function selectProp<Selector extends string, P = RouteParameters<Selector>>(obj: P, path: Selector): any[] | any;
export = selectProp;
//# sourceMappingURL=index.d.ts.map