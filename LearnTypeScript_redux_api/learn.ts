export default function() {}

function hello(value: string, returnNull?: boolean) {
    if (returnNull)
        return null;

    return `Hello ${value}`;
}
