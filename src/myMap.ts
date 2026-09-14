
type MapObjectParams<TResult, TValue> = {
    obj: Record<string, TValue>,
    transformer: (ocimka: TValue) => TResult,
}


function mapObject<TResult, TValue>(params: MapObjectParams<TResult, TValue>) {
    const transformedObject = Object.fromEntries(
        Object.entries(params.obj).map(([key, value]) => [key, params.transformer(value)])
    );
    return transformedObject;
}

const students = {
    'roma': 5,
    'vasya': 2,
}

const isPassed = (grid: number) => {
    return grid > 2;
}

const studentStatus: MapObjectParams<boolean, number> = {
    obj: students,
    transformer: isPassed,
};

console.log(mapObject(studentStatus));