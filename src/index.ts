interface ParamsDictionary {
    [key: string]: string;
}

/**
 * If S is is a string extension of Tail,
 * ex: 'parse/csv' is an extension of '/csv'
 * return P, i.e. 'parse'
 * otherwise return S, i.e. 'parse/csv' (do nothing)
 */
type RemoveTail<
	S extends string,
	Tail extends string
> = S extends `${infer P}${Tail}` ? P : S;

type GetRouteParameter<S extends string> = RemoveTail<
    RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
    `.${string}`
>;

// No bifurcations, just a string. Return a ParamsDictionary
type RouteParameters<Route extends string> = string extends Route ?
	ParamsDictionary : 

	// Route has a (  in it. Return a ParamsDictionary
	Route extends `${string}(${string}`
        ? ParamsDictionary

		// Route has a . in it.
        : Route extends `${string}.${infer Rest}` ?
			// Is . the last character? Return a ParamsDictionary
            (GetRouteParameter<Rest> extends never ?
				ParamsDictionary :

				// Trailing segment ends with a '?'. Optional key
				GetRouteParameter<Rest> extends `${infer ParamName}?` ?
					{ [P in ParamName]?: string } :

					// Otherwise, a string dictionary where the keys are the first segment
					{ [P in GetRouteParameter<Rest>]: string }
            ) &

			// With the remainder of the string, run the RouteParameters again
            (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ?
				RouteParameters<Next> :

				// If the remainder is empty, don't extend the ParamsDictionary
				unknown
			) :
			{};

/**
 * If the object contains an array where
 * the selector string could take multiple possible routes,
 * returns all those output possibilities.
 * Otherwise, returns just the singular matching object
 * */

function selectProp<
	Selector extends string,
	P = RouteParameters<Selector>
>(
	obj: P,
	path: Selector,
): any[] | any {

	let pathArr: string[] = path.split('.');

	let arr: any[] = [];
	let res = pathArr.reduce((prev: any, curr: string, i: number): any => {
		if (prev instanceof Array) {
			for (let val of prev) {
				// let my res be an array of all possible routes that fit the route description
				let r = selectProp(val, pathArr.slice(i).join('.'));
				if (r) {
					if (r instanceof Array) arr = arr.concat(r);
					else arr.push(r);
				}
			}
		}
		if (prev === null || prev === undefined || prev[curr] === null || prev[curr] === undefined) return null;
		return prev[curr];
	}, obj);
	if (arr.length) return arr;
	else return res;
}

export = selectProp;