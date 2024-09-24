export function findCommonObjects(obj: any) {
    const arrays: any = Object.values(obj);
    const commonObjects = arrays[0].filter((item: any) =>
        arrays.every((arr: any) => arr.some((obj: any) => obj.pokemon.name === item.pokemon.name))
    );

    return commonObjects;
}