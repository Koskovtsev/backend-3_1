
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

// console.log(mapObject(studentStatus));
// utility types practics
//1.
type T = {
    id: string,
    name: string,
    age: number,
    student: boolean,
}

function f1(param: Partial<T>) {
}

function f1Appender(param: Partial<T>): Required<T> {
    return {} as Required<T>;
}

//2.

function hardF1(param: Omit<T, 'id'>) {

}

function hardF1Appender(param: Omit<T, 'id'>): Required<T> {
    return {} as Required<T>;
}

//3

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

// Зробіть норм сигнатуру тут.
// НІ, Rectangle | Circle це не варіант, треба зробити універсальну функцію

function наштампувати<T extends object>(SOMECLASS: { new(): T }, count: number): T[] {
    let a: T[] = [];
    for (let i = 0; i < count; i++)
        a.push(new SOMECLASS());

    return a;
}

let a: Rectangle[] = наштампувати(Rectangle, 10);
let b: Circle[] = наштампувати(Circle, 20)
console.log(a, b);