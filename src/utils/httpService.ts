export function postData(address: string, obj: any) {
    return fetch(address, {
        method: 'post',
        body: JSON.stringify(obj)
    }).catch(reason => {
        // tslint:disable-next-line no-console
        console.error(reason);
    });
}
