const names: Array<string> = []; // string[]
// names[0].split(' ');

const promise: Promise<number> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then(data => {
  // data.split(' ');
    console.log(data);
})


//CREATE A GENERIC FUNC
const merge = <T, U> (objA: T, objB?: U) => {
    return Object.assign(objA, objB);
}

const mergeObj = merge({name: 'Nik'}, {age: 28})
const newMergeObj = merge({isLogged: true})
console.log(mergeObj.name, newMergeObj.isLogged)


//CONSTRAINTS(ограничения)
function newMerge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = newMerge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);
